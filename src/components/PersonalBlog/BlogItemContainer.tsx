"use client";
import React, { useEffect, useState } from "react";
import SingleBlog from "./SingleBlog";
import InfiniteScroll from "react-infinite-scroll-component";
import { Blog } from "@/types/blog";

const BlogItemContainer = ({ posts }: { posts: Blog[] }) => {
  const itemToLoad = 3;
  const [hasMore, setHasMore] = useState(true);
  const [showPosts, setShowPosts] = useState(posts?.slice(0, itemToLoad));

  const fetchMoreData = () => {
    setTimeout(() => {
      setShowPosts(posts.slice(0, showPosts.length + itemToLoad));
    }, 1500);
  };

  useEffect(() => {
    if (
      showPosts?.length > posts?.length ||
      showPosts?.length === posts?.length
    ) {
      setHasMore(false);
    }
    if (showPosts?.length < posts?.length) {
      setHasMore(true);
    }
  }, [showPosts?.length, posts?.length]);

  return (
    <>
      <InfiniteScroll
        dataLength={showPosts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="col-span-full flex w-full items-center justify-center px-4 text-white">
            Loading...
          </div>
        }
        className="flex flex-col gap-y-7.5 lg:gap-y-12.5"
      >
        {showPosts?.map((blog) => (
          <SingleBlog key={blog.slug.current} blog={blog} />
        ))}
      </InfiniteScroll>
    </>
  );
};

export default BlogItemContainer;
