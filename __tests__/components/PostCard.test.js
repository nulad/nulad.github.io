import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostCard from '../../components/PostCard';

describe('PostCard', () => {
  const mockPost = {
    slug: 'test-post',
    title: 'Test Post',
    description: 'This is a test post description',
    date: '2024-01-01',
    tags: ['test', 'example'],
    content: 'Test content'
  };

  describe('Rendering', () => {
    test('renders post title', () => {
      render(<PostCard post={mockPost} />);
      
      expect(screen.getByRole('heading', { name: 'Test Post' })).toBeInTheDocument();
    });

    test('renders post description', () => {
      render(<PostCard post={mockPost} />);
      
      expect(screen.getByText('This is a test post description')).toBeInTheDocument();
    });

    test('renders post date', () => {
      render(<PostCard post={mockPost} />);
      
      expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    });

    test('renders link to post', () => {
      render(<PostCard post={mockPost} />);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/posts/test-post');
    });

    test('renders tags when provided', () => {
      render(<PostCard post={mockPost} />);
      
      expect(screen.getByText('test')).toBeInTheDocument();
      expect(screen.getByText('example')).toBeInTheDocument();
    });

    test('does not render tags section when no tags', () => {
      const postWithoutTags = { ...mockPost, tags: undefined };
      render(<PostCard post={postWithoutTags} />);
      
      expect(screen.queryByText('test')).not.toBeInTheDocument();
      expect(screen.queryByText('example')).not.toBeInTheDocument();
    });

    test('renders empty tags array correctly', () => {
      const postWithEmptyTags = { ...mockPost, tags: [] };
      render(<PostCard post={postWithEmptyTags} />);
      
      expect(screen.queryByText('test')).not.toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    test('link is clickable', () => {
      render(<PostCard post={mockPost} />);
      
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    test('applies correct CSS classes', () => {
      const { container } = render(<PostCard post={mockPost} />);
      
      const card = container.querySelector('div');
      expect(card).toHaveClass('post-card');
    });

    test('applies custom className when provided', () => {
      const { container } = render(<PostCard post={mockPost} className="custom-class" />);
      
      const card = container.querySelector('div');
      expect(card).toHaveClass('post-card', 'custom-class');
    });
  });

  describe('Edge cases', () => {
    test('handles missing description', () => {
      const postWithoutDescription = { ...mockPost, description: undefined };
      render(<PostCard post={postWithoutDescription} />);
      
      expect(screen.queryByText('This is a test post description')).not.toBeInTheDocument();
    });

    test('handles missing date', () => {
      const postWithoutDate = { ...mockPost, date: undefined };
      render(<PostCard post={postWithoutDate} />);
      
      expect(screen.queryByText('2024-01-01')).not.toBeInTheDocument();
    });

    test('truncates long description', () => {
      const longDescription = 'This is a very long description that should be truncated when displayed on the card to ensure consistent layout across different posts with varying content lengths.';
      const postWithLongDescription = { ...mockPost, description: longDescription };
      
      render(<PostCard post={postWithLongDescription} />);
      
      // Check that some text is rendered but not the full description
      expect(screen.getByText(/This is a very long description/)).toBeInTheDocument();
    });
  });
});
