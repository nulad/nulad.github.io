import Markdown from '../components/Markdown';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Markdown>
        <h1>Markdown Typography Demo</h1>
        <p>This is a demonstration of the markdown typography styles.</p>
        
        <h2>Heading Level 2</h2>
        <p>Here's some text with <strong>bold</strong> and <em>italic</em> formatting.</p>
        
        <h3>Heading Level 3</h3>
        <p>Here's an inline code example: <code>const x = 1;</code></p>
        
        <h4>Code Block Example</h4>
        <pre><code>{`function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet("World");`}</code></pre>
        
        <h2>List Examples</h2>
        <h3>Unordered List</h3>
        <ul>
          <li>First item</li>
          <li>Second item</li>
          <li>Third item with <strong>bold text</strong></li>
        </ul>
        
        <h3>Ordered List</h3>
        <ol>
          <li>Step one</li>
          <li>Step two</li>
          <li>Step three</li>
        </ol>
        
        <h2>Other Elements</h2>
        <blockquote>
          This is a blockquote with some important information.
        </blockquote>
        
        <p>Here's a <a href="#">link example</a> in the text.</p>
        
        <hr />
        
        <p>That's all for the demo!</p>
      </Markdown>
    </div>
  )
}
