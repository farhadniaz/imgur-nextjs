import { FC } from "react";
import StyledDiv from "./style";
import CardLoader from "~/components/CardLoader";
import Media from "~/components/GalleryGrid/Media";
import IGalleryImage from "~/types/IGalleryImage";
interface IProps {
  data: IGalleryImage;
  onClick: Function;
  loading?: Boolean;
}
const ImageCard: FC<IProps> = ({ data, onClick, loading }) => {
  const { images, title, description } = data;

  return (
    <StyledDiv
      className="image-card"
      onClick={onClick}
      data-testid="image-card"
    >
      {loading ? <CardLoader height="290px" /> : null}
      <div className="image-card__media-cover">
        <Media
          images={images}
          mediaProps={{
            image: {
              "data-testid": "image-card-img",
              className: "image-card__media-cover__img",
              alt: title,
            },
            video: {
              autoPlay: false,
              preload: false,
              playsInline: true,
              muted: true,
              className: "image-card__media-cover__video",
              "data-testid": "image-card-video",
            },
          }}
        />
      </div>
      <p className="image-card__img__description">{description || title}</p>
    </StyledDiv>
  );
};

export default ImageCard;
