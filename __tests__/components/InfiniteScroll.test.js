import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfiniteScroll from '@/components/InfiniteScroll';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

describe('InfiniteScroll component', () => {
  const mockOnLoadMore = jest.fn();

  beforeEach(() => {
    mockOnLoadMore.mockClear();
    mockIntersectionObserver.mockClear();
  });

  it('should render the component with children', () => {
    render(
      <InfiniteScroll onLoadMore={mockOnLoadMore} hasMore={true}>
        <div>Test content</div>
      </InfiniteScroll>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render a trigger element when hasMore is true', () => {
    render(
      <InfiniteScroll onLoadMore={mockOnLoadMore} hasMore={true}>
        <div>Test content</div>
      </InfiniteScroll>
    );
    
    const trigger = screen.getByTestId('infinite-scroll-trigger');
    expect(trigger).toBeInTheDocument();
  });

  it('should not render a trigger element when hasMore is false', () => {
    render(
      <InfiniteScroll onLoadMore={mockOnLoadMore} hasMore={false}>
        <div>Test content</div>
      </InfiniteScroll>
    );
    
    expect(screen.queryByTestId('infinite-scroll-trigger')).not.toBeInTheDocument();
  });

  it('should call onLoadMore when trigger element is intersected', async () => {
    const mockObserve = jest.fn();
    mockIntersectionObserver.mockImplementation((callback) => ({
      observe: mockObserve,
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    render(
      <InfiniteScroll onLoadMore={mockOnLoadMore} hasMore={true}>
        <div>Test content</div>
      </InfiniteScroll>
    );
    
    const trigger = screen.getByTestId('infinite-scroll-trigger');
    expect(mockObserve).toHaveBeenCalledWith(trigger);
    
    // Simulate intersection
    const [callback] = mockIntersectionObserver.mock.calls[0];
    callback([{ isIntersecting: true }]);
    
    await waitFor(() => {
      expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
    });
  });

  it('should not call onLoadMore when hasMore is false', async () => {
    const mockObserve = jest.fn();
    mockIntersectionObserver.mockImplementation((callback) => ({
      observe: mockObserve,
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    render(
      <InfiniteScroll onLoadMore={mockOnLoadMore} hasMore={false}>
        <div>Test content</div>
      </InfiniteScroll>
    );
    
    // Simulate intersection
    const [callback] = mockIntersectionObserver.mock.calls[0];
    callback([{ isIntersecting: true }]);
    
    await waitFor(() => {
      expect(mockOnLoadMore).not.toHaveBeenCalled();
    });
  });

  it('should not call onLoadMultiple times for same intersection', async () => {
    const mockObserve = jest.fn();
    mockIntersectionObserver.mockImplementation((callback) => ({
      observe: mockObserve,
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    render(
      <InfiniteScroll onLoadMore={mockOnLoadMore} hasMore={true}>
        <div>Test content</div>
      </InfiniteScroll>
    );
    
    // Simulate multiple intersections
    const [callback] = mockIntersectionObserver.mock.calls[0];
    callback([{ isIntersecting: true }]);
    callback([{ isIntersecting: true }]);
    callback([{ isIntersecting: true }]);
    
    await waitFor(() => {
      expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
    });
  });

  it('should pass through additional props to container div', () => {
    render(
      <InfiniteScroll onLoadMore={mockOnLoadMore} hasMore={true} className="custom-class" data-testid="container">
        <div>Test content</div>
      </InfiniteScroll>
    );
    
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('custom-class');
  });

  it('should cleanup observer on unmount', () => {
    const mockDisconnect = jest.fn();
    mockIntersectionObserver.mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: mockDisconnect,
    }));

    const { unmount } = render(
      <InfiniteScroll onLoadMore={mockOnLoadMore} hasMore={true}>
        <div>Test content</div>
      </InfiniteScroll>
    );
    
    unmount();
    
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should handle loading state', () => {
    render(
      <InfiniteScroll onLoadMore={mockOnLoadMore} hasMore={true} isLoading={true}>
        <div>Test content</div>
      </InfiniteScroll>
    );
    
    const trigger = screen.getByTestId('infinite-scroll-trigger');
    expect(trigger).toHaveTextContent('Loading...');
  });

  it('should show custom loading message', () => {
    render(
      <InfiniteScroll onLoadMore={mockOnLoadMore} hasMore={true} isLoading={true} loadingMessage="Loading more items...">
        <div>Test content</div>
      </InfiniteScroll>
    );
    
    const trigger = screen.getByTestId('infinite-scroll-trigger');
    expect(trigger).toHaveTextContent('Loading more items...');
  });
});
