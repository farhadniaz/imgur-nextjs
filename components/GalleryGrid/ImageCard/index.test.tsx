import ImgeCard from "./index";
import { render, fireEvent } from "@testing-library/react";
/* this import will be mocked by jest for __mocks__ folder in project root */
import fakeImagesData from 'imagesDataFake';

describe("Image card component", () => {
  test("Should be clickable", async () => {
    const clickMock = jest.fn();

    const { container } = render(
      <ImgeCard data={fakeImagesData[0]} onClick={clickMock} loading={false} />
    );
    fireEvent.click(container.firstChild);
    expect(clickMock.mock.calls.length).toBe(1);
  });

  test("Should have image loader", async () => {
    const clickMock = jest.fn();
    const { getByTestId } = render(
      <ImgeCard data={fakeImagesData[1]} onClick={clickMock} loading={false} />
    );
    getByTestId("card-loader");
  });
});
