import { FC } from "react";

interface IProps {
  src: string;
  mediaProps: object;
}
const Video: FC<IProps> = ({ src, mediaProps }) => {
  return (
    <video
      preload="auto"
      autoPlay={true}
      loop
      style={{
        margin: "auto",
        display: "block",
      }}
      {...mediaProps}
    >
      <source src={src} type="video/mp4"></source>
    </video>
  );
};
export default Video;
