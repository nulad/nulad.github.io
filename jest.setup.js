import '@testing-library/jest-dom'

// Mock remark modules to simulate actual behavior
const mockRemark = {
  remark: () => ({
    use: () => ({
      use: () => ({
        processSync: (text) => {
          // Simulate remark-html output for test cases
          let html = text;
          
          // Headers
          html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
          html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
          html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
          
          // Bold and italic
          html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
          html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
          
          // Inline code
          html = html.replace(/`(.+?)`/g, '<code>$1</code>');
          
          // Links
          html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
          
          // Images
          html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
          
          // Code blocks
          html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            const langClass = lang ? ` class="language-${lang}"` : '';
            return `<pre><code${langClass}>${code.trim()}</code></pre>`;
          });
          
          // Lists
          html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
          html = html.replace(/(<li>.*<\/li>)/s, '<ul>\n$1</ul>');
          html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
          
          // Task lists
          html = html.replace(/^- \[x\] (.+)$/gm, '<li><input type="checkbox" checked="" disabled=""> $1</li>');
          html = html.replace(/^- \[ \] (.+)$/gm, '<li><input type="checkbox" disabled=""> $1</li>');
          
          // Strikethrough
          html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');
          
          // Tables
          html = html.replace(/\|(.+)\|\n\|(.+)\|\n\|(.+)\|/g, (match, header, separator, cells) => {
            const headers = header.split('|').filter(h => h.trim()).map(h => `<th>${h.trim()}</th>`).join('');
            const rows = cells.split('\n').map(row => {
              const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
              return `<tr>${cells}</tr>`;
            }).join('');
            return `<table>\n<thead>\n<tr>${headers}</tr>\n</thead>\n<tbody>\n${rows}</tbody>\n</table>`;
          });
          
          // Autolinks
          html = html.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1">$1</a>');
          
          // Paragraphs
          const lines = html.split('\n');
          let result = [];
          let inParagraph = false;
          
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed === '') {
              if (inParagraph) {
                result.push('</p>');
                inParagraph = false;
              }
            } else if (trimmed.match(/^<(h[1-6]|ul|ol|pre|table|div)/)) {
              if (inParagraph) {
                result.push('</p>');
                inParagraph = false;
              }
              result.push(trimmed);
            } else if (!trimmed.match(/^<\/(h[1-6]|ul|ol|pre|table|div)>/)) {
              if (!inParagraph) {
                result.push('<p>');
                inParagraph = true;
              }
              result.push(trimmed);
            } else {
              result.push(trimmed);
            }
          }
          
          if (inParagraph) {
            result.push('</p>');
          }
          
          return {
            toString: () => result.join('\n')
          };
        }
      })
    })
  })
};

jest.mock('remark', () => mockRemark);
jest.mock('remark-html', () => ({}));
jest.mock('remark-gfm', () => ({}));
