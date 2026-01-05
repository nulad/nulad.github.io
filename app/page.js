'use client';

import { useState, useEffect } from 'react';
import { getSortedPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import InfiniteScroll from '@/components/InfiniteScroll';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const sortedPosts = getSortedPosts();
        setPosts(sortedPosts);
        setError(null);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  const renderPost = (post) => (
    <PostCard key={post.slug} post={post} />
  );

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">nulad.github.io</h1>
        <div className="text-center text-gray-500" role="status" aria-live="polite">
          Loading posts...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">nulad.github.io</h1>
        <div className="text-center text-red-500" role="alert">
          Error loading posts. Please try again.
        </div>
      </main>
    );
  }

  if (posts.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">nulad.github.io</h1>
        <div className="text-center text-gray-500">
          No posts yet. Check back soon!
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">nulad.github.io</h1>
      
      <InfiniteScroll
        items={posts}
        renderItem={renderPost}
        itemsPerPage={5}
      />
    </main>
  );
}
