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
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>

      <div className="mb-8">
        <a
          href="/resume.pdf"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Resume
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <div
            key={project.id}
            className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-3">{project.title}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <a
              href={project.url}
              className="text-blue-600 hover:text-blue-800 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project →
            </a>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <p className="text-gray-600">
          These projects have been archived from the main repository. View the full archive at{' '}
          <a
            href="https://github.com/nulad/archive"
            className="text-blue-600 hover:text-blue-800 font-medium"
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
