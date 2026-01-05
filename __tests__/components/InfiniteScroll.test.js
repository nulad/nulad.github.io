import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfiniteScroll from '@/components/InfiniteScroll';

function mockIntersectionObserver() {
  const observers = [];

  class MockIntersectionObserver {
    constructor(callback) {
      this.callback = callback;
      observers.push(this);
    }

    observe() {}
    unobserve() {}
    disconnect() {}

    trigger(isIntersecting) {
      this.callback([{ isIntersecting }]);
    }
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });

  return observers;
}

describe('InfiniteScroll', () => {
  test('renders initial items', () => {
    render(
      <InfiniteScroll
        items={[{ slug: 'a' }, { slug: 'b' }]}
        renderItem={(item) => <div>{item.slug}</div>}
      />
    );

    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
  });

  test('calls onLoadMore when scrolling near bottom', () => {
    const observers = mockIntersectionObserver();
    const onLoadMore = jest.fn();

    render(
      <InfiniteScroll
        items={[{ slug: 'a' }]}
        renderItem={(item) => <div>{item.slug}</div>}
        onLoadMore={onLoadMore}
        hasMore={true}
        loading={false}
      />
    );

    expect(observers).toHaveLength(1);
    observers[0].trigger(true);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  test('shows loading indicator when loading', () => {
    render(
      <InfiniteScroll
        items={[{ slug: 'a' }]}
        renderItem={(item) => <div>{item.slug}</div>}
        loading={true}
        hasMore={true}
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('handles end of posts (no more loading)', () => {
    const onLoadMore = jest.fn();

    render(
      <InfiniteScroll
        items={[{ slug: 'a' }]}
        renderItem={(item) => <div>{item.slug}</div>}
        onLoadMore={onLoadMore}
        hasMore={false}
      />
    );

    expect(screen.getByLabelText('infinite-scroll-end')).toBeInTheDocument();
    expect(screen.queryByLabelText('infinite-scroll-sentinel')).not.toBeInTheDocument();
  });
});
