import Filter from "~/components/GalleryGrid/Filter";
import Container from "~/components/Container";
import { Col, Row } from "antd";
import StyledHeader, { GlobalStyle } from "./style";
const Header = (props) => {
  const { onFilter, filterLoading } = props;
  return (
    <StyledHeader>
      <GlobalStyle />
      <Container>
        <Row>
          <Col span={2}></Col>
          <Col span={22}>
            <Filter onFilter={onFilter} loading={filterLoading} />
          </Col>
        </Row>
      </Container>
    </StyledHeader>
  );
};

export default Header;
