// Utility functions for the blog
import { calculateReadingTime as calculateReadingTimeImpl } from './reading-time.js';

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function calculateReadingTime(text) {
  return calculateReadingTimeImpl(text);
}
