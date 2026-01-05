import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { initShiki, processMarkdownCodeBlocks } from './markdown.js';

/**
 * Initialize the markdown renderer with Shiki
 * Must be called once at application startup
 * @returns {Promise<void>}
 */
export async function initMarkdownRenderer() {
  await initShiki();
}

/**
 * Convert markdown content to HTML with syntax highlighting
 * @param {string} content - Raw markdown content
 * @returns {Promise<string>} HTML content with highlighted code blocks
 */
export async function markdownToHtml(content) {
  // First process code blocks with Shiki
  const processedContent = processMarkdownCodeBlocks(content);
  
  // Then process the rest of the markdown with remark, preserving HTML
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true });
    
  const result = await processor.process(processedContent);
  
  return result.toString();
}

/**
 * Convert markdown content to HTML (synchronous version for build-time)
 * Note: This assumes Shiki has been initialized
 * @param {string} content - Raw markdown content
 * @returns {string} HTML content with highlighted code blocks
 */
export function markdownToHtmlSync(content) {
  // First process code blocks with Shiki
  const processedContent = processMarkdownCodeBlocks(content);
  
  // Then process the rest of the markdown with remark, preserving HTML
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true });
    
  const result = processor.processSync(processedContent);
  
  return result.toString();
}
