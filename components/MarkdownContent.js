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

  // If no meaningful content after processing, return empty div
  if (!html || html.trim() === '') {
    return <div className={`prose prose-lg max-w-none ${className}`} />;
  }

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
    KEEP_CONTENT: true,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    ALLOWED_URI_REGEXP: /^(?:(?:(?:https?|ftp):)?\/\/|mailto:|tel:|callto:|sms:|#|\/)/i,
    FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur']
  });

  // If no meaningful content after sanitization, return empty div
  if (!sanitizedHtml || sanitizedHtml.trim() === '') {
    return <div className={`prose prose-lg max-w-none ${className}`} />;
  }

  // Check if HTML contains only whitespace/empty paragraphs
  // First, strip out all HTML tags and check if there's meaningful text
  const hasMedia = /<(img|hr|br|input|table)/i.test(sanitizedHtml);
  const textOnly = sanitizedHtml.replace(/<[^>]*>/g, '');
  
  // Also normalize newlines and spaces to handle cases like "\n  \n"
  const normalizedText = textOnly.replace(/\s+/g, ' ').trim();

  // If no media elements and no text content (or only whitespace), return empty div
  if (!hasMedia && (!normalizedText || normalizedText.length === 0)) {
    return <div className={`prose prose-lg max-w-none ${className}`} />;
  }

  return (
    <div 
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
