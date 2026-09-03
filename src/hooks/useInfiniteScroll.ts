import { useEffect, useRef, useCallback } from 'react';

export function useInfiniteScroll(loadMore: () => void, hasMore: boolean, isLoading: boolean) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        loadMore();
      }
    },
    [loadMore, hasMore, isLoading],
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersect);
    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }
    return () => observerRef.current?.disconnect();
  }, [handleIntersect]);

  return sentinelRef;
}
