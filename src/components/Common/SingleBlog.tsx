"use client";
import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { imageBuilder } from "@/sanity/sanity-utils";

const SingleBlog = ({ post }: { post: Blog }) => {
  const postDetailsLink = `/blog/${post.slug.current}`;

  return (
    <article className="group relative">
      <div className="relative mb-6 aspect-370/280 w-full overflow-hidden rounded-[10px] transition-all group-hover:scale-105">
        {post?.mainImage && (
          <Image
            src={imageBuilder(post.mainImage).url()!}
            alt={post.title}
            fill
            className="w-full object-cover"
          />
        )}
      </div>

      <h3>
        <Link
          href={postDetailsLink}
          className="text-dark mb-3.5 block text-xl font-bold"
        >
          <span className="absolute inset-0" aria-hidden></span>

          <span className="from-primary/20 to-primary/10 bg-linear-to-r bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_10px] hover:bg-[length:100%_3px]">
            {post.title}
          </span>
        </Link>
      </h3>
      <p>{post.metaDescription}</p>

      <div className="mt-4.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center gap-3">
            <div className="flex h-6 w-6 overflow-hidden rounded-full">
              {post?.author?.image && (
                <Image
                  src={imageBuilder(post.author.image).url()!}
                  width={24}
                  height={24}
                  alt="user"
                />
              )}
            </div>
            <p className="text-sm">{post?.author?.name}</p>
          </div>

          <span className="bg-dark-2 flex h-[3px] w-[3px] rounded-full"></span>

          <p className="text-sm">
            {post.publishedAt &&
              new Date(post.publishedAt)
                .toDateString()
                .split(" ")
                .slice(1)
                .join(" ")}
          </p>
        </div>
        {post.category && (
          <span className="bg-blue/[0.08] text-blue relative inline-flex rounded-full px-3 py-1 text-sm font-medium capitalize">
            {post.category}
          </span>
        )}
      </div>
    </article>
  );
};

export default SingleBlog;
