import { useState } from "react";
import InfiniteScroll from "./InfiniteScroll";
import PostCard from "./PostCard";

const POSTS_PER_PAGE = 5;

interface Post {
  title?: string;
  date?: string;
  description?: string;
  readingTime?: string;
  slug: string;
}

export default function PostsList({ posts }: { posts: Post[] }) {
  const [displayedCount, setDisplayedCount] = useState(POSTS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  const displayedPosts = posts.slice(0, displayedCount);
  const hasMore = displayedCount < posts.length;

  const loadMore = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      setDisplayedCount((prev) =>
        Math.min(prev + POSTS_PER_PAGE, posts.length)
      );
      setLoading(false);
    }, 300);
  };

  return (
    <InfiniteScroll
      items={displayedPosts}
      renderItem={(post) => (
        <PostCard
          title={post.title}
          date={post.date}
          description={post.description}
          readingTime={post.readingTime}
          slug={post.slug}
        />
      )}
      onLoadMore={loadMore}
      loading={loading}
      hasMore={hasMore}
      loadingLabel="Loading more posts..."
    />
  );
}
