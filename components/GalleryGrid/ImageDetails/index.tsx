import { FC } from "react";
import StyledDiv from "./style";
import IGalleryImage from "~/types/IGalleryImage.ts";
import IGalleryImageVote from "~/types/IGalleryImageVote.ts";
import Media from "~/components/GalleryGrid/Media";
import { Row, Col } from 'antd';
interface IProps {
  galleryImage: IGalleryImage;
  votes?: IGalleryImageVote;
}

import {
  StarOutlined,
  DislikeOutlined,
  LikeOutlined,
  BorderlessTableOutlined,
} from "@ant-design/icons";
const ImageDetails: FC<IProps> = ({ galleryImage, votes }) => {
  const { images, title, description, points } = galleryImage;
  return (
    <StyledDiv className="image-details">
      <Row>

        <Col span={16} xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
          <div className="image-details__media-cover">
            <Media
              images={images}
              mediaProps={{
                video: {
                  "data-testid": "image-details-video",
                  className: "image-details__media-cover__video",
                },
                image: {
                  "data-testid": "image-details-img",
                  className: "image-details__media-cover__img",
                },
              }}
            />
          </div>
        </Col>
        <Col span={8} xs={24}  sm={24} md={8} lg={8} xl={8} xxl={8}>

          <div className="image-details__info">
            <div className="image-details__info__statics">
              {votes ? (
                <>
                  <span
                    className="image-details__info__statics__item"
                    data-testid="votes-up"
                  >
                    <LikeOutlined />
                    {votes.ups}
                  </span>
                  <span
                    className="image-details__info__statics__item"
                    data-testid="votes-down"
                  >
                    <DislikeOutlined />
                    {votes.downs}
                  </span>
                </>
              ) : null}

              <span className="image-details__info__statics__item">
                <BorderlessTableOutlined />
                {points}
              </span>
              <span className="image-details__info__statics__item">
                <StarOutlined /> {points}
              </span>
            </div>
            <h1 className="image-details__info__title"
              data-testid="image-details-title">
              {title}
            </h1>
            <p
              className="image-details__info__description"
              data-testid="image-details-description"
            >
                {images && (images[0]?.description  || "No Description 🤔")}
            </p>
          
          </div>
        </Col>
      </Row>


    </StyledDiv>
  );
};
export default ImageDetails;
