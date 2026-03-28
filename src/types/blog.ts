import { Post } from "./post";

export type Blog = Post & {
  accessLevel?: "free" | "user" | "pro";
};

export type BlogPost = Blog;
