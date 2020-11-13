import { AnyAction } from "redux";
import actions from "./actions";
import initialState, { InitialStateInterface } from "./initial-state";
import { HYDRATE } from "next-redux-wrapper";
export default function reducer(
  state: InitialStateInterface = initialState,
  action: AnyAction
) {
  let newState = { ...state };
  

  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.App,
      };

    case actions.SET_DEVICE:
      const isMobieOrTablet =
        (action.payload?.type || "").search(/tablet|mobile/) > -1;
      return {
        ...state,
        device: {
          ...action.payload,
          isMobieOrTablet,
          isDesktop: !isMobieOrTablet,
        },
      };
    case actions.SET_DEVICE_WIDTH:
      
      return {
        ...newState,
        device: {
          ...newState.device,
          widthInMobile: action.payload < 992,
        },
      };

    default:
      return state;
  }
}
