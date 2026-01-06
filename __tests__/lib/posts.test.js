import { getAllPosts, getPostBySlug, getSortedPosts } from '@/lib/posts';
import fs from 'fs';
import path from 'path';

describe('posts utility', () => {
  describe('getAllPosts', () => {
    it('should return an array of all posts', () => {
      const posts = getAllPosts();
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
    });

    it('should parse frontmatter correctly', () => {
      const posts = getAllPosts();
      const post = posts[0];

      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('date');
      expect(post).toHaveProperty('description');
      expect(post).toHaveProperty('slug');
    });

    it('should include post content', () => {
      const posts = getAllPosts();
      const post = posts[0];

      expect(post).toHaveProperty('content');
      expect(typeof post.content).toBe('string');
      expect(post.content.length).toBeGreaterThan(0);
    });

    it('should generate slug from filename', () => {
      const posts = getAllPosts();
      const helloWorldPost = posts.find(p => p.slug === 'hello-world');

      expect(helloWorldPost).toBeDefined();
      expect(helloWorldPost.title).toBe('Hello World');
    });

    it('should include optional tags if present', () => {
      const posts = getAllPosts();
      const postWithTags = posts.find(p => p.tags);

      if (postWithTags) {
        expect(Array.isArray(postWithTags.tags)).toBe(true);
      }
    });

    it('should skip README.md file', () => {
      const posts = getAllPosts();
      const readmePost = posts.find(p => p.slug === 'README');

      expect(readmePost).toBeUndefined();
    });
  });

  describe('getPostBySlug', () => {
    it('should return a post by its slug', () => {
      const post = getPostBySlug('hello-world');

      expect(post).toBeDefined();
      expect(post.slug).toBe('hello-world');
      expect(post.title).toBe('Hello World');
    });

    it('should include all frontmatter fields', () => {
      const post = getPostBySlug('hello-world');

      expect(post.title).toBe('Hello World');
      expect(post.date).toBe('2026-01-01');
      expect(post.description).toBe('Welcome to my new blog - a space for thoughts on code and design');
      expect(Array.isArray(post.tags)).toBe(true);
    });

    it('should include post content', () => {
      const post = getPostBySlug('hello-world');

      expect(post.content).toBeDefined();
      expect(typeof post.content).toBe('string');
      expect(post.content).toContain('Welcome to My Blog');
    });

    it('should return null for non-existent slug', () => {
      const post = getPostBySlug('non-existent-post');

      expect(post).toBeNull();
    });

    it('should handle slug with different casing', () => {
      const post = getPostBySlug('test-markdown-features');

      expect(post).toBeDefined();
      expect(post.title).toBe('Testing Markdown Features');
    });
  });

  describe('getSortedPosts', () => {
    it('should return posts sorted by date (newest first)', () => {
      const posts = getSortedPosts();

      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);

      // Check that dates are in descending order
      for (let i = 0; i < posts.length - 1; i++) {
        const currentDate = new Date(posts[i].date);
        const nextDate = new Date(posts[i + 1].date);
        expect(currentDate >= nextDate).toBe(true);
      }
    });

    it('should return the most recent post first', () => {
      const posts = getSortedPosts();

      // building-a-static-blog-with-nextjs.md has date 2026-01-06
      // hello-world.md has date 2026-01-01
      // test-markdown-features.md has date 2024-01-15
      expect(posts[0].slug).toBe('building-a-static-blog-with-nextjs');
      expect(posts[0].date).toBe('2026-01-06');
    });

    it('should include all required fields', () => {
      const posts = getSortedPosts();

      posts.forEach(post => {
        expect(post).toHaveProperty('slug');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('date');
        expect(post).toHaveProperty('description');
        expect(post).toHaveProperty('content');
      });
    });
  });

  describe('edge cases', () => {
    it('should handle posts without tags gracefully', () => {
      const posts = getAllPosts();

      posts.forEach(post => {
        if (!post.tags) {
          expect(post.tags).toBeUndefined();
        } else {
          expect(Array.isArray(post.tags)).toBe(true);
        }
      });
    });

    it('should parse dates correctly', () => {
      const posts = getAllPosts();

      posts.forEach(post => {
        expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });
  });
});
