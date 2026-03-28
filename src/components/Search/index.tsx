"use client";
import { getPosts } from "@/sanity/sanity-utils";
import { useEffect, useState } from "react";
import SingleBlog from "../Common/SingleBlog";
import { Blog } from "@/types/blog";
import { integrations } from "../../../integrations.config";

const Search = () => {
  const [posts, setPosts] = useState<Blog[]>([]);

  const [filtredPosts, setFiltredPosts] = useState<Blog[]>([]);
  const [query, setQuery] = useState("");

  const filterPosts = (query: any) => {
    const results: Blog[] = posts.filter((post: Blog) =>
      post.title.toLowerCase().includes(query.toLowerCase()),
    );

    setFiltredPosts(results);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
      setFiltredPosts(posts);
    };

    if (integrations?.isSanityEnabled) {
      fetchPosts();
    } else {
      setFiltredPosts([]);
      setPosts([]);
    }
  }, [setPosts, setFiltredPosts]);

  return (
    <section className="pb-17.5">
      <div className="bg-gray mb-12.5 pt-34 pb-12.5">
        <div className="mx-auto w-full max-w-[580px] px-4 text-center sm:px-8 xl:px-0">
          <h1 className="text-heading-6 text-dark sm:text-heading-4 lg:text-heading-3 mb-3.5 font-bold">
            {query !== ""
              ? `Search results for: ${query}`
              : "Search posts here"}
          </h1>
          <p>{filtredPosts?.length} Posts Found</p>

          <div className="mt-7.5">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <button
                  aria-label="search button"
                  className="absolute top-0 left-0 flex items-center justify-center py-5 pr-3 pl-7"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.1875 17.4063L14.0313 13.2188C16.1563 10.3125 15.9375 6.15625 13.2813 3.53125C11.875 2.125 10 1.34375 8 1.34375C6 1.34375 4.125 2.125 2.71875 3.53125C-0.1875 6.4375 -0.1875 11.1875 2.71875 14.0938C4.125 15.5 6 16.2813 8 16.2813C9.90625 16.2813 11.6875 15.5625 13.0938 14.2813L18.3125 18.5C18.4375 18.5938 18.5938 18.6563 18.75 18.6563C18.9688 18.6563 19.1563 18.5625 19.2813 18.4063C19.5313 18.0938 19.5 17.6563 19.1875 17.4063ZM8 14.875C6.375 14.875 4.875 14.25 3.71875 13.0938C1.34375 10.7188 1.34375 6.875 3.71875 4.53125C4.875 3.375 6.375 2.75 8 2.75C9.625 2.75 11.125 3.375 12.2813 4.53125C14.6563 6.90625 14.6563 10.75 12.2813 13.0938C11.1563 14.25 9.625 14.875 8 14.875Z"
                      fill="#15171A"
                    />
                  </svg>
                </button>
                <input
                  onChange={(e) => {
                    setQuery(e.target.value);
                    filterPosts(e.target.value);
                  }}
                  value={query}
                  type="search"
                  name="search"
                  id="search-input"
                  placeholder="Search posts, tags and authors"
                  className="border-gray-3 placeholder:text-dark-3 focus:shadow-input focus:ring-dark-4/20 w-full rounded-lg border bg-white py-4.5 pr-3 pl-15 outline-hidden duration-200 ease-in focus:border-transparent focus:ring-2"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 gap-x-7.5 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
          {filtredPosts &&
            filtredPosts.map((blog, key) => (
              <SingleBlog post={blog} key={key} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Search;
