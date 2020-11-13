import { HYDRATE } from "next-redux-wrapper";
import reducer from "./reducer";
import actions from "./actions";
import initialState from "./initial-state";
describe("App reducer", () => {
  test("Check defaults", () => {
    const reducerResult = reducer(undefined, { type: undefined });
    expect(reducerResult).toEqual(initialState);
  });

  test("Check device detector for desktop ", () => {
    const reducerResult = reducer(undefined, {
      type: actions.SET_DEVICE,
      payload: {
        type: "desktop",
      },
    });
    expect(reducerResult.device).toEqual({
      type: "desktop",
      isMobieOrTablet: false,
      isDesktop: true,
    });
  });

  test("Check device detector for mobile and tablet ", () => {
    const reducerResult = reducer(undefined, {
      type: actions.SET_DEVICE,
      payload: {
        type: "tablet",
      },
    });
    expect(reducerResult.device).toEqual({
      type: "tablet",
      isMobieOrTablet: true,
      isDesktop: false,
    });
  });

  test("Check set device width", () => {
    const reducerResultForDesktop = reducer(undefined, {
      type: actions.SET_DEVICE_WIDTH,
      payload: 992,
    });
    expect(reducerResultForDesktop.device).toEqual({
      widthInMobile: false,
    });

    const reducerResultForMobile = reducer(undefined, {
      type: actions.SET_DEVICE_WIDTH,
      payload: 480,
    });
    expect(reducerResultForMobile.device).toEqual({
      widthInMobile: true,
    });
  });

  test("Check for HYDRATE", () => {
    const reducerResult = reducer(undefined, {
      type: HYDRATE,
      payload: {
        App: { AppData: "app data" },
      },
    });
    expect(reducerResult).toEqual({
      AppData: "app data",
    });
  });
});
