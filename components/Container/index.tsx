import { FC } from "react";

import StyledDiv from "./style";
export interface IProps { }
const Container: FC<IProps> = (props) => {
  return <StyledDiv>{props.children}</StyledDiv>;
};
export default Container;
