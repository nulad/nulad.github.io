import { createHighlighter } from 'shiki';

/**
 * Shiki highlighter instance
 * @type {import('shiki').Highlighter}
 */
let highlighter = null;

/**
 * Initialize Shiki highlighter with VS Code Dark Plus theme
 * @returns {Promise<void>}
 */
export async function initShiki() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [
        import('shiki/themes/github-light.mjs'),
        import('shiki/themes/dark-plus.mjs')
      ],
      langs: [
        'javascript',
        'typescript',
        'jsx',
        'tsx',
        'html',
        'css',
        'json',
        'markdown',
        'bash',
        'python',
        'java',
        'cpp',
        'rust',
        'go',
        'php',
        'sql',
        'yaml',
        'plaintext'
      ],
    });
  }
}

/**
 * Highlight code blocks using Shiki
 * @param {string} code - Code to highlight
 * @param {string} lang - Language identifier
 * @returns {string} Highlighted HTML
 */
export function highlightCode(code, lang) {
  if (!highlighter) {
    throw new Error('Shiki not initialized. Call initShiki() first.');
  }
  
  try {
    return highlighter.codeToHtml(code, {
      lang,
      themes: {
        light: 'github-light',
        dark: 'dark-plus'
      },
      defaultColor: 'dark',
    });
  } catch (error) {
    // Fallback to plaintext if language not supported
    return highlighter.codeToHtml(code, {
      lang: 'plaintext',
      themes: {
        light: 'github-light',
        dark: 'dark-plus'
      },
      defaultColor: 'dark',
    });
  }
}

/**
 * Process markdown content and highlight code blocks
 * @param {string} content - Raw markdown content
 * @returns {string} Content with highlighted code blocks
 */
export function processMarkdownCodeBlocks(content) {
  if (!highlighter) {
    throw new Error('Shiki not initialized. Call initShiki() first.');
  }

  // Match code blocks with language: ```lang\n...\n```
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  
  return content.replace(codeBlockRegex, (match, lang = 'plaintext', code) => {
    const highlighted = highlightCode(code.trim(), lang);
    return highlighted;
  });
}

/**
 * Get the initialized highlighter instance
 * @returns {import('shiki').Highlighter}
 */
export function getHighlighter() {
  if (!highlighter) {
    throw new Error('Shiki not initialized. Call initShiki() first.');
  }
  return highlighter;
}
