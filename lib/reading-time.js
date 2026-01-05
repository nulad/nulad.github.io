export function calculateReadingTime(text) {
  if (!text || text.trim().length === 0) return 0;

  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
