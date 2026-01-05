import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { calculateReadingTime } from './reading-time.js';
import { markdownToHtml, markdownToHtmlSync, initMarkdownRenderer } from './renderer.js';

/**
 * @typedef {Object} PostFrontmatter
 * @property {string} title - Post title
 * @property {string} date - ISO date string
 * @property {string[]} tags - Array of tags
 * @property {string} excerpt - Brief description
 * @property {boolean} draft - Whether the post is a draft
 */

/**
 * @typedef {Object} PostMetadata
 * @property {string} slug - URL-friendly identifier (filename without .md)
 * @property {PostFrontmatter} frontmatter - Extracted frontmatter
 * @property {string} readingTime - Human-readable reading time
 * @property {Date} date - Parsed date object
 */

/**
 * @typedef {Object} Post
 * @property {PostMetadata} metadata - Post metadata
 * @property {string} content - Raw markdown content (without frontmatter)
 */

/**
 * @typedef {Object} PostWithHtml
 * @property {PostMetadata} metadata - Post metadata
 * @property {string} content - Raw markdown content (without frontmatter)
 * @property {string} html - Processed HTML content with syntax highlighting
 */

/**
 * Validate required frontmatter fields.
 * @param {PostFrontmatter} frontmatter
 * @throws {Error} If required fields are missing or invalid
 */
function validateFrontmatter(frontmatter) {
  const required = ['title', 'date', 'tags', 'excerpt'];
  const missing = required.filter(field => !(field in frontmatter));
  if (missing.length > 0) {
    throw new Error(`Missing required frontmatter fields: ${missing.join(', ')}`);
  }

  if (typeof frontmatter.title !== 'string' || frontmatter.title.trim() === '') {
    throw new Error('title must be a non-empty string');
  }

  if (!Array.isArray(frontmatter.tags)) {
    throw new Error('tags must be an array');
  }

  if (typeof frontmatter.excerpt !== 'string' || frontmatter.excerpt.trim() === '') {
    throw new Error('excerpt must be a non-empty string');
  }

  if (typeof frontmatter.draft !== 'boolean') {
    throw new Error('draft must be a boolean');
  }

  // Validate date format
  const date = new Date(frontmatter.date);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${frontmatter.date}`);
  }
}

/**
 * Extract metadata and content from a markdown file.
 * @param {string} filePath - Path to the markdown file
 * @returns {Post} Post object with metadata and content
 */
export function parsePost(filePath) {
  const slug = path.basename(filePath, '.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Ensure draft defaults to false if not present
  const frontmatter = { ...data, draft: Boolean(data.draft ?? false) };

  validateFrontmatter(frontmatter);

  const date = new Date(frontmatter.date);
  const readingTime = calculateReadingTime(content);

  const metadata = {
    slug,
    frontmatter,
    readingTime,
    date,
  };

  return { metadata, content };
}

/**
 * Get all posts from content/posts directory.
 * @param {Object} options - Options
 * @param {boolean} options.includeDrafts - Include draft posts (default: false)
 * @returns {Post[]} Array of posts sorted by date (newest first)
 */
export function getAllPosts({ includeDrafts = false } = {}) {
  const postsDir = path.join(process.cwd(), 'content', 'posts');
  if (!fs.existsSync(postsDir)) {
    throw new Error(`Content directory not found: ${postsDir}`);
  }

  const fileNames = fs.readdirSync(postsDir).filter(name => name.endsWith('.md'));
  const posts = fileNames.map(fileName => {
    const filePath = path.join(postsDir, fileName);
    return parsePost(filePath);
  });

  const filtered = includeDrafts
    ? posts
    : posts.filter(post => !post.metadata.frontmatter.draft);

  // Sort by date descending
  filtered.sort((a, b) => b.metadata.date.getTime() - a.metadata.date.getTime());

  return filtered;
}

/**
 * Get a single post by slug.
 * @param {string} slug - Post slug (filename without .md)
 * @returns {Post|null} Post object or null if not found
 */
export function getPostBySlug(slug) {
  const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return parsePost(filePath);
}

/**
 * Get all unique tags from all published posts.
 * @returns {string[]} Array of unique tags, sorted alphabetically
 */
export function getAllTags() {
  const posts = getAllPosts({ includeDrafts: false });
  const tagSet = new Set();
  for (const post of posts) {
    for (const tag of post.metadata.frontmatter.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

/**
 * Get posts filtered by tag.
 * @param {string} tag - Tag to filter by
 * @returns {Post[]} Posts with the given tag, sorted by date descending
 */
export function getPostsByTag(tag) {
  const allPosts = getAllPosts({ includeDrafts: false });
  return allPosts.filter(post => post.metadata.frontmatter.tags.includes(tag));
}

/**
 * Get a single post by slug with HTML content.
 * @param {string} slug - Post slug (filename without .md)
 * @returns {Promise<PostWithHtml|null>} Post object with HTML or null if not found
 */
export async function getPostBySlugWithHtml(slug) {
  const post = getPostBySlug(slug);
  if (!post) {
    return null;
  }
  
  const html = await markdownToHtml(post.content);
  return {
    ...post,
    html,
  };
}

/**
 * Get a single post by slug with HTML content (synchronous for build-time).
 * @param {string} slug - Post slug (filename without .md)
 * @returns {PostWithHtml|null} Post object with HTML or null if not found
 */
export function getPostBySlugWithHtmlSync(slug) {
  const post = getPostBySlug(slug);
  if (!post) {
    return null;
  }
  
  const html = markdownToHtmlSync(post.content);
  return {
    ...post,
    html,
  };
}

/**
 * Get all posts with HTML content.
 * @param {Object} options - Options
 * @param {boolean} options.includeDrafts - Include draft posts (default: false)
 * @returns {Promise<PostWithHtml[]>} Array of posts with HTML, sorted by date (newest first)
 */
export async function getAllPostsHtml({ includeDrafts = false } = {}) {
  const posts = getAllPosts({ includeDrafts });
  const postsWithHtml = await Promise.all(
    posts.map(async (post) => {
      const html = await markdownToHtml(post.content);
      return {
        ...post,
        html,
      };
    })
  );
  return postsWithHtml;
}

/**
 * Get all posts with HTML content (synchronous for build-time).
 * @param {Object} options - Options
 * @param {boolean} options.includeDrafts - Include draft posts (default: false)
 * @returns {PostWithHtml[]} Array of posts with HTML, sorted by date (newest first)
 */
export function getAllPostsHtmlSync({ includeDrafts = false } = {}) {
  const posts = getAllPosts({ includeDrafts });
  return posts.map((post) => {
    const html = markdownToHtmlSync(post.content);
    return {
      ...post,
      html,
    };
  });
}

/**
 * Initialize the markdown system for the application.
 * This should be called once at application startup.
 * @returns {Promise<void>}
 */
export async function initMarkdownSystem() {
  await initMarkdownRenderer();
}
