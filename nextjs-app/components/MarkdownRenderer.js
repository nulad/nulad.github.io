'use client';

import { useEffect, useState } from 'react';
import { markdownToHtml } from '../lib/markdown.js';

export default function MarkdownRenderer({ content, className = '' }) {
  const [html, setHtml] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode preference
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    // Initial check
    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (content) {
      markdownToHtml(content, { darkMode: isDarkMode }).then(setHtml);
    }
  }, [content, isDarkMode]);

  if (!html) {
    return <div className={`animate-pulse ${className}`}>Loading...</div>;
  }

  return (
    <div
      className={`prose prose-zinc max-w-none dark:prose-invert ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
