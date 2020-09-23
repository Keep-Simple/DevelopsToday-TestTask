import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { createStore } from "redux";
import { reducer, State } from "./reducers";

// create a makeStore function
const makeStore: MakeStore<State> = (context: Context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, { debug: true });
