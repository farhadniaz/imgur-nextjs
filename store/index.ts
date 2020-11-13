import { createStore, /* applyMiddleware,*/ combineReducers } from "redux";
// import logger from "redux-logger";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";

import { composeWithDevTools } from "redux-devtools-extension";
import initialState, { InitialStateInterface } from "./initial-state";

import reducers from "./reducers";

export const makeStore: MakeStore<InitialStateInterface> = (context: Context) =>
  createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools()
    /*, applyMiddleware(logger)*/
  );

export const wrapper = createWrapper<InitialStateInterface>(makeStore, {
  debug: true,
});
