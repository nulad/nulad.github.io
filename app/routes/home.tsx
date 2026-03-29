import type { Route } from "./+types/home";
import { getSortedPosts } from "~/lib/posts";
import PostsList from "~/components/PostsList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "nulad.github.io" },
    { name: "description", content: "Personal blog by nulad" },
  ];
}

export function loader({}: Route.LoaderArgs) {
  const allPosts = getSortedPosts();
  // Strip content to avoid sending full markdown to client
  const posts = allPosts.map(({ content, ...rest }) => rest);
  return { posts };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;

  return (
    <main>
      <h1>nulad.github.io</h1>

      {posts.length === 0 ? (
        <p>Blog coming soon...</p>
      ) : (
        <PostsList posts={posts} />
      )}
    </main>
  );
}
