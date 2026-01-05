/**
 * Calculate estimated reading time for blog posts
 * @param {string} content - The markdown content to analyze
 * @param {object} options - Configuration options
 * @param {number} options.wordsPerMinute - Reading speed (default: 225)
 * @param {boolean} options.excludeCodeBlocks - Whether to exclude code blocks from word count
 * @returns {string} Formatted reading time string (e.g., "5 min read")
 */
export function calculateReadingTime(content, options = {}) {
  const {
    wordsPerMinute = 225,
    excludeCodeBlocks = true
  } = options;

  let processedContent = content;

  // Remove code blocks if specified
  if (excludeCodeBlocks) {
    // Remove fenced code blocks (```code```)
    processedContent = processedContent.replace(/```[\s\S]*?```/g, '');
    // Remove inline code (`code`)
    processedContent = processedContent.replace(/`[^`]+`/g, '');
  }

  // Remove markdown syntax
  processedContent = processedContent
    // Remove headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove list markers
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    // Remove horizontal rules
    .replace(/^---+$/gm, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();

  // Count words
  const words = processedContent.split(' ').filter(word => word.length > 0).length;

  // Calculate reading time
  const minutes = Math.ceil(words / wordsPerMinute);

  // Handle edge cases
  if (words === 0) return '0 min read';
  if (minutes === 1) return '1 min read';
  if (minutes > 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) return `${hours} hour read`;
    return `${hours} hour ${remainingMinutes} min read`;
  }

  return `${minutes} min read`;
}

/**
 * Get word count for content
 * @param {string} content - The content to analyze
 * @param {boolean} excludeCodeBlocks - Whether to exclude code blocks
 * @returns {number} Total word count
 */
export function getWordCount(content, excludeCodeBlocks = true) {
  let processedContent = content;

  if (excludeCodeBlocks) {
    processedContent = processedContent.replace(/```[\s\S]*?```/g, '');
    processedContent = processedContent.replace(/`[^`]+`/g, '');
  }

  // Remove markdown syntax (same as above but without the extra processing)
  processedContent = processedContent
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/^>\s+/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/^---+$/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  return processedContent.split(' ').filter(word => word.length > 0).length;
}
