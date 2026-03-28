export {
  authorBySlugQuery,
  authorListQuery as authorQuery,
} from "./queries/authors";
export {
  postBySlugQuery as postQueryBySlug,
  postListQuery as postQuery,
  postsByAuthorSlugQuery as postQueryByAuthor,
  postsByCategorySlugQuery as postQueryByCategory,
  postsByTagQuery as postQueryByTag,
  previousAndNextPostsQuery as getPrevAndNextPostQuery,
} from "./queries/posts";
