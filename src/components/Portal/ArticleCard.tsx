import Image from "next/image";
import Link from "next/link";
import { imageBuilder } from "@/sanity/client";
import { BlogPost } from "@/types/blog";
import PortalCardFrame from "./UI/PortalCardFrame";

const formatter = new Intl.DateTimeFormat("ro-RO", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const ArticleCard = ({ post }: { post: BlogPost }) => {
  const publishedAt = post.publishedAt
    ? formatter.format(new Date(post.publishedAt))
    : null;

  return (
    <PortalCardFrame
      className="group h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-1"
      padding="compact"
    >
      <div className="relative mb-5 aspect-370/240 overflow-hidden rounded-[16px] bg-gray">
        {post.mainImage ? (
          <Image
            src={imageBuilder(post.mainImage).url()!}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-end bg-linear-to-br from-[#F4F4F5] via-[#E7E7EA] to-[#DADCE1] p-5">
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-dark">
              Editorial
            </span>
          </div>
        )}
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-body">
        {post.category && (
          <span className="rounded-full bg-blue/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue">
            {post.category}
          </span>
        )}
        {post.author?.name && <span>{post.author.name}</span>}
        {publishedAt && <span>{publishedAt}</span>}
      </div>

      <h3 className="mb-3 text-xl font-bold text-dark">
        <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
      </h3>
      <p className="line-clamp-3 text-body">{post.metaDescription}</p>
    </PortalCardFrame>
  );
};

export default ArticleCard;
