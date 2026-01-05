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

  const htmlWithCheckboxState = html.replace(
    /<input([^>]*?)type=("|')checkbox\2([^>]*?)>/gi,
    (match, before, quote, after) => {
      const hasChecked = /\schecked(\s|=|>)/i.test(match);
      if (!hasChecked) {
        return match;
      }

      // Ensure checked attribute is present and properly formatted
      if (/\schecked=/i.test(match)) {
        return match;
      }

      // Add checked attribute before closing >
      return match.replace(/(\s*|\/?)>/, ' checked>');
    }
  );

  // Sanitize HTML to prevent XSS attacks
  const sanitizedHtml = DOMPurify.sanitize(htmlWithCheckboxState, {
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
      'disabled', 'checked', 'type', 'value',
      'data-checked'
    ],
    ADD_ATTR: ['checked', 'data-checked'],
    ALLOW_DATA_ATTR: true,
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
      const checkboxes = containerRef.current.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((input) => {
        if (input.hasAttribute('checked')) {
          input.checked = true;
        }

        input.disabled = true;
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
