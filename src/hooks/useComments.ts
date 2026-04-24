import { useCallback, useEffect, useState } from "react";
import { COMMENTS_PAGE_LIMIT, fetchComments } from "../api/comments";
import { Comment } from "../types/comment";

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadComments = useCallback(
    async (pageNum: number, isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else if (pageNum === 1) {
          setInitialLoading(true);
        } else {
          setLoadingMore(true);
        }

        setError(null);
        const newComments = await fetchComments(pageNum);

        if (isRefresh) {
          setComments(newComments);
          setPage(1);
          setHasMore(newComments.length === COMMENTS_PAGE_LIMIT);
        } else if (pageNum === 1) {
          setComments(newComments);
          setHasMore(newComments.length === COMMENTS_PAGE_LIMIT);
        } else {
          setComments((prev) => [...prev, ...newComments]);
          setHasMore(newComments.length === COMMENTS_PAGE_LIMIT);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load comments",
        );
      } finally {
        setInitialLoading(false);
        setLoadingMore(false);
        setRefreshing(false);
      }
    },
    [],
  );

  const loadNextPage = useCallback(() => {
    if (!loadingMore && hasMore && !error) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadComments(nextPage);
    }
  }, [loadingMore, hasMore, error, page, loadComments]);

  const refresh = useCallback(() => {
    setPage(1);
    loadComments(1, true);
  }, [loadComments]);

  const retry = useCallback(() => {
    loadComments(page, false);
  }, [loadComments, page]);

  useEffect(() => {
    loadComments(1);
  }, [loadComments]);

  return {
    comments,
    initialLoading,
    loadingMore,
    refreshing,
    error,
    hasMore,
    loadNextPage,
    refresh,
    retry,
  };
}
