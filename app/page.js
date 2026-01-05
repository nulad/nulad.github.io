import { getSortedPosts } from '../lib/posts';
import PostCard from '../components/PostCard';
import InfiniteScroll from '../components/InfiniteScroll';
import { useState } from 'react';

export default function Home() {
  const posts = getSortedPosts();
  const postsPerPage = 10;
  const [displayedPosts, setDisplayedPosts] = useState(posts.slice(0, postsPerPage));
  const [hasMore, setHasMore] = useState(posts.length > postsPerPage);

  const handleLoadMore = () => {
    const currentLength = displayedPosts.length;
    const nextPosts = posts.slice(currentLength, currentLength + postsPerPage);
    const newDisplayedPosts = [...displayedPosts, ...nextPosts];
    
    setDisplayedPosts(newDisplayedPosts);
    setHasMore(posts.length > newDisplayedPosts.length);
  };

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
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
      >
        {displayedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </InfiniteScroll>
    </main>
  );
}
