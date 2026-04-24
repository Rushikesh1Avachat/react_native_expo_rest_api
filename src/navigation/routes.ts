export const ROUTES = {
  commentsList: "/",
  commentDetail: "/detail",
} as const;

export type CommentDetailParams = {
  id: string;
  postId: string;
  name: string;
  email: string;
  body: string;
};
