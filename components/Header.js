'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b-4 border-black p-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-black no-underline hover:bg-black hover:text-white">
          <span className="font-bold text-xl">nulad</span>
        </Link>
        <nav className="flex gap-4">
          <Link href="/projects" className="text-black no-underline hover:bg-black hover:text-white px-2 py-1">
            Projects
          </Link>
        </nav>
      </div>
    </header>
  );
}
