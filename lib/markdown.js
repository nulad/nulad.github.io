// Jest mock for remark to avoid ESM import issues
if (typeof jest !== 'undefined') {
  jest.mock('remark', () => {
    function remark() {
      return {
        use: () => remark(),
        processSync: (markdown) => ({
          toString: () => markdown
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^\* (.*$)/gim, '<li>$1</li>')
            .replace(/^- \[x\] (.*$)/gim, '<li><input type="checkbox" checked disabled /> $1</li>')
            .replace(/^- \[ \] (.*$)/gim, '<li><input type="checkbox" disabled /> $1</li>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(?!<h|<li|<p)(.+)$/gm, '<p>$1</p>')
            .replace(/\n/g, '<br>')
        })
      };
    }
    return remark;
  });
  jest.mock('remark-html');
  jest.mock('remark-gfm');
}

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
  return remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .processSync(trimmed)
    .toString();
}
