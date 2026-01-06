import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostPage from '../../../app/posts/[slug]/page.js';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    // In Next.js, notFound() throws a special error that stops execution
    // For testing, we'll throw a regular error to simulate this behavior
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

// Mock the posts utility
jest.mock('../../../lib/posts', () => ({
  getPostBySlug: jest.fn(),
  getAllPosts: jest.fn(),
}));

// Mock the Header component
jest.mock('../../../components/Header', () => {
  return function MockHeader() {
    return <header data-testid="header">Mock Header</header>;
  };
});

// Mock the MarkdownContent component
jest.mock('../../../components/MarkdownContent', () => {
  return function MockMarkdownContent({ content }) {
    return <div data-testid="markdown-content">{content}</div>;
  };
});

import { getPostBySlug, getAllPosts } from '../../../lib/posts';
import { notFound } from 'next/navigation';

describe('Post Page', () => {
  const mockPost = {
    slug: 'hello-world',
    title: 'Hello World',
    date: '2024-01-01',
    description: 'My first blog post',
    excerpt: 'Welcome to my blog',
    content: '# Welcome to My Blog\n\nThis is my first blog post.',
    tags: ['welcome', 'intro'],
  };

  beforeEach(() => {
    notFound.mockClear();
    getPostBySlug.mockClear();
    getAllPosts.mockClear();
  });

  describe('when post exists', () => {
    test('renders post title', async () => {
      getPostBySlug.mockReturnValue(mockPost);
      
      const params = { slug: 'hello-world' };
      render(<PostPage params={params} />);
      
      const title = screen.getByRole('heading', { level: 1, name: 'Hello World' });
      expect(title).toBeInTheDocument();
    });

    test('renders post date', async () => {
      getPostBySlug.mockReturnValue(mockPost);
      
      const params = { slug: 'hello-world' };
      render(<PostPage params={params} />);
      
      expect(screen.getByText('January 1, 2024')).toBeInTheDocument();
    });

    test('renders post excerpt when available', async () => {
      getPostBySlug.mockReturnValue(mockPost);
      
      const params = { slug: 'hello-world' };
      render(<PostPage params={params} />);
      
      expect(screen.getByText('Welcome to my blog')).toBeInTheDocument();
    });

    test('renders post content using MarkdownContent', async () => {
      getPostBySlug.mockReturnValue(mockPost);
      
      const params = { slug: 'hello-world' };
      render(<PostPage params={params} />);
      
      const markdownContent = screen.getByTestId('markdown-content');
      expect(markdownContent).toBeInTheDocument();
      expect(markdownContent).toHaveTextContent('# Welcome to My Blog This is my first blog post.');
    });

    test('renders without excerpt when not provided', async () => {
      const postWithoutExcerpt = { ...mockPost };
      delete postWithoutExcerpt.excerpt;
      getPostBySlug.mockReturnValue(postWithoutExcerpt);
      
      const params = { slug: 'hello-world' };
      render(<PostPage params={params} />);
      
      expect(screen.queryByText('Welcome to my blog')).not.toBeInTheDocument();
    });

    test('renders without date when not provided', async () => {
      const postWithoutDate = { ...mockPost };
      delete postWithoutDate.date;
      getPostBySlug.mockReturnValue(postWithoutDate);
      
      const params = { slug: 'hello-world' };
      render(<PostPage params={params} />);
      
      expect(screen.queryByText(/January/)).not.toBeInTheDocument();
    });

    test('renders Untitled Post when title is missing', async () => {
      const postWithoutTitle = { ...mockPost };
      delete postWithoutTitle.title;
      getPostBySlug.mockReturnValue(postWithoutTitle);
      
      const params = { slug: 'hello-world' };
      render(<PostPage params={params} />);
      
      expect(screen.getByRole('heading', { level: 1, name: 'Untitled Post' })).toBeInTheDocument();
    });
  });

  describe('when post does not exist', () => {
    test('calls notFound when post is null', async () => {
      // Reset mock calls but keep implementation
      notFound.mockClear();
      getPostBySlug.mockClear();
      
      getPostBySlug.mockReturnValue(null);
      
      const params = { slug: 'non-existent-post' };
      
      // Call the component function directly and expect it to throw
      expect(() => {
        PostPage({ params });
      }).toThrow('NEXT_NOT_FOUND');
      
      expect(notFound).toHaveBeenCalled();
    });

    test('calls notFound when post is undefined', async () => {
      // Reset mock calls but keep implementation
      notFound.mockClear();
      getPostBySlug.mockClear();
      
      getPostBySlug.mockReturnValue(undefined);
      
      const params = { slug: 'non-existent-post' };
      
      // Call the component function directly and expect it to throw
      expect(() => {
        PostPage({ params });
      }).toThrow('NEXT_NOT_FOUND');
      
      expect(notFound).toHaveBeenCalled();
    });
  });

  describe('page structure', () => {
    test('renders within main element with correct classes', async () => {
      getPostBySlug.mockReturnValue(mockPost);
      
      const params = { slug: 'hello-world' };
      const { container } = render(<PostPage params={params} />);
      
      const mainElement = container.querySelector('main');
      expect(mainElement).toBeInTheDocument();
      expect(mainElement).toHaveClass('container', 'mx-auto', 'px-4', 'py-8', 'max-w-4xl');
    });

    test('renders article element', async () => {
      getPostBySlug.mockReturnValue(mockPost);
      
      const params = { slug: 'hello-world' };
      const { container } = render(<PostPage params={params} />);
      
      const article = container.querySelector('article');
      expect(article).toBeInTheDocument();
    });

    test('renders header element with post metadata', async () => {
      getPostBySlug.mockReturnValue(mockPost);
      
      const params = { slug: 'hello-world' };
      const { container } = render(<PostPage params={params} />);
      
      const article = container.querySelector('article');
      const header = article.querySelector('header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('mb-8');
    });
  });
});
