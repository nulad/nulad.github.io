import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostCard from '@/components/PostCard';

const mockPost = {
  slug: 'test-post',
  title: 'Test Post Title',
  date: '2024-01-15',
  description: 'This is a test post description',
  readingTime: '5 min read',
  tags: ['test', 'example']
};

describe('PostCard component', () => {
  it('should render the article element', () => {
    render(<PostCard post={mockPost} />);
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
  });

  it('should render the post title', () => {
    render(<PostCard post={mockPost} />);
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Test Post Title');
  });

  it('should render the post date', () => {
    render(<PostCard post={mockPost} />);
    const date = screen.getByText('2024-01-15');
    expect(date).toBeInTheDocument();
  });

  it('should render the post description', () => {
    render(<PostCard post={mockPost} />);
    const description = screen.getByText('This is a test post description');
    expect(description).toBeInTheDocument();
  });

  it('should render the reading time', () => {
    render(<PostCard post={mockPost} />);
    const readingTime = screen.getByText('5 min read');
    expect(readingTime).toBeInTheDocument();
  });

  it('should render tags when provided', () => {
    render(<PostCard post={mockPost} />);
    const testTag = screen.getByText('test');
    const exampleTag = screen.getByText('example');
    expect(testTag).toBeInTheDocument();
    expect(exampleTag).toBeInTheDocument();
  });

  it('should not render tags section when no tags provided', () => {
    const postWithoutTags = { ...mockPost, tags: null };
    render(<PostCard post={postWithoutTags} />);
    const tagsContainer = screen.queryByTestId('tags-container');
    expect(tagsContainer).not.toBeInTheDocument();
  });

  it('should link to the correct post URL', () => {
    render(<PostCard post={mockPost} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/posts/test-post');
  });

  it('should make the entire card clickable', () => {
    render(<PostCard post={mockPost} />);
    const link = screen.getByRole('link');
    expect(link).toContainElement(screen.getByRole('heading', { level: 2 }));
    expect(link).toContainElement(screen.getByText('This is a test post description'));
  });

  it('should apply brutalist styling classes', () => {
    render(<PostCard post={mockPost} />);
    const article = screen.getByRole('article');
    expect(article).toHaveClass('post-card');
  });

  it('should have a border', () => {
    render(<PostCard post={mockPost} />);
    const article = screen.getByRole('article');
    expect(article).toHaveStyle('border: 2px solid black');
  });

  it('should have hover effect', () => {
    render(<PostCard post={mockPost} />);
    const article = screen.getByRole('article');
    expect(article).toHaveClass('hover:shadow-lg');
  });

  it('should format date correctly', () => {
    render(<PostCard post={mockPost} />);
    const dateElement = screen.getByText('2024-01-15');
    expect(dateElement).toHaveClass('text-gray-600');
  });

  it('should display reading time with icon', () => {
    render(<PostCard post={mockPost} />);
    const readingTimeContainer = screen.getByTestId('reading-time');
    expect(readingTimeContainer).toBeInTheDocument();
    expect(readingTimeContainer).toHaveTextContent('5 min read');
  });
});
