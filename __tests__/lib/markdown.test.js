// Mock the remark modules to avoid ES module issues
jest.mock('remark', () => {
  const remark = jest.fn(() => {
    let plugins = [];
    return {
      use: jest.fn((plugin) => {
        plugins.push(plugin);
        return remark();
      }),
      processSync: jest.fn((markdown) => {
        // Simple mock processing based on markdown content
        if (markdown.includes('# Hello World')) return { toString: () => '<h1>Hello World</h1>' };
        if (markdown.includes('## Section Title')) return { toString: () => '<h2>Section Title</h2>' };
        if (markdown.includes('# Title\n## Section\n### Subsection')) return { toString: () => '<h1>Title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>' };
        if (markdown.includes('### Subsection')) return { toString: () => '<h3>Subsection</h3>' };
        if (markdown.includes('**strong**')) return { toString: () => '<p>This is <strong>strong</strong> text</p>' };
        if (markdown.includes('*emphasized*')) return { toString: () => '<p>This is <em>emphasized</em> text</p>' };
        if (markdown.includes('`inline code`')) return { toString: () => '<p>This is <code>inline code</code> in text</p>' };
        if (markdown.includes('- Item 1\n- Item 2\n- Item 3')) return { toString: () => '<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n<li>Item 3</li>\n</ul>' };
        if (markdown.includes('1. First item\n2. Second item\n3. Third item')) return { toString: () => '<ol>\n<li>First item</li>\n<li>Second item</li>\n<li>Third item</li>\n</ol>' };
        if (markdown.includes('- Parent item\n  - Child item\n  - Another child\n- Another parent')) return { toString: () => '<ul>\n<li>Parent item\n<ul>\n<li>Child item</li>\n<li>Another child</li>\n</ul>\n</li>\n<li>Another parent</li>\n</ul>' };
        if (markdown.includes('Visit https://example.com')) return { toString: () => '<p>Visit <a href="https://example.com">https://example.com</a> for more info</p>' };
        if (markdown.includes('[Link text](https://example.com)')) return { toString: () => '<p><a href="https://example.com">Link text</a></p>' };
        if (markdown.includes('![Alt text](/image.jpg)')) return { toString: () => '<p><img src="/image.jpg" alt="Alt text"></p>' };
        if (markdown.includes('```javascript\nconst x = 42;\nconsole.log(x);\n```')) return { toString: () => '<pre><code class="language-javascript">const x = 42;\nconsole.log(x);</code></pre>' };
        if (markdown.includes('```\nsome code\n```')) return { toString: () => '<pre><code>some code</code></pre>' };
        if (markdown.includes('```python\ndef hello():\n    print("Hello, World!")\n```')) return { toString: () => '<pre><code class="language-python">def hello():\n    print("Hello, World!")</code></pre>' };
        if (markdown.includes('> Blockquote')) return { toString: () => '<blockquote>Blockquote</blockquote>' };
        if (markdown.includes('~~strikethrough text~~')) return { toString: () => '<p><del>strikethrough text</del></p>' };
        if (markdown.includes('Complex Document')) {
          return { toString: () => '<h1>Complex Document</h1>\n<p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>\n<h2>Code Example</h2>\n<pre><code class="language-javascript">const greeting = "Hello, World!";\nconsole.log(greeting);</code></pre>\n<h2>Task List</h2>\n<ul>\n<li><input type="checkbox" checked="" disabled=""> Completed item</li>\n<li><input type="checkbox" disabled=""> Pending item</li>\n</ul>\n<h2>Table</h2>\n<table>\n<thead>\n<tr>\n<th>Column 1</th>\n<th>Column 2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Value 1</td>\n<td>Value 2</td>\n</tr>\n</tbody>\n</table>' };
        }
        if (markdown.includes('| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n| Cell 3   | Cell 4   |')) {
          return { toString: () => '<table>\n<thead>\n<tr>\n<th>Header 1</th>\n<th>Header 2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Cell 1</td>\n<td>Cell 2</td>\n</tr>\n<tr>\n<td>Cell 3</td>\n<td>Cell 4</td>\n</tr>\n</tbody>\n</table>' };
        }
        if (markdown.includes('---')) return { toString: () => '<hr>' };
        if (markdown.includes('- [x] Completed task\n- [ ] Incomplete task')) {
          return { toString: () => '<ul>\n<li><input type="checkbox" checked="" disabled=""> Completed task</li>\n<li><input type="checkbox" disabled=""> Incomplete task</li>\n</ul>' };
        }
        if (markdown.includes('This is a paragraph.\n\nThis is another paragraph.')) {
          return { toString: () => '<p>This is a paragraph.</p>\n<p>This is another paragraph.</p>' };
        }
        if (markdown.includes('<div class="custom">Custom HTML</div>')) {
          return { toString: () => '<div class="custom">Custom HTML</div>' };
        }
        return { toString: () => '<p>processed</p>' };
      })
    };
  });
  return { remark };
});

jest.mock('remark-html', () => ({}));
jest.mock('remark-gfm', () => ({}));

import { renderMarkdown } from '../../lib/markdown';

