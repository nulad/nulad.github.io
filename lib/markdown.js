/**
 * Renders markdown string to HTML
 * @param {string} markdown - The markdown string to render
 * @returns {Promise<string>} The rendered HTML
 */
async function renderMarkdown(markdown) {
  if (!markdown || markdown.trim().length === 0) {
    return '';
  }

  try {
    const { remark } = await import('remark');
    const remarkGfm = await import('remark-gfm');
    const remarkHtml = await import('remark-html');
    
    const result = await remark()
      .use(remarkGfm.default)
      .use(remarkHtml.default, { sanitize: false })
      .process(markdown);
    
    return result.toString().trim();
  } catch (error) {
    console.error('Error rendering markdown:', error);
    return '';
  }
}

/**
 * Synchronous version of renderMarkdown for compatibility with tests
 * @param {string} markdown - The markdown string to render
 * @returns {string} The rendered HTML
 */
function renderMarkdownSync(markdown) {
  if (!markdown || markdown.trim().length === 0) {
    return '';
  }

  try {
    let html = markdown;
    
    // Split into lines for processing
    const lines = html.split('\n');
    const processedLines = [];
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i];
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (!trimmedLine) {
        processedLines.push('');
        i++;
        continue;
      }
      
      // Headers
      if (trimmedLine.startsWith('# ')) {
        processedLines.push(`<h1>${trimmedLine.slice(2)}</h1>`);
      } else if (trimmedLine.startsWith('## ')) {
        processedLines.push(`<h2>${trimmedLine.slice(3)}</h2>`);
      } else if (trimmedLine.startsWith('### ')) {
        processedLines.push(`<h3>${trimmedLine.slice(4)}</h3>`);
      }
      // Code blocks
      else if (trimmedLine.startsWith('```')) {
        const lang = trimmedLine.slice(3).trim();
        const codeLines = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        const langClass = lang ? ` class="language-${lang}"` : '';
        processedLines.push(`<pre><code${langClass}>${codeLines.join('\n')}</code></pre>`);
      }
      // Tables
      else if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
        const tableLines = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) {
          tableLines.push(lines[i]);
          i++;
        }
        if (tableLines.length >= 3) {
          const header = tableLines[0];
          const separator = tableLines[1];
          const rows = tableLines.slice(2);
          
          const headerCells = header.split('|').slice(1, -1).map(cell => `<th>${cell.trim()}</th>`).join('\n');
          const bodyRows = rows.map(row => {
            const cells = row.split('|').slice(1, -1).map(cell => `<td>${cell.trim()}</td>`).join('\n');
            return `<tr>\n${cells}\n</tr>`;
          }).join('\n');
          
          processedLines.push(`<table>\n<thead>\n<tr>\n${headerCells}\n</tr>\n</thead>\n<tbody>\n${bodyRows}\n</tbody>\n</table>`);
        } else {
          processedLines.push(...tableLines);
        }
        continue;
      }
      // Lists
      else if (trimmedLine.startsWith('- ') || trimmedLine.match(/^\d+\. /)) {
        const listLines = [];
        const listType = trimmedLine.startsWith('- ') ? 'ul' : 'ol';
        
        while (i < lines.length) {
          const currentLine = lines[i].trim();
          if (!currentLine) break;
          if (!currentLine.startsWith('- ') && !currentLine.match(/^\d+\. /)) break;
          
          if (currentLine.startsWith('- [x] ')) {
            listLines.push(`<li><input type="checkbox" checked="" disabled=""> ${currentLine.slice(6)}</li>`);
          } else if (currentLine.startsWith('- [ ] ')) {
            listLines.push(`<li><input type="checkbox" disabled=""> ${currentLine.slice(6)}</li>`);
          } else if (currentLine.startsWith('- ')) {
            listLines.push(`<li>${currentLine.slice(2)}</li>`);
          } else if (currentLine.match(/^\d+\. /)) {
            listLines.push(`<li>${currentLine.replace(/^\d+\. /, '')}</li>`);
          }
          i++;
        }
        
        processedLines.push(`<${listType}>\n${listLines.join('\n')}\n</${listType}>`);
        continue;
      }
      // Regular paragraph
      else {
        let processedLine = trimmedLine;
        
        // Check if it's already HTML (shouldn't wrap in p tags)
        if (processedLine.startsWith('<') && processedLine.endsWith('>')) {
          processedLines.push(processedLine);
        } else {
          // Images first (before links to avoid conflicts)
          processedLine = processedLine.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
          
          // Links
          processedLine = processedLine.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
          
          // Bold and italic
          processedLine = processedLine.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
          processedLine = processedLine.replace(/\*(.+?)\*/g, '<em>$1</em>');
          
          // Strikethrough
          processedLine = processedLine.replace(/~~(.+?)~~/g, '<del>$1</del>');
          
          // Inline code
          processedLine = processedLine.replace(/`(.+?)`/g, '<code>$1</code>');
          
          // Autolinks (but not inside existing links)
          if (!processedLine.includes('<a href=')) {
            processedLine = processedLine.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1">$1</a>');
          }
          
          processedLines.push(`<p>${processedLine}</p>`);
        }
      }
      
      i++;
    }
    
    return processedLines.filter(line => line.trim() !== '').join('\n').trim();
  } catch (error) {
    console.error('Error rendering markdown:', error);
    return '';
  }
}

module.exports = {
  renderMarkdown,
  renderMarkdownSync,
};
