import styled, { createGlobalStyle } from "styled-components";
import { blueLight } from "~/assets/style/color";
export const MainLoaderWrapperStyle = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${blueLight};
  color: white;
`;

export const AntModalGlobalStyle = createGlobalStyle`
.ant-modal-body {
    padding: 0;
}
.ant-modal {
    padding: 0;
    max-width: 1200px;
}
.ant-modal-wrap {
    max-width: 96%;
    margin: auto;
}
`;
