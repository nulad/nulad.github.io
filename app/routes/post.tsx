import { data } from "react-router";
import type { Route } from "./+types/post";
import { getPostBySlug } from "~/lib/posts";
import MarkdownContent from "~/components/MarkdownContent";

export function loader({ params }: Route.LoaderArgs) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    throw data("Not Found", { status: 404 });
  }
  return { post };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.post) {
    return [{ title: "Post Not Found" }];
  }
  return [
    { title: data.post.title || "Untitled Post" },
    {
      name: "description",
      content:
        data.post.excerpt || data.post.description || "A blog post by nulad",
    },
  ];
}

export default function PostPage({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {post.title || "Untitled Post"}
          </h1>
          {post.date && (
            <time className="text-gray-600 block mb-2">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {post.excerpt && (
            <p className="text-xl text-gray-700 italic">{post.excerpt}</p>
          )}
        </header>
        <div className="prose prose-lg">
          <MarkdownContent content={post.content} />
        </div>
      </article>
    </main>
  );
}
