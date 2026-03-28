import DirectoryConnections from "@/components/Blog/DirectoryConnections";
import FeaturedPost from "@/components/Blog/FeaturedPost";
import SectionHeader from "@/components/Common/SectionHeader";
import StructuredData from "@/components/Common/StructuredData";
import EmptyState from "@/components/Common/EmptyState";
import ArticleCard from "@/components/Portal/ArticleCard";
import PortalCardGrid from "@/components/Portal/UI/PortalCardGrid";
import PortalSection from "@/components/Portal/UI/PortalSection";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/libs/metadata";
import { buildBlogStructuredData, isBlogIndexable } from "@/libs/seo";
import { getPosts } from "@/sanity/posts";

export async function generateMetadata() {
  const posts = await getPosts();

  return buildMetadata({
    title: `Blog | ${siteConfig.name}`,
    description:
      "Articole editoriale despre orase, servicii, tendinte locale si idei utile pentru un portal local din Romania.",
    path: "/blog",
    noIndex: !isBlogIndexable(posts),
    section: "Editorial",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <main>
      <StructuredData data={buildBlogStructuredData(posts)} />

      <PortalSection className="pb-15 pt-34">
        <SectionHeader
          eyebrow="Editorial"
          align="left"
          title="Blog"
          description="Zona editoriala ramane separata de directory, dar poate trimite explicit catre judete, orase si afaceri atunci cand articolul are relevanta locala reala."
        />

        {featuredPost ? (
          <FeaturedPost post={featuredPost} />
        ) : (
          <EmptyState
            title="Nu exista articole in blog"
            description="Adauga documente de tip post in Sanity pentru a popula zona editoriala."
          />
        )}
      </PortalSection>

      <DirectoryConnections />

      <PortalSection className="pb-17.5 pt-15 lg:pt-20">
        <SectionHeader
          eyebrow="Editorial"
          align="left"
          title={remainingPosts.length > 0 ? "Articole recente" : "Arhiva editoriala"}
          description="Pastram componentele editoriale utile, dar fara sa transformam blogul intr-un pseudo-directory."
        />

        {posts.length > 0 ? (
          <PortalCardGrid>
            {(remainingPosts.length > 0 ? remainingPosts : posts).map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
          </PortalCardGrid>
        ) : (
          <EmptyState
            title="Nu exista articole in blog"
            description="Adauga documente de tip post in Sanity pentru a popula zona editoriala."
          />
        )}
      </PortalSection>
    </main>
  );
}
