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
        ...action.payload.Gallery,
      };
    case actions.SET_ITEMS:
      return {
        ...state,
        items: [...action.payload],
      };
    case actions.SET_FILTER:
      return {
        ...state,
        filter: { ...action.payload },
      };

    default:
      return state;
  }
}
