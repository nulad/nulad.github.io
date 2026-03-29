import { useEffect, useRef } from "react";

interface InfiniteScrollProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onLoadMore?: () => void;
  loading?: boolean;
  hasMore?: boolean;
  loadingLabel?: string;
}

export default function InfiniteScroll<T extends { slug?: string }>({
  items,
  renderItem,
  onLoadMore,
  loading = false,
  hasMore = true,
  loadingLabel = "Loading...",
}: InfiniteScrollProps<T>) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
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
      { root: null, rootMargin: "200px", threshold: 0 }
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
