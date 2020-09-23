import { State } from "../redux/reducers";

export function getRandomCoverImg() {
  return `/assets/cover${Math.ceil(Math.random() * 4)}.jpg`;
}

export function postsSelector(state: State) {
  return Object.values(state.posts);
}
