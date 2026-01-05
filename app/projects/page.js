export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: 'Aurelia Salat Time',
      description: 'A prayer times application built with the Aurelia framework, displaying accurate Islamic prayer schedules.',
      url: 'https://github.com/nulad/archive/tree/main/aurelia-salat-time'
    },
    {
      id: 2,
      title: 'Candidate Showcase',
      description: 'A portfolio showcase application for job candidates, demonstrating skills and project work.',
      url: 'https://github.com/nulad/archive/tree/main/candidate-showcase'
    },
    {
      id: 3,
      title: 'Compression',
      description: 'File compression and decompression utilities implementing various algorithms.',
      url: 'https://github.com/nulad/archive/tree/main/compression'
    }
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1>Projects</h1>

      <div className="mb-8">
        <a
          href="/resume.pdf"
          className="inline-block bg-black text-white border-4 border-black px-6 py-3 font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Resume
        </a>
      </div>

      <div className="space-y-6">
        {projects.map(project => (
          <div
            key={project.id}
            className="border-3 border-black p-6 bg-white"
          >
            <h2>{project.title}</h2>
            <p className="mb-4">{project.description}</p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project →
            </a>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <p>
          These projects have been archived from the main repository. View the full archive at{' '}
          <a
            href="https://github.com/nulad/archive"
            target="_blank"
            rel="noopener noreferrer"
          >
            nulad/archive
          </a>
          .
        </p>
      </div>
    </main>
  );
}
