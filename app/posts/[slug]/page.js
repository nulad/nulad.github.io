import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '../../../lib/posts';
import MarkdownContent from '../../../components/MarkdownContent';
import Header from '../../../components/Header';

export async function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title || 'Untitled Post',
    description: post.excerpt || post.description || 'A blog post by nulad',
  };
}

export default function PostPage({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Header />
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title || 'Untitled Post'}</h1>
          {post.date && (
            <time className="text-gray-600 block mb-2">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
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
