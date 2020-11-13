import React, { FC, useState } from "react";
import CardLoader from "~/components/CardLoader";

interface IProps {
  src: string
}
const Image: FC<IProps> = (props) => {
  const [status, setStatus] = useState("loading");
  return (
    <>
      <img
        {...props}
        onLoad={() => {
          setStatus("loaded");
        }}
        onError={() => {
          setStatus("error");
        }}
        style={{ display: status == "loaded" ? "block" : "none" }}
      />
      {status == "loading" ? <CardLoader height="100%" /> : null}
      {status == "error" ? (
        <div style={{ padding: "8px" }}>some error happend while loading the image!!!</div>
      ) : null}
    </>
  );
};
export default Image;
