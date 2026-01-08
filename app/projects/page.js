import Link from 'next/link';

export default function Projects() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1>Projects</h1>
      
      <div className="mb-8">
        <Link
          href="https://nulad.github.io/resume"
          className="inline-block bg-black text-white border-4 border-black px-6 py-3 font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Resume
        </Link>
      </div>

      <div className="space-y-6">
        <div className="border-3 border-black p-6 bg-white">
          <h2>Aurelia Salat Time</h2>
          <p className="mb-4">
            A prayer times application built with the Aurelia framework, displaying accurate Islamic prayer schedules.
          </p>
          <a 
            href="https://github.com/nulad/archive/tree/main/aurelia-salat-time" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View Project →
          </a>
        </div>

        <div className="border-3 border-black p-6 bg-white">
          <h2>Candidate Showcase</h2>
          <p className="mb-4">
            A portfolio showcase application for job candidates, demonstrating skills and project work.
          </p>
          <a 
            href="https://github.com/nulad/archive/tree/main/candidate-showcase" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View Project →
          </a>
        </div>

        <div className="border-3 border-black p-6 bg-white">
          <h2>Compression</h2>
          <p className="mb-4">
            File compression and decompression utilities implementing various algorithms.
          </p>
          <a 
            href="https://github.com/nulad/archive/tree/main/compression" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View Project →
          </a>
        </div>
      </div>

      <div className="mt-12">
        <p>
          These projects have been archived from the main repository. View the complete archive at{' '}
          <a 
            href="https://github.com/nulad/archive" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black underline"
          >
            github.com/nulad/archive
          </a>
        </p>
      </div>
    </main>
  );
}
