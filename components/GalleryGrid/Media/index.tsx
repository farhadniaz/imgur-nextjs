import { FC } from "react";
import  { IGalleryImageImageItem } from "~/types/IGalleryImage.ts";
import Image from "./Image";
import Video from "./Video";
interface IProps {
  images: IGalleryImageImageItem[];
  mediaProps: {
    image: Object;
    video: Object;
  };
}

const ImageMedia: FC<IProps> = ({ images, mediaProps }) => {
  const { image: mediaPropsImage = {}, video: mediaPropsVideo = {} } =
    mediaProps || {};
  const defaultMedia = images ? images[0] : null;
  if (!defaultMedia) {
    return <img {...mediaPropsImage} src="/not-found.png" />;
  }
  const isVideo = defaultMedia.type == "video/mp4";
  const mp4SRC = isVideo ? defaultMedia.mp4 : null;
  const defaultImageSRC: string =
    !isVideo && images ? defaultMedia.link : "/not-found.png";

  return isVideo ? (
    <Video src={mp4SRC} mediaProps={mediaPropsVideo} />
  ) : (
      <Image src={defaultImageSRC} {...mediaPropsImage} />
    );
};
export default ImageMedia;
