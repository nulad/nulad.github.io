'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b-4 border-black p-4">
      <Link href="/" className="text-black no-underline hover:bg-black hover:text-white">
        <span className="font-bold text-xl">nulad</span>
      </Link>
    </header>
  );
}
