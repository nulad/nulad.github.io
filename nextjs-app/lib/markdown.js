import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { createHighlighter } from 'shiki';

// Cache the highlighter to avoid recreating it for every render
let highlighterPromise = null;

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: ['javascript', 'typescript', 'jsx', 'tsx', 'html', 'css', 'json', 'bash', 'markdown', 'sh', 'js'],
    });
  }
  return highlighterPromise;
}

/**
 * Convert markdown content to HTML with syntax highlighting
 * @param {string} markdown - Raw markdown content
 * @returns {Promise<string>} HTML string
 */
export async function markdownToHtml(markdown) {
  const highlighter = await getHighlighter();
  
  const result = await remark()
    .use(() => (tree) => {
      // Visit code blocks and add syntax highlighting
      visit(tree, 'code', (node) => {
        const lang = node.lang || 'text';
        const code = node.value || '';
        
        if (highlighter.getLoadedLanguages().includes(lang)) {
          const html = highlighter.codeToHtml(code, {
            lang,
            themes: {
              light: 'github-light',
              dark: 'github-dark',
            },
          });
          // Replace the code block with the highlighted HTML
          node.type = 'html';
          node.value = html;
        }
      });
    })
    .use(remarkHtml, {
      sanitize: false, // Allow HTML in markdown
    })
    .process(markdown);

  return result.toString();
}

/**
 * Simple visitor function for traversing MDAST
 */
function visit(node, type, visitor) {
  if (node.type === type) {
    visitor(node);
  }
  if (node.children) {
    for (const child of node.children) {
      visit(child, type, visitor);
    }
  }
}

/**
 * Convert markdown to plain text (for excerpts)
 * @param {string} markdown - Raw markdown content
 * @returns {string} Plain text
 */
export function markdownToText(markdown) {
  return markdown
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1') // Remove images, keep alt text
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/> /g, '') // Remove blockquote marker
    .replace(/\n{3,}/g, '\n\n') // Normalize multiple newlines
    .trim();
}
