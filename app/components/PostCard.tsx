import { Link } from "react-router";

interface PostCardProps {
  title?: string;
  date?: string;
  description?: string;
  readingTime?: string;
  slug?: string;
}

export default function PostCard({
  title,
  date,
  description,
  readingTime,
  slug,
}: PostCardProps) {
  if (!title || !date || !description || !slug) {
    return null;
  }

  return (
    <article className="border-4 border-black p-4 hover:bg-black hover:text-white">
      <h2 className="m-0 mb-2 border-0 p-0 bg-transparent text-inherit">
        <Link to={`/posts/${slug}`} className="no-underline text-inherit">
          {title}
        </Link>
      </h2>

      <div className="mb-2">
        <time dateTime={date}>{date}</time>
        {readingTime ? <span>{` · ${readingTime}`}</span> : null}
      </div>

      <p className="m-0">{description}</p>
    </article>
  );
}
