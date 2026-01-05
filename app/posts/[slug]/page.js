import { getPostBySlug, getAllPosts } from '../../../lib/posts';
import MarkdownContent from '../../../components/MarkdownContent';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose prose-lg max-w-none">
      <header>
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{post.date}</time>
        {post.description && <p className="lead">{post.description}</p>}
        {post.tags && (
          <div className="tags">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <MarkdownContent content={post.content} />
    </article>
  );
}