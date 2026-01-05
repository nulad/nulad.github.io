export default function InfiniteScroll({ children, onLoadMore, hasMore }) {
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
}
