import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import { createHighlighter } from 'shiki';

// Initialize Shiki highlighter
let highlighter = null;

async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: ['javascript', 'typescript', 'jsx', 'tsx', 'html', 'css', 'json', 'bash', 'python', 'java', 'go', 'rust', 'markdown'],
    });
  }
  return highlighter;
}

/**
 * Convert markdown content to HTML with syntax highlighting
 * @param {string} markdown - Raw markdown content
 * @param {Object} options - Options for rendering
 * @param {boolean} options.darkMode - Whether to use dark theme for code highlighting
 * @returns {Promise<string>} HTML string
 */
export async function markdownToHtml(markdown, options = {}) {
  const { darkMode = false } = options;
  
  // Process markdown with remark/rehype
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true });

  const file = await processor.process(markdown);
  let html = String(file);

  // Apply syntax highlighting to code blocks
  const highlighterInstance = await getHighlighter();
  const codeBlockRegex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;
  
  html = html.replace(codeBlockRegex, (match, lang, code) => {
    try {
      // Decode HTML entities
      const decodedCode = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

      const highlighted = highlighterInstance.codeToHtml(decodedCode, {
        lang,
        theme: darkMode ? 'github-dark' : 'github-light',
      });

      // Extract just the highlighted code from Shiki's output
      const preMatch = highlighted.match(/<pre[^>]*>([\s\S]*?)<\/pre>/);
      if (preMatch) {
        return `<div class="code-block-wrapper">${preMatch[0]}</div>`;
      }
      return match;
    } catch (error) {
      console.warn(`Failed to highlight code for language: ${lang}`, error);
      return match;
    }
  });

  // Wrap inline code
  html = html.replace(/<code>([^<]+)<\/code>/g, '<code class="inline-code">$1</code>');

  return html;
}

/**
 * Extract table of contents from markdown content
 * @param {string} markdown - Raw markdown content
 * @returns {Array<{level: number, text: string, id: string}>} Array of headings
 */
export function extractTableOfContents(markdown) {
  const headings = [];
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    
    headings.push({ level, text, id });
  }

  return headings;
}

/**
 * Get reading time estimate for markdown content
 * @param {string} markdown - Raw markdown content
 * @returns {number} Estimated reading time in minutes
 */
export function getReadingTime(markdown) {
  const wordsPerMinute = 200;
  const words = markdown.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
