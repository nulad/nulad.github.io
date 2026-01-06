'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { renderMarkdown } from '../lib/markdown';

// Lazy load DOMPurify only on client side
let DOMPurify = null;
if (typeof window !== 'undefined') {
  DOMPurify = require('dompurify');
}

export default function MarkdownContent({ content, className = '' }) {
  const containerRef = useRef(null);

  // Trim whitespace to handle edge cases
  const trimmed = (content && typeof content === 'string') ? content.trim() : '';

  const taskListStates = useMemo(() => {
    if (!trimmed) return [];
    return Array.from(trimmed.matchAll(/^\s*[-*+]\s+\[(x| )\]\s+/gmi)).map(
      (m) => m[1].toLowerCase() === 'x'
    );
  }, [trimmed]);

  const sanitizedHtml = useMemo(() => {
    if (!trimmed) return '';
    // Convert markdown to HTML
    const html = renderMarkdown(trimmed);

    const htmlWithCheckboxState = html.replace(
      /<input([^>]*?)type=("|')checkbox\2([^>]*?)>/gi,
      (match) => {
        const hasChecked = /\schecked(\s|=|>)/i.test(match);
        if (!hasChecked) {
          return match;
        }

        if (/\sdata-checked(\s|=|>)/i.test(match)) {
          return match;
        }

        return match.replace(/>\s*$/i, ' data-checked="true">');
      }
    );

    // Sanitize HTML to prevent XSS attacks (only on client side)
    if (DOMPurify) {
      return DOMPurify.sanitize(htmlWithCheckboxState, {
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
    }

    // During SSR, return the HTML with checkbox state
    // The markdown library already escapes HTML, so this is safe
    return htmlWithCheckboxState;
  }, [trimmed]);

  // Fix task list checkboxes after render
  useEffect(() => {
    if (containerRef.current) {
      const checkboxes = containerRef.current.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((input) => {
        const index = Array.prototype.indexOf.call(checkboxes, input);
        if (Number.isInteger(index) && index >= 0 && index < taskListStates.length) {
          input.checked = taskListStates[index];
        }

        input.disabled = true;
      });
    }
  }, [sanitizedHtml, taskListStates]);

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

  return (
    <div
      ref={containerRef}
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
