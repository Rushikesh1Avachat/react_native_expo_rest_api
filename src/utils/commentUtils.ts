import { Comment } from "../types/comment";

export interface NextPageState {
  hasMore: boolean;
  loadingMore: boolean;
  initialLoading: boolean;
  refreshing: boolean;
}

export function canLoadNextPage(state: NextPageState): boolean {
  return state.hasMore && !state.loadingMore && !state.initialLoading && !state.refreshing;
}

export function filterComments(comments: Comment[], query: string): Comment[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return comments;
  }

  return comments.filter(
    (comment) =>
      comment.name.toLowerCase().includes(normalized) || comment.email.toLowerCase().includes(normalized)
  );
}
