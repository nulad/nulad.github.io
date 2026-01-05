'use client';

import React, { useEffect, useRef } from 'react';
import { renderMarkdown } from '../lib/markdown';
import DOMPurify from 'dompurify';

export default function MarkdownContent({ content, className = '' }) {
  const containerRef = useRef(null);

  // Handle empty or whitespace-only content
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
      'disabled', 'checked', 'type', 'value'
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

  // If no media elements and no text content (or only whitespace), return empty div
  if (!hasMedia && (!textOnly || textOnly.trim().length === 0)) {
    return <div className={`prose prose-lg max-w-none ${className}`} />;
  }

  // Fix task list checkboxes after render
  useEffect(() => {
    if (containerRef.current) {
      const taskListItems = containerRef.current.querySelectorAll('li.task-list-item');
      taskListItems.forEach((li) => {
        const input = li.querySelector('input[type="checkbox"]');
        if (input && li.classList.contains('task-list-item')) {
          // The checked attribute should be preserved by DOMPurify now
          // But we'll ensure it's properly set based on the original HTML
          if (li.innerHTML.includes('checked=""') || li.innerHTML.includes('checked="checked"')) {
            input.checked = true;
          }
        }
      });
    }
  }, [sanitizedHtml]);

  return (
    <div 
      ref={containerRef}
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
