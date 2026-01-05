'use client';

import React, { useEffect, useRef } from 'react';

export default function InfiniteScroll({
  items,
  renderItem,
  onLoadMore,
  loading = false,
  hasMore = true,
  loadingLabel = 'Loading...',
}) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    if (!hasMore || loading) {
      return;
    }

    const el = sentinelRef.current;
    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          onLoadMore?.();
        }
      },
      { root: null, rootMargin: '200px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  return (
    <div>
      {items?.map((item, index) => (
        <div key={item?.slug ?? index}>{renderItem(item, index)}</div>
      ))}

      {hasMore ? (
        <div ref={sentinelRef} aria-label="infinite-scroll-sentinel">
          {loading ? <div>{loadingLabel}</div> : null}
        </div>
      ) : (
        <div aria-label="infinite-scroll-end" />
      )}
    </div>
  );
}
