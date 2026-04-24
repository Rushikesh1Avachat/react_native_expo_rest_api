import axios from "axios";
import { Comment } from "../types/comment";

export const COMMENTS_PAGE_LIMIT = 10;
const COMMENTS_URL = "https://jsonplaceholder.typicode.com/comments";
console.log(COMMENTS_URL);

export async function fetchComments(page = 1): Promise<Comment[]> {
  const response = await axios.get<Comment[]>(COMMENTS_URL, {
    params: {
      _page: page,
      _limit: COMMENTS_PAGE_LIMIT,
    },
  });

  return response.data;
}
