import CommentType from "./comment";

type PostType = {
  id: string;
  title: string;
  body: string;
  coverImage?: string;
  comments?: CommentType[];
};

export default PostType;
