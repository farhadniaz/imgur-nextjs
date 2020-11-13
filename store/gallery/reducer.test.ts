import { HYDRATE } from "next-redux-wrapper";
import reducer from "./reducer";
import actions from "./actions";
import initialState, { filterDefautValue } from "./initial-state";
describe("Gallery reducer", () => {
  test("Check defaults", () => {
    const reducerResult = reducer(undefined, { type: undefined });
    expect(reducerResult).toEqual(initialState);
  });

  test("Check for HYDRATE", () => {
    const reducerResult = reducer(undefined, {
      type: HYDRATE,
      payload: {
        Gallery: { GalleryData: "gallery data" },
      },
    });
    expect(reducerResult).toEqual({
      ...initialState,
      GalleryData: "gallery data",
    });
  });

  test("Check set items", () => {
    const reducerResult = reducer(undefined, {
      type: actions.SET_ITEMS,
      payload: [{ id: 1 }, { id: 2 }],
    });
    expect(reducerResult).toEqual({
      ...initialState,
      items: [{ id: 1 }, { id: 2 }],
    });
  });

  test("Check set filter", () => {
    const reducerResult = reducer(undefined, {
      type: actions.SET_FILTER,
      payload: filterDefautValue,
    });
    expect(reducerResult).toEqual({
      ...initialState,
      filter: filterDefautValue,
    });
  });
});
