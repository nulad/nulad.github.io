import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '../../../lib/posts.js';
import { markdownToHtml } from '../../../lib/markdown.js';
import Link from 'next/link';

// Generate static params for all published posts
export async function generateStaticParams() {
  const posts = getAllPosts({ includeDrafts: false });
  return posts.map((post) => ({
    slug: post.metadata.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.metadata.frontmatter.title,
    description: post.metadata.frontmatter.excerpt,
    openGraph: {
      title: post.metadata.frontmatter.title,
      description: post.metadata.frontmatter.excerpt,
      type: 'article',
      publishedTime: post.metadata.frontmatter.date,
      tags: post.metadata.frontmatter.tags,
    },
  };
}

export default async function PostPage({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="prose prose-lg dark:prose-invert">
        <header className="mb-8">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-block mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">{post.metadata.frontmatter.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            <time dateTime={post.metadata.frontmatter.date}>
              {new Date(post.metadata.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{post.metadata.readingTime}</span>
          </div>
          <div className="flex gap-2 mt-4">
            {post.metadata.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        <div 
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </main>
  );
}
