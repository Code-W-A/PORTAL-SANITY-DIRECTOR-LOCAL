import Image from "next/image";
import { imageBuilder } from "@/sanity/client";
import { Post } from "@/types/post";
import PortalCardFrame from "@/components/Portal/UI/PortalCardFrame";

function getAuthorSummary(post: Post) {
  if (post.author?.description) {
    return post.author.description;
  }

  const firstBlock = post.author?.bio?.[0];
  if (!firstBlock) {
    return null;
  }

  return firstBlock.children.map((child) => child.text).join(" ").trim() || null;
}

export default function PostAuthorCard({ post }: { post: Post }) {
  if (!post.author?.name) {
    return null;
  }

  const summary = getAuthorSummary(post);

  return (
    <PortalCardFrame padding="comfortable">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {post.author.image && (
          <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gray">
            <Image
              src={imageBuilder(post.author.image).width(160).height(160).url()!}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-body">
            Autor
          </p>
          <h3 className="mb-2 text-xl font-semibold text-dark">
            {post.author.name}
          </h3>
          {summary && <p className="text-body">{summary}</p>}
        </div>
      </div>
    </PortalCardFrame>
  );
}
