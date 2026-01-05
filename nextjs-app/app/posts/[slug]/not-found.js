import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
      <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Sorry, the post you're looking for doesn't exist or has been removed.
      </p>
      <Link 
        href="/" 
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}
