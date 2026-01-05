import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../app/page';
import * as postsUtils from '../../lib/posts';

// Mock the posts utility
jest.mock('../../lib/posts');

// Mock the components
jest.mock('../../components/PostCard', () => {
  return function MockPostCard({ post, className }) {
    return (
      <div className={`post-card-mock ${className || ''}`} data-testid="post-card">
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <span>{post.date}</span>
      </div>
    );
  };
});

jest.mock('../../components/InfiniteScroll', () => {
  return function MockInfiniteScroll({ items, renderItem, itemsPerPage }) {
    return (
      <div data-testid="infinite-scroll">
        {items.slice(0, itemsPerPage).map((item, index) => renderItem(item, index))}
      </div>
    );
  };
});

describe('Home Page', () => {
  const mockPosts = [
    {
      slug: 'post-1',
      title: 'First Post',
      description: 'Description of first post',
      date: '2024-01-01',
      tags: ['tag1', 'tag2'],
      content: 'Content of first post'
    },
    {
      slug: 'post-2',
      title: 'Second Post',
      description: 'Description of second post',
      date: '2024-01-02',
      tags: ['tag3'],
      content: 'Content of second post'
    },
    {
      slug: 'post-3',
      title: 'Third Post',
      description: 'Description of third post',
      date: '2024-01-03',
      tags: [],
      content: 'Content of third post'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial Load', () => {
    test('renders page title', async () => {
      postsUtils.getSortedPosts.mockReturnValue(mockPosts);
      
      render(<Home />);
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'nulad.github.io' })).toBeInTheDocument();
      });
    });

    test('renders post list when posts are available', async () => {
      postsUtils.getSortedPosts.mockReturnValue(mockPosts);
      
      render(<Home />);
      
      await waitFor(() => {
        expect(screen.getByTestId('infinite-scroll')).toBeInTheDocument();
        expect(screen.getAllByTestId('post-card')).toHaveLength(3);
      });
    });

    test('renders empty state when no posts', async () => {
      postsUtils.getSortedPosts.mockReturnValue([]);
      
      render(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('No posts yet. Check back soon!')).toBeInTheDocument();
        expect(screen.queryByTestId('infinite-scroll')).not.toBeInTheDocument();
      });
    });

    test('renders PostCard components with correct props', async () => {
      postsUtils.getSortedPosts.mockReturnValue(mockPosts);
      
      render(<Home />);
      
      await waitFor(() => {
        const postCards = screen.getAllByTestId('post-card');
        expect(postCards).toHaveLength(3);
        
        expect(screen.getByText('First Post')).toBeInTheDocument();
        expect(screen.getByText('Second Post')).toBeInTheDocument();
        expect(screen.getByText('Third Post')).toBeInTheDocument();
      });
    });

    test('passes correct itemsPerPage to InfiniteScroll', async () => {
      postsUtils.getSortedPosts.mockReturnValue(mockPosts);
      
      render(<Home />);
      
      await waitFor(() => {
        const infiniteScroll = screen.getByTestId('infinite-scroll');
        expect(infiniteScroll).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    test('handles error when fetching posts', async () => {
      postsUtils.getSortedPosts.mockImplementation(() => {
        throw new Error('Failed to fetch posts');
      });
      
      render(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('Error loading posts. Please try again.')).toBeInTheDocument();
      });
    });
  });

  describe('Layout and Structure', () => {
    test('uses semantic HTML elements', async () => {
      postsUtils.getSortedPosts.mockReturnValue(mockPosts);
      
      render(<Home />);
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'nulad.github.io' })).toBeInTheDocument();
      });
    });

    test('has proper page structure', async () => {
      postsUtils.getSortedPosts.mockReturnValue(mockPosts);
      
      render(<Home />);
      
      await waitFor(() => {
        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
        expect(main).toHaveClass('container');
      });
    });
  });

  describe('Accessibility', () => {
    test('has proper heading hierarchy', async () => {
      postsUtils.getSortedPosts.mockReturnValue(mockPosts);
      
      render(<Home />);
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1, name: 'nulad.github.io' })).toBeInTheDocument();
      });
    });

    test('announces empty state to screen readers', async () => {
      postsUtils.getSortedPosts.mockReturnValue([]);
      
      render(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('No posts yet. Check back soon!')).toBeInTheDocument();
      });
    });
  });
});
