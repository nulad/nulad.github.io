import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

export function renderMarkdown(markdown) {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }

  // Trim whitespace to handle edge cases
  const trimmed = markdown.trim();
  if (trimmed.length === 0) {
    return '';
  }

  // Process markdown with remark
  const result = remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .processSync(trimmed);

  return result.toString();
}
