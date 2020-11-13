import { NextPage } from "next";
import Container from '~/components/Container';
interface IProps {
}
const HomePage: NextPage<IProps> = (props) => {
  return (
    <div>
      <Container>Home Page</Container>
    </div>
  );
};
export default HomePage;