export default function MarkdownDemoLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Markdown Renderer Demo</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
