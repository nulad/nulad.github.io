'use client';

import React from 'react';
import { renderMarkdown } from '../lib/markdown';
import DOMPurify from 'dompurify';

export default function MarkdownContent({ content, className = '' }) {
  if (!content || typeof content !== 'string') {
    return <div className={`prose prose-lg max-w-none ${className}`} />;
  }

  // Trim whitespace to handle edge cases
  const trimmed = content.trim();
  if (trimmed.length === 0) {
    return <div className={`prose prose-lg max-w-none ${className}`} />;
  }

  // Convert markdown to HTML
  const html = renderMarkdown(trimmed);

  // Sanitize HTML to prevent XSS attacks
  const sanitizedHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'strong', 'em', 'del', 'ins',
      'ul', 'ol', 'li',
      'a', 'img',
      'blockquote', 'hr',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'pre', 'code',
      'div', 'span',
      'input'  // For task list checkboxes
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class',
      'disabled', 'checked', 'type'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:https?|ftp):)?\/\/|mailto:|tel:|callto:|sms:|#|\/)/i,
    FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur']
  });

  // If no content after sanitization, return empty div
  if (!sanitizedHtml || sanitizedHtml.trim() === '') {
    return <div className={`prose prose-lg max-w-none ${className}`} />;
  }

  return (
    <div 
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
