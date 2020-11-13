import { FC } from "react";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useStore } from "react-redux";
import { Modal } from "antd";
import { getGalleryImages } from "~/services/imgur";
import ImageDetails from "~/components/GalleryGrid/ImageDetails";
import { getGalleryImageVotes } from "~/services/imgur";
import { useVirtual } from "react-virtual";
import Loader from "~/components/SpinnerLoader";

import GalleryActions from "~/store/gallery/actions";
import ImageCard from "~/components/GalleryGrid/ImageCard";

import { AntModalGlobalStyle, MainLoaderWrapperStyle } from "./style";

const GalleryGrid: FC<{}> = (props) => {
  const store = useStore();

  const galleryItems = useSelector((state) => state.Gallery.items);
  const usedFilter = useSelector((state) => state.Gallery.filter);

  const [selectedImageWithVotes, setSelectedImageWithVotes] = useState(null);
  const [loading, setLoading] = useState(false);

  const defaultWidth = typeof window != "undefined" ? window?.innerWidth : 1920;

  const parentRef = React.useRef();
  const itemWidth = 270;
  const itemHeight = 300;
  const colCount = Math.floor(defaultWidth / itemWidth);

  const rowVirtualizer = useVirtual({
    size: Math.ceil(galleryItems.length / colCount),
    parentRef,
    overscan: 1,
  });

  const columnVirtualizer = useVirtual({
    horizontal: true,
    size: colCount,
    parentRef,
    overscan: 1,
  });

  const galleryGridCotainerOnScroll = (event) => {
    const scrollGapTOEnd =
      event.target.scrollHeight -
      (event.target.scrollTop + event.target.clientHeight);
    if (scrollGapTOEnd < 450) {
      if (!loading) {
        setLoading(true);
        getGalleryImages({
          ...usedFilter,
          page: usedFilter.page + 1,
        }).then(({ page, data }) => {
          store.dispatch({
            type: GalleryActions.SET_ITEMS,
            payload: [...galleryItems, ...data],
          });
          store.dispatch({
            type: GalleryActions.SET_FILTER,
            payload: { ...usedFilter, page },
          });
          setTimeout(() => setLoading(false), 500);
        }).catch(err => {
          console.log(err);
          setLoading(false)

        });
      }
    }
  };

  const imageCardClick = (item) => {
    setLoading(item.id);
    getGalleryImageVotes(item.id)
      .then((result) => {
        setSelectedImageWithVotes({
          galleryImage: item,
          votes: result,
        });
        setLoading(false);
      })
      .catch((err) => {
        setSelectedImageWithVotes(null);
        setLoading(false);
      });
  };

  const galleryGridCotainerStyle = {
    height: `calc(100vh - 100px)`,
    width: `100%`,
    overflow: "auto",
  } as React.CSSProperties;

  const galleryGridCotainerInnerDivStyle = {
    height: `${rowVirtualizer.totalSize}px`,
    width: `${columnVirtualizer.totalSize}px`,
    position: "relative",
    margin: "auto",
  } as React.CSSProperties;

  const columnVirtualizerVirtualItems = (virtualRow) => {
    return columnVirtualizer.virtualItems.map((virtualColumn) => {
      const itemIndex = virtualRow.index * colCount + (virtualColumn.index + 1);
      const item = galleryItems[itemIndex];
      const cardGridStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: `${itemWidth}px`,
        height: `${itemHeight}px`,
        transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
      } as React.CSSProperties;

      const measureRefElement = (el) => {
        if (el) {
          virtualRow.measureRef(el);
          // @ts-ignore
          virtualColumn.measureRef(el);
        }
      };

      return item ? (
        <div
          style={cardGridStyle}
          key={virtualColumn.index}
          ref={measureRefElement}
        >
          <ImageCard
            loading={loading == item.id}
            key={item.id}
            data={{ ...item }}
            onClick={() => imageCardClick(item)}
          />
        </div>
      ) : null;
    });
  };

  return (
    <>
      <AntModalGlobalStyle />
      <div
        className="gallery-grid-cotainer"
        ref={parentRef}
        style={galleryGridCotainerStyle}
        onScroll={galleryGridCotainerOnScroll}
      >
        <div
          style={galleryGridCotainerInnerDivStyle}
          data-testid="gallery-grid-items-cotainer"
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            return (
              <React.Fragment key={virtualRow.index}>
                {columnVirtualizerVirtualItems(virtualRow)}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {loading === true ? (
        <MainLoaderWrapperStyle>
          <Loader className="main-loader" />
        </MainLoaderWrapperStyle>
      ) : null}
      <Modal
        width="100%"
        onCancel={() => {
          setSelectedImageWithVotes(null);
        }}
        centered
        afterClose={() => {
          setSelectedImageWithVotes(null);
        }}
        title={"Image Details"}
        visible={!!selectedImageWithVotes}
        footer={null}
      >
        {selectedImageWithVotes ? (
          <ImageDetails
            galleryImage={{ ...selectedImageWithVotes.galleryImage }}
            votes={{ ...selectedImageWithVotes.votes }}
          />
        ) : null}
      </Modal>
    </>
  );
};
export default GalleryGrid;