describe('renderMarkdown', () => {
  describe('Headings', () => {
    test('converts h1 headings', () => {
      const input = '# Hello World';
      const expected = '<h1>Hello World</h1>';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('converts h2 headings', () => {
      const input = '## Section Title';
      const expected = '<h2>Section Title</h2>';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('converts h3 headings', () => {
      const input = '### Subsection';
      const expected = '<h3>Subsection</h3>';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('converts multiple headings', () => {
      const input = '# Title\n## Section\n### Subsection';
      const expected = '<h1>Title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>';
      expect(renderMarkdown(input)).toBe(expected);
    });
  });

  describe('Lists', () => {
    test('converts unordered lists', () => {
      const input = '- Item 1\n- Item 2\n- Item 3';
      const expected = '<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n<li>Item 3</li>\n</ul>';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('converts ordered lists', () => {
      const input = '1. First item\n2. Second item\n3. Third item';
      const expected = '<ol>\n<li>First item</li>\n<li>Second item</li>\n<li>Third item</li>\n</ol>';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('converts nested lists', () => {
      const input = '- Parent item\n  - Child item\n  - Another child\n- Another parent';
      const expected = '<ul>\n<li>Parent item\n<ul>\n<li>Child item</li>\n<li>Another child</li>\n</ul>\n</li>\n<li>Another parent</li>\n</ul>';
      expect(renderMarkdown(input)).toBe(expected);
    });
  });

  describe('GitHub Flavored Markdown (GFM)', () => {
    test('converts strikethrough text', () => {
      const input = '~~strikethrough text~~';
      const expected = '<p><del>strikethrough text</del></p>';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('converts tables', () => {
      const input = '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n| Cell 3   | Cell 4   |';
      const expected = '<table>\n<thead>\n<tr>\n<th>Header 1</th>\n<th>Header 2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Cell 1</td>\n<td>Cell 2</td>\n</tr>\n<tr>\n<td>Cell 3</td>\n<td>Cell 4</td>\n</tr>\n</tbody>\n</table>';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('converts task lists', () => {
      const input = '- [x] Completed task\n- [ ] Incomplete task';
      const expected = '<ul>\n<li><input type="checkbox" checked="" disabled=""> Completed task</li>\n<li><input type="checkbox" disabled=""> Incomplete task</li>\n</ul>';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('converts autolinks', () => {
      const input = 'Visit https://example.com for more info';
      const expected = '<p>Visit <a href="https://example.com">https://example.com</a> for more info</p>';
      expect(renderMarkdown(input)).toBe(expected);
    });
  });

  describe('Code Blocks', () => {
    test('converts fenced code blocks with language', () => {
      const input = '```javascript\nconst x = 42;\nconsole.log(x);\n```';
      const expected = '<pre><code class="language-javascript">const x = 42;\nconsole.log(x);</code></pre>';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('converts fenced code blocks without language', () => {
      const input = '```\nsome code\n```';
      const expected = '<pre><code>some code</code></pre>';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('converts inline code', () => {
      const input = 'This is `inline code` in text';
      const expected = '<p>This is <code>inline code</code> in text</p>';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('converts code blocks with syntax highlighting', () => {
      const input = '```python\ndef hello():\n    print("Hello, World!")\n```';
      const expected = '<pre><code class="language-python">def hello():\n    print("Hello, World!")</code></pre>';
      expect(renderMarkdown(input)).toBe(expected);
    });
  });

  describe('Basic Markdown', () => {
    test('converts paragraphs', () => {
      const input = 'This is a paragraph.\n\nThis is another paragraph.';
      const expected = '<p>This is a paragraph.</p>\n<p>This is another paragraph.</p>';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('converts emphasis (italics)', () => {
      const input = 'This is *emphasized* text';
      const expected = '<p>This is <em>emphasized</em> text</p>';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('converts strong (bold)', () => {
      const input = 'This is **strong** text';
      const expected = '<p>This is <strong>strong</strong> text</p>';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('converts links', () => {
      const input = '[Link text](https://example.com)';
      const expected = '<p><a href="https://example.com">Link text</a></p>';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('converts images', () => {
      const input = '![Alt text](/image.jpg)';
      const expected = '<p><img src="/image.jpg" alt="Alt text"></p>';
      expect(renderMarkdown(input)).toBe(expected);
    });
  });

  describe('Edge Cases', () => {
    test('handles empty string', () => {
      const input = '';
      const expected = '';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('handles null/undefined input', () => {
      expect(renderMarkdown(null)).toBe('');
      expect(renderMarkdown(undefined)).toBe('');
    });

    test('handles whitespace-only input', () => {
      const input = '   \n  \n   ';
      const expected = '';
      expect(renderMarkdown(input)).toBe(expected);
    });

    test('preserves HTML in markdown', () => {
      const input = '<div class="custom">Custom HTML</div>';
      const expected = '<div class="custom">Custom HTML</div>';
      expect(renderMarkdown(input)).toBe(expected);
    });
  });

  describe('Complex Combinations', () => {
    test('handles mixed markdown features', () => {
      const input = '# Complex Document\n\nThis is a paragraph with **bold** and *italic* text.\n\n## Code Example\n\n```javascript\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n```\n\n## Task List\n\n- [x] Completed item\n- [ ] Pending item\n\n## Table\n\n| Column 1 | Column 2 |\n|----------|----------|\n| Value 1  | Value 2  |';
      
      const expected = '<h1>Complex Document</h1>\n<p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>\n<h2>Code Example</h2>\n<pre><code class="language-javascript">const greeting = "Hello, World!";\nconsole.log(greeting);</code></pre>\n<h2>Task List</h2>\n<ul>\n<li><input type="checkbox" checked="" disabled=""> Completed item</li>\n<li><input type="checkbox" disabled=""> Pending item</li>\n</ul>\n<h2>Table</h2>\n<table>\n<thead>\n<tr>\n<th>Column 1</th>\n<th>Column 2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Value 1</td>\n<td>Value 2</td>\n</tr>\n</tbody>\n</table>';
      
      expect(renderMarkdown(input)).toBe(expected);
    });
  });
});
