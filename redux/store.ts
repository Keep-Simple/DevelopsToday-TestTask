import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer, State } from "./reducers";

const makeStore: MakeStore<State> = (context: Context) =>
  createStore(reducer, applyMiddleware(thunk));

export const wrapper = createWrapper<State>(makeStore);
