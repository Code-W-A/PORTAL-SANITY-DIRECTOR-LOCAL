import { getPostBySlug } from "@/libs/markdown";
import markdownToHtml from "@/libs/markdownToHtml";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/libs/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = getPostBySlug(params.slug, ["title"]);

  if (post) {
    return buildMetadata({
      title: `${post.title || "Documentatie"} | ${siteConfig.name}`,
      description: "Pagina demo de documentatie mostenita din tema.",
      path: `/docs/${params.slug}`,
      noIndex: true,
    });
  } else {
    return buildMetadata({
      title: "Documentatie inexistenta",
      description: "Pagina de documentatie nu exista.",
      path: `/docs/${params.slug}`,
      noIndex: true,
    });
  }
}

export default async function Post(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = getPostBySlug(params.slug, ["title", "author", "content"]);

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return <article dangerouslySetInnerHTML={{ __html: content }} />;
}
