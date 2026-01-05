import { render, screen, waitFor } from '@testing-library/react';
import { getSortedPosts } from '@/lib/posts';
import Home from '@/app/page';

// Mock the posts module
jest.mock('@/lib/posts');

// Mock the PostCard component (since it's not implemented yet)
jest.mock('@/components/PostCard', () => ({
  __esModule: true,
  default: function MockPostCard({ post }) {
    return (
      <div data-testid="post-card">
        <h3 data-testid="post-title">{post.title}</h3>
        <time data-testid="post-date">{post.date}</time>
        <p data-testid="post-description">{post.description}</p>
        <a href={`/posts/${post.slug}`} data-testid="post-link">Read more</a>
      </div>
    );
  },
}));

// Mock the InfiniteScroll component
jest.mock('@/components/InfiniteScroll', () => ({
  __esModule: true,
  default: function MockInfiniteScroll({ children, onLoadMore, hasMore }) {
    return (
      <div data-testid="infinite-scroll">
        {children}
        {hasMore && (
          <button 
            onClick={onLoadMore} 
            data-testid="load-more-button"
          >
            Load More
          </button>
        )}
      </div>
    );
  },
}));

describe('Homepage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when posts are available', () => {
    const mockPosts = [
      {
        slug: 'test-post-1',
        title: 'Test Post 1',
        date: '2024-01-15',
        description: 'First test post',
        content: 'Content of first test post'
      },
      {
        slug: 'test-post-2',
        title: 'Test Post 2',
        date: '2024-01-10',
        description: 'Second test post',
        content: 'Content of second test post'
      },
      {
        slug: 'test-post-3',
        title: 'Test Post 3',
        date: '2024-01-05',
        description: 'Third test post',
        content: 'Content of third test post'
      }
    ];

    beforeEach(() => {
      getSortedPosts.mockReturnValue(mockPosts);
    });

    it('should fetch and display posts', async () => {
      render(<Home />);

      await waitFor(() => {
        expect(getSortedPosts).toHaveBeenCalledTimes(1);
      });

      // Check that posts are displayed
      expect(screen.getByTestId('infinite-scroll')).toBeInTheDocument();
      expect(screen.getAllByTestId('post-card')).toHaveLength(3);
    });

    it('should show first 10 posts initially', async () => {
      // Create 12 posts to test the 10 post limit
      const twelvePosts = Array.from({ length: 12 }, (_, i) => ({
        slug: `test-post-${i}`,
        title: `Test Post ${i}`,
        date: `2024-01-${String(15 - i).padStart(2, '0')}`,
        description: `Test post number ${i}`,
        content: `Content for test post ${i}`
      }));

      getSortedPosts.mockReturnValue(twelvePosts);

      render(<Home />);

      await waitFor(() => {
        expect(getSortedPosts).toHaveBeenCalledTimes(1);
      });

      // Should show only first 10 posts
      expect(screen.getAllByTestId('post-card')).toHaveLength(10);
      expect(screen.getByTestId('load-more-button')).toBeInTheDocument();
    });

    it('should show posts sorted by date (newest first)', async () => {
      render(<Home />);

      await waitFor(() => {
        expect(getSortedPosts).toHaveBeenCalledTimes(1);
      });

      const postTitles = screen.getAllByTestId('post-title');
      expect(postTitles[0]).toHaveTextContent('Test Post 1'); // 2024-01-15
      expect(postTitles[1]).toHaveTextContent('Test Post 2'); // 2024-01-10
      expect(postTitles[2]).toHaveTextContent('Test Post 3'); // 2024-01-05
    });

    it('should display post metadata correctly', async () => {
      render(<Home />);

      await waitFor(() => {
        expect(getSortedPosts).toHaveBeenCalledTimes(1);
      });

      // Check first post
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('2024-01-15')).toBeInTheDocument();
      expect(screen.getByText('First test post')).toBeInTheDocument();
      expect(screen.getByText('Read more')).toBeInTheDocument();

      // Check link href
      const postLink = screen.getByTestId('post-link');
      expect(postLink.closest('a')).toHaveAttribute('href', '/posts/test-post-1');
    });

    it('should show load more button when there are more posts', async () => {
      // Create 15 posts to ensure there are more than 10
      const fifteenPosts = Array.from({ length: 15 }, (_, i) => ({
        slug: `test-post-${i}`,
        title: `Test Post ${i}`,
        date: `2024-01-${String(15 - i).padStart(2, '0')}`,
        description: `Test post number ${i}`,
        content: `Content for test post ${i}`
      }));

      getSortedPosts.mockReturnValue(fifteenPosts);

      render(<Home />);

      await waitFor(() => {
        expect(getSortedPosts).toHaveBeenCalledTimes(1);
      });

      expect(screen.getByTestId('load-more-button')).toBeInTheDocument();
    });

    it('should not show load more button when all posts are displayed', async () => {
      // Create only 5 posts (less than 10)
      const fivePosts = Array.from({ length: 5 }, (_, i) => ({
        slug: `test-post-${i}`,
        title: `Test Post ${i}`,
        date: `2024-01-${String(5 - i).padStart(2, '0')}`,
        description: `Test post number ${i}`,
        content: `Content for test post ${i}`
      }));

      getSortedPosts.mockReturnValue(fivePosts);

      render(<Home />);

      await waitFor(() => {
        expect(getSortedPosts).toHaveBeenCalledTimes(1);
      });

      expect(screen.queryByTestId('load-more-button')).not.toBeInTheDocument();
    });
  });

  describe('when no posts are available', () => {
    beforeEach(() => {
      getSortedPosts.mockReturnValue([]);
    });

    it('should show "No posts yet" message', async () => {
      render(<Home />);

      await waitFor(() => {
        expect(getSortedPosts).toHaveBeenCalledTimes(1);
      });

      expect(screen.getByText('No posts yet')).toBeInTheDocument();
      expect(screen.queryByTestId('infinite-scroll')).not.toBeInTheDocument();
      expect(screen.queryByTestId('post-card')).not.toBeInTheDocument();
    });

    it('should not show load more button when no posts', async () => {
      render(<Home />);

      await waitFor(() => {
        expect(getSortedPosts).toHaveBeenCalledTimes(1);
      });

      expect(screen.queryByTestId('load-more-button')).not.toBeInTheDocument();
    });
  });

  describe('initial list state', () => {
    it('should show loading state initially', () => {
      // Mock getSortedPosts to return empty array initially
      getSortedPosts.mockReturnValue([]);

      render(<Home />);

      // Before any async operations, we should see the loading state
      expect(screen.getByText('Loading posts...')).toBeInTheDocument();
    });

    it('should handle error state gracefully', async () => {
      // Mock getSortedPosts to throw an error
      getSortedPosts.mockImplementation(() => {
        throw new Error('Failed to fetch posts');
      });

      render(<Home />);

      await waitFor(() => {
        expect(screen.getByText('Error loading posts')).toBeInTheDocument();
      });

      expect(screen.queryByTestId('infinite-scroll')).not.toBeInTheDocument();
    });
  });

  describe('infinite scroll functionality', () => {
    const mockPosts = Array.from({ length: 25 }, (_, i) => ({
      slug: `test-post-${i}`,
      title: `Test Post ${i}`,
      date: `2024-01-${String(25 - i).padStart(2, '0')}`,
      description: `Test post number ${i}`,
      content: `Content for test post ${i}`
    }));

    beforeEach(() => {
      getSortedPosts.mockReturnValue(mockPosts);
    });

    it('should load more posts when load more is clicked', async () => {
      render(<Home />);

      await waitFor(() => {
        expect(getSortedPosts).toHaveBeenCalledTimes(1);
      });

      // Initially shows 10 posts
      expect(screen.getAllByTestId('post-card')).toHaveLength(10);
      expect(screen.getByTestId('load-more-button')).toBeInTheDocument();

      // Click load more
      const loadMoreButton = screen.getByTestId('load-more-button');
      loadMoreButton.click();

      // Should show 20 posts now
      expect(screen.getAllByTestId('post-card')).toHaveLength(20);
      expect(screen.getByTestId('load-more-button')).toBeInTheDocument();
    });

    it('should hide load more button when all posts are loaded', async () => {
      render(<Home />);

      await waitFor(() => {
        expect(getSortedPosts).toHaveBeenCalledTimes(1);
      });

      // Initially shows 10 posts
      expect(screen.getAllByTestId('post-card')).toHaveLength(10);

      // Click load more first time (shows 20 posts)
      const loadMoreButton = screen.getByTestId('load-more-button');
      loadMoreButton.click();

      expect(screen.getAllByTestId('post-card')).toHaveLength(20);

      // Click load more second time (shows 25 posts - all posts)
      loadMoreButton.click();

      expect(screen.getAllByTestId('post-card')).toHaveLength(25);
      expect(screen.queryByTestId('load-more-button')).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    const mockPosts = [
      {
        slug: 'test-post-1',
        title: 'Test Post 1',
        date: '2024-01-15',
        description: 'First test post',
        content: 'Content of first test post'
      }
    ];

    beforeEach(() => {
      getSortedPosts.mockReturnValue(mockPosts);
    });

    it('should have proper heading structure', async () => {
      render(<Home />);

      await waitFor(() => {
        expect(getSortedPosts).toHaveBeenCalledTimes(1);
      });

      // Main heading should be present
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
    });

    it('should have proper link semantics', async () => {
      render(<Home />);

      await waitFor(() => {
        expect(getSortedPosts).toHaveBeenCalledTimes(1);
      });

      const postLinks = screen.getAllByRole('link');
      expect(postLinks.length).toBeGreaterThan(0);
      
      // Each link should have proper href
      postLinks.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });
  });
});
