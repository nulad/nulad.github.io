import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <article className="post-card bg-white p-6 mb-6 hover:shadow-lg transition-shadow" 
             style={{ border: '2px solid black' }}>
      <Link href={`/posts/${post.slug}`}>
        <div className="block">
          <h2 className="text-2xl font-bold mb-2 hover:underline">
            {post.title}
          </h2>
          
          <div className="flex items-center gap-4 mb-3">
            <time className="text-sm text-gray-600">{post.date}</time>
            <span className="text-sm">•</span>
            <div data-testid="reading-time" className="text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTime}
            </div>
          </div>
          
          <p className="text-gray-800 mb-4">
            {post.description}
          </p>
          
          {post.tags && post.tags.length > 0 && (
            <div data-testid="tags-container" className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 text-sm border border-black bg-gray-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
