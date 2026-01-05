import React, { useState, useCallback } from 'react';

export default function InfiniteScroll({ 
  items, 
  renderItem, 
  itemsPerPage = 10,
  onLoadMore,
  loading = false,
  loaderText = 'Loading...',
  buttonText = 'Load More',
  className = ''
}) {
  const [displayedCount, setDisplayedCount] = useState(itemsPerPage);

  const handleLoadMore = useCallback(() => {
    if (onLoadMore) {
      onLoadMore();
    } else {
      setDisplayedCount(prev => Math.min(prev + itemsPerPage, items?.length || 0));
    }
  }, [onLoadMore, itemsPerPage, items]);

  // Reset displayed count when items change
  React.useEffect(() => {
    setDisplayedCount(Math.min(itemsPerPage, items?.length || 0));
  }, [items, itemsPerPage]);

  if (!items || items.length === 0) {
    return null;
  }

  const displayedItems = items.slice(0, displayedCount);
  const hasMore = displayedCount < items.length;

  return (
    <div className={`infinite-scroll ${className}`}>
      <div className="space-y-4">
        {displayedItems.map((item, index) => renderItem(item, index))}
      </div>
      
      {loading ? (
        <div className="mt-4 text-center text-gray-500" role="status" aria-live="polite">
          {loaderText}
        </div>
      ) : hasMore ? (
        <div className="mt-4 text-center">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {buttonText}
          </button>
        </div>
      ) : null}
    </div>
  );
}
