import Link from 'next/link';

export default function Header() {
  return (
    <header 
      className="header bg-white"
      style={{ borderBottom: '4px solid black', padding: '1rem 2rem' }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="text-2xl font-bold hover:underline"
        >
          <h1 className="text-2xl font-bold m-0">nulad.dev</h1>
        </Link>
        
        <nav role="navigation" className="flex gap-6">
          <Link 
            href="/blog" 
            className="text-lg font-medium hover:underline border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-colors"
          >
            Blog
          </Link>
          <Link 
            href="/about" 
            className="text-lg font-medium hover:underline border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
