import CommentType from "../types/comment";
import SectionSeparator from "./section-separator";

type Props = {
  body: string;
  comments?: CommentType[];
};

const PostBody = ({ body, comments }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-2xl">{body}</div>
      <SectionSeparator />
      <h1 className="text-xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8">
        Comments
      </h1>
      <div>
        {comments?.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-sm shadow-small my-4 font-medium text-gray-800"
          >
            {c.body}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostBody;
