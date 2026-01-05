import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostCard from '@/components/PostCard';

jest.mock('next/link', () => {
  return ({ href, children, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
});

describe('PostCard', () => {
  const requiredProps = {
    title: 'Hello World',
    date: '2024-01-01',
    description: 'My first blog post',
    slug: 'hello-world',
  };

  test('displays post title, date, description, and reading time', () => {
    render(<PostCard {...requiredProps} readingTime="3 min read" />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('My first blog post')).toBeInTheDocument();
    expect(screen.getByText('· 3 min read')).toBeInTheDocument();
  });

  test('link points to correct post slug', () => {
    render(<PostCard {...requiredProps} />);
    const link = screen.getByRole('link', { name: 'Hello World' });
    expect(link).toHaveAttribute('href', '/posts/hello-world');
  });

  test('renders with required props', () => {
    render(<PostCard {...requiredProps} />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('missing optional props handled gracefully', () => {
    render(<PostCard {...requiredProps} readingTime={undefined} />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.queryByText(/min read/)).not.toBeInTheDocument();
  });
});
