import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * Get all posts from the content/posts directory
 * @returns {Array} Array of post objects with frontmatter and content
 */
export function getAllPosts() {
  // Get all markdown files
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames
    .filter(fileName => {
      // Skip README.md and only process .md files
      return fileName.endsWith('.md') && fileName !== 'README.md';
    })
    .map(fileName => {
      // Remove .md extension to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);

      // Combine the data with the slug and content
      return {
        slug,
        content,
        ...data,
      };
    });

  return allPosts;
}

/**
 * Get a single post by its slug
 * @param {string} slug - The post slug (filename without .md)
 * @returns {Object|null} Post object or null if not found
 */
export function getPostBySlug(slug) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...data,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Get all posts sorted by date (newest first)
 * @returns {Array} Array of post objects sorted by date
 */
export function getSortedPosts() {
  const allPosts = getAllPosts();

  // Sort posts by date in descending order (newest first)
  return allPosts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA < dateB) {
      return 1;
    } else if (dateA > dateB) {
      return -1;
    } else {
      return 0;
    }
  });
}
