import SectionHeader from "@/components/Common/SectionHeader";
import ArticleCard from "@/components/Portal/ArticleCard";
import PortalCardGrid from "@/components/Portal/UI/PortalCardGrid";
import PortalSection from "@/components/Portal/UI/PortalSection";
import { Post } from "@/types/post";

type RelatedPostsSectionProps = {
  posts: Post[];
  title: string;
  description: string;
  className?: string;
};

export default function RelatedPostsSection({
  posts,
  title,
  description,
  className,
}: RelatedPostsSectionProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <PortalSection className={className}>
      <SectionHeader
        eyebrow="Editorial"
        align="left"
        title={title}
        description={description}
      />

      <PortalCardGrid>
        {posts.map((post) => (
          <ArticleCard key={post._id} post={post} />
        ))}
      </PortalCardGrid>
    </PortalSection>
  );
}
