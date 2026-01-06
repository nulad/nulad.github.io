import { getSortedPosts } from '../lib/posts';
import PostsList from '../components/PostsList';

export default function Home() {
  const allPosts = getSortedPosts();

  return (
    <main>
      <h1>nulad.github.io</h1>

      {allPosts.length === 0 ? (
        <p>Blog coming soon...</p>
      ) : (
        <PostsList posts={allPosts} />
      )}
    </main>
  );
}
