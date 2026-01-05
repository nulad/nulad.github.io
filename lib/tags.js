import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Extract tags from frontmatter of a markdown file
 * @param {string} filePath - Path to the markdown file
 * @returns {string[]} Array of tags
 */
export function extractTagsFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    
    return data.tags || [];
  } catch (error) {
    console.error(`Error extracting tags from ${filePath}:`, error);
    return [];
  }
}

/**
 * Get all unique tags from all posts
 * @param {string} postsDir - Directory containing post files
 * @returns {string[]} Array of unique tags
 */
export function extractAllTags(postsDir = 'content/posts') {
  const allTags = new Set();
  
  try {
    const files = fs.readdirSync(postsDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(postsDir, file));

    for (const filePath of files) {
      const tags = extractTagsFromFile(filePath);
      tags.forEach(tag => allTags.add(tag));
    }
  } catch (error) {
    console.error('Error reading posts directory:', error);
  }

  return Array.from(allTags).sort();
}

/**
 * Get posts filtered by a specific tag
 * @param {string} tag - Tag to filter by
 * @param {string} postsDir - Directory containing post files
 * @returns {Array} Array of post file paths that contain the tag
 */
export function getPostsByTag(tag, postsDir = 'content/posts') {
  const postsWithTag = [];
  
  try {
    const files = fs.readdirSync(postsDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(postsDir, file));

    for (const filePath of files) {
      const tags = extractTagsFromFile(filePath);
      if (tags.includes(tag)) {
        postsWithTag.push(filePath);
      }
    }
  } catch (error) {
    console.error('Error reading posts directory:', error);
  }

  return postsWithTag;
}

/**
 * Get tag frequency across all posts
 * @param {string} postsDir - Directory containing post files
 * @returns {Array} Array of {tag, count} objects
 */
export function getTagFrequency(postsDir = 'content/posts') {
  const tagCounts = {};
  
  try {
    const files = fs.readdirSync(postsDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(postsDir, file));

    for (const filePath of files) {
      const tags = extractTagsFromFile(filePath);
      for (const tag of tags) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      }
    }
  } catch (error) {
    console.error('Error reading posts directory:', error);
  }

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Sort tags by usage frequency
 * @param {string} postsDir - Directory containing post files
 * @returns {string[]} Array of tags sorted by frequency
 */
export function sortTagsByFrequency(postsDir = 'content/posts') {
  const frequency = getTagFrequency(postsDir);
  return frequency.map(item => item.tag);
}

/**
 * Create URL-friendly slug from tag
 * @param {string} tag - Tag string
 * @returns {string} URL-safe slug
 */
export function slugifyTag(tag) {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Get all tags with their slugs and counts
 * @param {string} postsDir - Directory containing post files
 * @returns {Array} Array of {tag, slug, count} objects
 */
export function getAllTagsWithMetadata(postsDir = 'content/posts') {
  const frequency = getTagFrequency(postsDir);
  
  return frequency.map(item => ({
    tag: item.tag,
    slug: slugifyTag(item.tag),
    count: item.count
  }));
}
