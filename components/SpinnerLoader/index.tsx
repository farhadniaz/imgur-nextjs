import { SyncOutlined } from "@ant-design/icons";
import StyledDiv from "./style";
const SpinnerLoader = (props) => {
  return (
    <StyledDiv
      data-testid="loader"
      className="loader">
      <span>
        ....
        <SyncOutlined spin />
        ....
      </span>
    </StyledDiv>
  );
};

export default SpinnerLoader;
