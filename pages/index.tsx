import React, { useState } from "react";
import { NextPage, NextPageContext } from "next";
interface IProps {
}
import { getGalleryImages } from "~/services/imgur";
import Header from "~/components/Header";
import SpinnerLoader from "~/components/SpinnerLoader";
import GalleryActions from "~/store/gallery/actions";
import GalleryGrid from "~/components/GalleryGrid";
import { MainLoaderWrapperStyle } from "~/components/GalleryGrid/style";
import useDoFilter from "~/components/GalleryGrid/Filter/useDoFilter";

const HomePage: NextPage<IProps> = (props) => {
  const [loading, setLoading] = useState(false);

  const withFilter = useDoFilter(setLoading);

  const doFilter = (filterData) => {
    withFilter(filterData);
  };

  return (
    <>
      <Header onFilter={doFilter} filterLoading={loading} />
      <GalleryGrid />
      {loading ? <MainLoaderWrapperStyle>
        <SpinnerLoader className="main-loader" />
      </MainLoaderWrapperStyle> : null}
    </>
  );
};

HomePage.getInitialProps = async (context: NextPageContext) => {
  const { store } = context;
  const { data, page } = await getGalleryImages();
  store.dispatch({
    type: GalleryActions.SET_ITEMS,
    payload: data,
  });
  return {};
};
export default HomePage;