import Link from "next/link";
import PortalCardFrame from "@/components/Portal/UI/PortalCardFrame";
import PortalSection from "@/components/Portal/UI/PortalSection";
import { PostNavigation as PostNavigationType } from "@/types/post";

type PostNavigationProps = {
  prevPost?: PostNavigationType | null;
  nextPost?: PostNavigationType | null;
};

export default function PostNavigation({
  prevPost,
  nextPost,
}: PostNavigationProps) {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <PortalSection className="pb-17.5">
      <div className="grid gap-6 md:grid-cols-2">
        {prevPost ? (
          <PortalCardFrame padding="comfortable">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-body">
              Articol anterior
            </p>
            <Link
              href={`/blog/${prevPost.slug.current}`}
              className="text-xl font-semibold text-dark"
            >
              {prevPost.title}
            </Link>
          </PortalCardFrame>
        ) : (
          <div />
        )}

        {nextPost && (
          <PortalCardFrame padding="comfortable" className="md:text-right">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-body">
              Articol urmator
            </p>
            <Link
              href={`/blog/${nextPost.slug.current}`}
              className="text-xl font-semibold text-dark"
            >
              {nextPost.title}
            </Link>
          </PortalCardFrame>
        )}
      </div>
    </PortalSection>
  );
}
