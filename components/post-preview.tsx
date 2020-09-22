import Link from "next/link";
import CoverImage from "./cover-image";

type Props = {
  title: string;
  coverImage: string;
  id: string;
};

const PostPreview = ({ title, coverImage, id }: Props) => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage id={id} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${id}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
    </div>
  );
};

export default PostPreview;
