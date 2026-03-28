import Breadcrumbs from "@/components/Common/Breadcrumbs";
import PostAuthorCard from "@/components/Blog/PostAuthorCard";
import PostDirectoryReferences from "@/components/Blog/PostDirectoryReferences";
import PostNavigation from "@/components/Blog/PostNavigation";
import RenderBodyContent from "@/components/Blog/RenderBodyContent";
import SectionHeader from "@/components/Common/SectionHeader";
import StructuredData from "@/components/Common/StructuredData";
import PortalSection from "@/components/Portal/UI/PortalSection";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/libs/metadata";
import {
  buildBlogPostStructuredData,
  buildBreadcrumbStructuredData,
  isPostIndexable,
} from "@/libs/seo";
import { imageBuilder } from "@/sanity/client";
import { getPostBySlug, getPreviousAndNextPosts } from "@/sanity/posts";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ postSlug: string }>;
};

export async function generateMetadata(props: Props) {
  const { postSlug } = await props.params;
  const post = await getPostBySlug(postSlug);

  if (!post) {
    return buildMetadata({
      title: "Articol inexistent",
      description: "Articolul cautat nu exista.",
      path: `/blog/${postSlug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${post.title} | ${siteConfig.name}`,
    description: post.metaDescription || siteConfig.description,
    path: `/blog/${post.slug.current}`,
    image: post.mainImage ? imageBuilder(post.mainImage).url() : undefined,
    type: "article",
    noIndex: !isPostIndexable(post),
    publishedTime: post.publishedAt,
    authors: post.author?.name ? [post.author.name] : undefined,
    section: post.category || "Editorial",
    keywords: [
      post.category,
      ...(post.relatedCategories || []).map((category) => category.title),
      ...(post.relatedCounties || []).map((county) => county.title),
      ...(post.relatedCities || []).map((city) => city.title),
    ].filter(Boolean) as string[],
  });
}

export default async function BlogPostPage(props: Props) {
  const { postSlug } = await props.params;
  const [post, navigation] = await Promise.all([
    getPostBySlug(postSlug),
    getPreviousAndNextPosts(postSlug),
  ]);

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Acasa", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title },
  ];

  return (
    <main>
      <StructuredData
        data={[
          buildBreadcrumbStructuredData(
            breadcrumbItems.map((item) => ({
              name: item.name,
              path: item.href,
            })),
          ),
          buildBlogPostStructuredData(post),
        ]}
      />

      <section className="pb-12 pt-31.5">
        <div className="mx-auto max-w-[1030px] px-4 sm:px-8 xl:px-0">
          <div className="mx-auto max-w-[770px] text-center">
            <Breadcrumbs
              items={breadcrumbItems}
              className="mb-4 flex justify-center"
            />

            <h1 className="mb-5 text-3xl font-bold text-dark sm:text-4xl lg:text-custom-2">
              {post.title}
            </h1>

            {post.metaDescription && (
              <p className="text-lg text-body">{post.metaDescription}</p>
            )}

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-body">
              {post.category && <span>{post.category}</span>}
              {post.author?.name && <span>{post.author.name}</span>}
              {post.publishedAt && (
                <span>
                  {new Intl.DateTimeFormat("ro-RO", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(post.publishedAt))}
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {post.relatedCounties?.slice(0, 1).map((county) => (
                <Link
                  key={county._id}
                  href={`/judet/${county.slug.current}`}
                  className="rounded-full border border-gray-3 bg-gray px-4 py-2 text-sm text-dark transition-colors duration-200 hover:border-dark hover:bg-white"
                >
                  Judet: {county.title}
                </Link>
              ))}
              {post.relatedCities?.slice(0, 1).map((city) => (
                <Link
                  key={city._id}
                  href={`/${city.slug.current}`}
                  className="rounded-full border border-gray-3 bg-gray px-4 py-2 text-sm text-dark transition-colors duration-200 hover:border-dark hover:bg-white"
                >
                  Oras: {city.title}
                </Link>
              ))}
            </div>
          </div>

          {post.mainImage && (
            <Image
              src={imageBuilder(post.mainImage).url()!}
              alt={post.title}
              className="mb-11 mt-10 rounded-lg"
              width={1030}
              height={550}
            />
          )}

          <div className="mx-auto max-w-[770px]">
            <div className="blog-details">
              <RenderBodyContent post={post} />
            </div>
          </div>
        </div>
      </section>

      <PortalSection className="pb-15">
        <div className="mx-auto max-w-[770px]">
          <SectionHeader
            eyebrow="Editorial"
            align="left"
            title="Context editorial"
            description="Pastram stilarea si ritmul editorial al articolului, dar ii expunem si conexiunile locale relevante."
          />
          <PostAuthorCard post={post} />
        </div>
      </PortalSection>

      <PostDirectoryReferences post={post} />

      <PostNavigation
        prevPost={navigation.prevPost}
        nextPost={navigation.nextPost}
      />
    </main>
  );
}
