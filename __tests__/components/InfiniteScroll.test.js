import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfiniteScroll from '../../components/InfiniteScroll';

describe('InfiniteScroll', () => {
  const mockItems = Array.from({ length: 20 }, (_, i) => ({ id: i, text: `Item ${i}` }));
  const mockRenderItem = (item) => <div key={item.id}>{item.text}</div>;

  describe('Rendering', () => {
    test('renders initial items', () => {
      render(
        <InfiniteScroll 
          items={mockItems} 
          renderItem={mockRenderItem}
          itemsPerPage={5}
        />
      );
      
      expect(screen.getByText('Item 0')).toBeInTheDocument();
      expect(screen.getByText('Item 4')).toBeInTheDocument();
      expect(screen.queryByText('Item 5')).not.toBeInTheDocument();
    });

    test('renders all items when total is less than itemsPerPage', () => {
      const fewItems = mockItems.slice(0, 3);
      
      render(
        <InfiniteScroll 
          items={fewItems} 
          renderItem={mockRenderItem}
          itemsPerPage={5}
        />
      );
      
      expect(screen.getByText('Item 0')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    test('shows load more button when there are more items', () => {
      render(
        <InfiniteScroll 
          items={mockItems} 
          renderItem={mockRenderItem}
          itemsPerPage={5}
        />
      );
      
      expect(screen.getByRole('button', { name: 'Load More' })).toBeInTheDocument();
    });

    test('does not show load more button when all items are loaded', () => {
      const fewItems = mockItems.slice(0, 3);
      
      render(
        <InfiniteScroll 
          items={fewItems} 
          renderItem={mockRenderItem}
          itemsPerPage={5}
        />
      );
      
      expect(screen.queryByRole('button', { name: 'Load More' })).not.toBeInTheDocument();
    });

    test('shows loading state while loading', async () => {
      render(
        <InfiniteScroll 
          items={mockItems} 
          renderItem={mockRenderItem}
          itemsPerPage={5}
          loading={true}
        />
      );
      
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Load More' })).not.toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    test('loads more items when button is clicked', async () => {
      render(
        <InfiniteScroll 
          items={mockItems} 
          renderItem={mockRenderItem}
          itemsPerPage={5}
        />
      );
      
      const loadMoreButton = screen.getByRole('button', { name: 'Load More' });
      fireEvent.click(loadMoreButton);
      
      await waitFor(() => {
        expect(screen.getByText('Item 5')).toBeInTheDocument();
        expect(screen.getByText('Item 9')).toBeInTheDocument();
      });
      
      expect(screen.getByRole('button', { name: 'Load More' })).toBeInTheDocument();
    });

    test('calls onLoadMore when button is clicked', () => {
      const mockOnLoadMore = jest.fn();
      
      render(
        <InfiniteScroll 
          items={mockItems} 
          renderItem={mockRenderItem}
          itemsPerPage={5}
          onLoadMore={mockOnLoadMore}
        />
      );
      
      const loadMoreButton = screen.getByRole('button', { name: 'Load More' });
      fireEvent.click(loadMoreButton);
      
      expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
    });

    test('does not call onLoadMore when all items are loaded', () => {
      const mockOnLoadMore = jest.fn();
      const fewItems = mockItems.slice(0, 3);
      
      render(
        <InfiniteScroll 
          items={fewItems} 
          renderItem={mockRenderItem}
          itemsPerPage={5}
          onLoadMore={mockOnLoadMore}
        />
      );
      
      expect(mockOnLoadMore).not.toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    test('handles empty items array', () => {
      render(
        <InfiniteScroll 
          items={[]} 
          renderItem={mockRenderItem}
          itemsPerPage={5}
        />
      );
      
      expect(screen.queryByText('Item 0')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Load More' })).not.toBeInTheDocument();
    });

    test('handles null items', () => {
      render(
        <InfiniteScroll 
          items={null} 
          renderItem={mockRenderItem}
          itemsPerPage={5}
        />
      );
      
      expect(screen.queryByText('Item 0')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Load More' })).not.toBeInTheDocument();
    });

    test('handles itemsPerPage of 1', async () => {
      render(
        <InfiniteScroll 
          items={mockItems.slice(0, 3)} 
          renderItem={mockRenderItem}
          itemsPerPage={1}
        />
      );
      
      expect(screen.getByText('Item 0')).toBeInTheDocument();
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
      
      const loadMoreButton = screen.getByRole('button', { name: 'Load More' });
      fireEvent.click(loadMoreButton);
      
      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });
    });

    test('handles custom loader text', () => {
      render(
        <InfiniteScroll 
          items={mockItems} 
          renderItem={mockRenderItem}
          itemsPerPage={5}
          loading={true}
          loaderText="Loading more items..."
        />
      );
      
      expect(screen.getByText('Loading more items...')).toBeInTheDocument();
    });

    test('handles custom button text', () => {
      render(
        <InfiniteScroll 
          items={mockItems} 
          renderItem={mockRenderItem}
          itemsPerPage={5}
          buttonText="Show More"
        />
      );
      
      expect(screen.getByRole('button', { name: 'Show More' })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('button is accessible', () => {
      render(
        <InfiniteScroll 
          items={mockItems} 
          renderItem={mockRenderItem}
          itemsPerPage={5}
        />
      );
      
      const button = screen.getByRole('button', { name: 'Load More' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
    });
  });
});
