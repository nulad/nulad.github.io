export default function DesignSystemDemo() {
  return (
    <div className="container" style={{ padding: 'var(--space-12) 0' }}>
      <header style={{ marginBottom: 'var(--space-20)' }}>
        <h1>Design System Demo</h1>
        <p style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-primary)' }}>
          Brutalist & Readable Design System
        </p>
      </header>

      <section style={{ marginBottom: 'var(--section-gap)' }}>
        <h2>Typography Scale</h2>
        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <h1>Heading 1 - The quick brown fox</h1>
          <h2>Heading 2 - The quick brown fox</h2>
          <h3>Heading 3 - The quick brown fox</h3>
          <h4>Heading 4 - The quick brown fox</h4>
          <h5>Heading 5 - The quick brown fox</h5>
          <h6>Heading 6 - The quick brown fox</h6>
          <p>
            Body text: The quick brown fox jumps over the lazy dog. This paragraph demonstrates the base body text styling with optimal line height and character width for comfortable reading.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--section-gap)' }}>
        <h2>Text Elements</h2>
        <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
          <div>
            <h3>Links</h3>
            <p>
              This is a paragraph with a <a href="#">regular link</a>, a{' '}
              <a href="#">visited link</a>, and a{' '}
              <a href="#">link on hover</a> (hover to see).
            </p>
          </div>
          
          <div>
            <h3>Text Styling</h3>
            <p>
              <strong>Bold text</strong> for emphasis,{' '}
              <em>italic text</em> for stress, and{' '}
              <code>inline code</code> for technical references.
            </p>
          </div>

          <div>
            <h3>Blockquote</h3>
            <blockquote>
              Design is not just what it looks like and feels like. Design is how it works.
            </blockquote>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--section-gap)' }}>
        <h2>Lists</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)' }}>
          <div>
            <h3>Unordered List</h3>
            <ul>
              <li>First item with important content</li>
              <li>Second item with a <a href="#">nested link</a></li>
              <li>Third item with multiple lines of text that wraps to demonstrate line height and spacing</li>
              <li>Fourth item</li>
            </ul>
          </div>
          
          <div>
            <h3>Ordered List</h3>
            <ol>
              <li>Step one: Initialize the project</li>
              <li>Step two: Configure the design system</li>
              <li>Step three: Implement components</li>
              <li>Step four: Deploy and iterate</li>
            </ol>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--section-gap)' }}>
        <h2>Code Blocks</h2>
        <pre>
{`// JavaScript example
function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);`}
        </pre>
      </section>

      <section style={{ marginBottom: 'var(--section-gap)' }}>
        <h2>Tables</h2>
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>--font-size-base</code></td>
              <td>1rem</td>
              <td>Base font size for body text</td>
            </tr>
            <tr>
              <td><code>--space-4</code></td>
              <td>1rem</td>
              <td>Standard spacing unit</td>
            </tr>
            <tr>
              <td><code>--color-text-primary</code></td>
              <td>#0a0a0a / #ffffff</td>
              <td>Primary text color (light/dark mode)</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: 'var(--section-gap)' }}>
        <h2>Color Palette</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
          <div style={{ padding: 'var(--space-4)', border: '2px solid var(--color-border)' }}>
            <h4>Primary Text</h4>
            <p style={{ color: 'var(--color-text-primary)' }}>Primary text color</p>
          </div>
          <div style={{ padding: 'var(--space-4)', border: '2px solid var(--color-border)' }}>
            <h4>Secondary Text</h4>
            <p style={{ color: 'var(--color-text-secondary)' }}>Secondary text color</p>
          </div>
          <div style={{ padding: 'var(--space-4)', border: '2px solid var(--color-border)' }}>
            <h4>Tertiary Text</h4>
            <p style={{ color: 'var(--color-text-tertiary)' }}>Tertiary text color</p>
          </div>
          <div style={{ padding: 'var(--space-4)', border: '2px solid var(--color-border)' }}>
            <h4>Accent Color</h4>
            <p style={{ color: 'var(--color-accent)' }}>Accent color for highlights</p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--section-gap)' }}>
        <h2>Spacing Examples</h2>
        <div style={{ display: 'grid', gap: 'var(--space-8)' }}>
          <div style={{ padding: 'var(--space-2)', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            Padding: var(--space-2) (8px)
          </div>
          <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            Padding: var(--space-4) (16px)
          </div>
          <div style={{ padding: 'var(--space-8)', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            Padding: var(--space-8) (32px)
          </div>
        </div>
      </section>

      <footer style={{ marginTop: 'var(--space-32)', paddingTop: 'var(--space-8)', borderTop: '2px solid var(--color-border)' }}>
        <p style={{ color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
          Design System Demo • Built with Next.js and Tailwind CSS
        </p>
      </footer>
    </div>
  );
}
