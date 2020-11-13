import styled, { createGlobalStyle } from "styled-components";
import { grayMore, gray } from "~/assets/style/color";

export const GlobalStyle = createGlobalStyle`
body{
    background-color: ${grayMore};
}
`;
const StyledHeader = styled.header`
  padding: 16px;
  border-bottom: 1px solid ${gray};
  margin-bottom: 16px;
  background: white;
`;

export default StyledHeader;
