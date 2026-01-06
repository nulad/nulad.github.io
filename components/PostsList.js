'use client';

import { useState } from 'react';
import InfiniteScroll from './InfiniteScroll';
import PostCard from './PostCard';

const POSTS_PER_PAGE = 5;

export default function PostsList({ posts }) {
  const [displayedCount, setDisplayedCount] = useState(POSTS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  const displayedPosts = posts.slice(0, displayedCount);
  const hasMore = displayedCount < posts.length;

  const loadMore = () => {
    if (loading) return;

    setLoading(true);

    // Simulate async loading
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + POSTS_PER_PAGE, posts.length));
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
