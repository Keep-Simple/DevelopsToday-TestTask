import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import PostType from "../types/post";
import { ADD_POST, ALL_POSTS } from "./types";

export interface State {
  posts: {
    [id: string]: PostType;
  };
}

export const reducer = (
  state: State = { posts: {} },
  action: AnyAction
): State => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { posts: { ...state.posts, ...action.payload.posts } };
    case ALL_POSTS:
      return { posts: action.payload };
    case ADD_POST:
      return {
        posts: {
          ...state.posts,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};
