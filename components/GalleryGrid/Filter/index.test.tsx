import "~/__mocks__/matchMedia.js";
import { render, fireEvent } from "@testing-library/react";
import Filter from "./";
import { Provider } from "react-redux";
import { makeStore } from "~/store/index.ts";
import AppActions from "~/store/app/actions";

const store = makeStore({});

test("Check filter form", async () => {
  store.dispatch({
    type: AppActions.SET_DEVICE,
    payload: { type: "tablet" },
  });

  const { getByTestId } = render(
    <Provider store={store}>
      <Filter onFilter={() => { }} loading={false} />
    </Provider>
  );

  const filterButtonIcon = getByTestId("filter-btn-icon");
  fireEvent.click(filterButtonIcon);

  const filterForm = getByTestId("filter-form");
  fireEvent.click(filterForm);

  const filterButton = getByTestId("filter-btn");

  fireEvent.click(filterButton);
});

test("Check Snapshot in tablet", async () => {
  store.dispatch({
    type: AppActions.SET_DEVICE,
    payload: { type: "tablet" },
  });
  const { asFragment } = render(
    <Provider store={store}>
      <Filter onFilter={() => { }} loading={false} />
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});

test("Check Snapshot in Desktop", async () => {
  store.dispatch({
    type: AppActions.SET_DEVICE,
    payload: { type: "desktop" },
  });
  const { getByTestId, asFragment } = render(
    <Provider store={store}>
      <Filter onFilter={() => { }} loading={false} />
    </Provider>
  );
  const filterForm = getByTestId("filter-form");
  expect(asFragment()).toMatchSnapshot();
});
