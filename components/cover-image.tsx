import cn from "classnames";
import Link from "next/link";

type Props = {
  title: string;
  id?: string;
  src: string;
};

const CoverImage = ({ title, id, src }: Props) => {
  const image = (
    <img
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": id,
      })}
    />
  );
  return (
    <div className="sm:mx-0">
      {id ? (
        <Link as={`/posts/${id}`} href="/posts/[id]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
