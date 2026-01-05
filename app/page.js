'use client';

import { useState, useLayoutEffect } from 'react';
import { getSortedPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import InfiniteScroll from '@/components/InfiniteScroll';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const postsPerPage = 10;

  // Use useLayoutEffect to show loading state immediately
  useLayoutEffect(() => {
    // Small delay to ensure loading state is visible
    const timer = setTimeout(() => {
      async function fetchPosts() {
        try {
          const allPosts = getSortedPosts();
          setPosts(allPosts);
          
          // Display first 10 posts
          const initialPosts = allPosts.slice(0, postsPerPage);
          setDisplayedPosts(initialPosts);
          setHasMore(allPosts.length > postsPerPage);
          setError(null);
        } catch (err) {
          setError('Failed to fetch posts');
          setPosts([]);
          setDisplayedPosts([]);
          setHasMore(false);
        } finally {
          setLoading(false);
        }
      }

      fetchPosts();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadMore = () => {
    const currentLength = displayedPosts.length;
    const nextPosts = posts.slice(currentLength, currentLength + postsPerPage);
    const newDisplayedPosts = [...displayedPosts, ...nextPosts];
    
    setDisplayedPosts(newDisplayedPosts);
    setHasMore(posts.length > newDisplayedPosts.length);
  };

  if (loading) {
    return (
      <main>
        <h1>nulad.github.io</h1>
        <p>Loading posts...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>nulad.github.io</h1>
        <p>Error loading posts</p>
      </main>
    );
  }

  if (posts.length === 0) {
    return (
      <main>
        <h1>nulad.github.io</h1>
        <p>No posts yet</p>
      </main>
    );
  }

  return (
    <main>
      <h1>nulad.github.io</h1>
      <InfiniteScroll 
        onLoadMore={handleLoadMore} 
        hasMore={hasMore}
      >
        {displayedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </InfiniteScroll>
    </main>
  );
}
