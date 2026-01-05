import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <div data-testid="post-card">
      <h3 data-testid="post-title">{post.title}</h3>
      <time data-testid="post-date">{post.date}</time>
      <p data-testid="post-description">{post.description}</p>
      <Link href={`/posts/${post.slug}`} data-testid="post-link">
        Read more
      </Link>
    </div>
  );
}
