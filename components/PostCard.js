import React from 'react';
import Link from 'next/link';

export default function PostCard({ post, className = '' }) {
  if (!post) {
    return null;
  }

  const { slug, title, description, date, tags } = post;
  
  // Truncate description to prevent layout issues
  const truncatedDescription = description && description.length > 150 
    ? description.substring(0, 150) + '...' 
    : description;

  return (
    <Link href={`/posts/${slug}`}>
      <div className={`post-card block p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200 cursor-pointer ${className}`}>
        <article>
          {date && (
            <time className="text-sm text-gray-500 mb-2 block" dateTime={date}>
              {date}
            </time>
          )}
          
          <h2 className="text-xl font-bold mb-2 text-gray-900 hover:text-blue-600 transition-colors duration-200">
            {title}
          </h2>
          
          {truncatedDescription && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {truncatedDescription}
            </p>
          )}
          
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </Link>
  );
}
