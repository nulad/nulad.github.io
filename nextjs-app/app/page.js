import Link from 'next/link';
import { getAllPosts } from '../../lib/posts.js';

export default function Home() {
  const posts = getAllPosts({ includeDrafts: false });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <header className="mb-16">
          <h1 className="text-5xl font-bold text-black dark:text-zinc-50 mb-4">
            Blog
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Thoughts, tutorials, and notes on development, design, and technology.
          </p>
        </header>

        <div className="space-y-12">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-600 dark:text-zinc-400">
                No posts published yet. Check back soon!
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <article 
                key={post.metadata.slug} 
                className="border-b border-zinc-200 dark:border-zinc-800 pb-12"
              >
                <Link href={`/posts/${post.metadata.slug}`}>
                  <h2 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.metadata.frontmatter.title}
                  </h2>
                </Link>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                  {post.metadata.frontmatter.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-500">
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
                      className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
