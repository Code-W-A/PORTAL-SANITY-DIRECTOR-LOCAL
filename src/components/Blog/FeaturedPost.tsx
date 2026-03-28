import Image from "next/image";
import Link from "next/link";
import { imageBuilder } from "@/sanity/client";
import { Post } from "@/types/post";

const formatter = new Intl.DateTimeFormat("ro-RO", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default function FeaturedPost({ post }: { post: Post }) {
  const publishedAt = post.publishedAt
    ? formatter.format(new Date(post.publishedAt))
    : null;

  return (
    <article className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <Link
        href={`/blog/${post.slug.current}`}
        className="group relative block min-h-[320px] overflow-hidden rounded-[28px] bg-gray"
      >
        {post.mainImage ? (
          <Image
            src={imageBuilder(post.mainImage).width(1200).height(860).url()!}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-end bg-linear-to-br from-[#F4F4F5] via-[#E7E7EA] to-[#DADCE1] p-6">
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-dark">
              Featured editorial
            </span>
          </div>
        )}
      </Link>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-body">
          Articol recomandat
        </p>
        <h2 className="mb-4 text-3xl font-bold leading-tight text-dark sm:text-4xl">
          <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
        </h2>
        {post.metaDescription && (
          <p className="mb-6 max-w-[620px] text-lg leading-8 text-body">
            {post.metaDescription}
          </p>
        )}

        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-body">
          {post.category && (
            <span className="rounded-full bg-blue/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue">
              {post.category}
            </span>
          )}
          {post.author?.name && <span>{post.author.name}</span>}
          {publishedAt && <span>{publishedAt}</span>}
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
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
          {post.relatedBusinesses?.slice(0, 1).map((business) =>
            business.city?.slug.current ? (
              <Link
                key={business._id}
                href={`/${business.city.slug.current}/${business.slug.current}`}
                className="rounded-full border border-gray-3 bg-gray px-4 py-2 text-sm text-dark transition-colors duration-200 hover:border-dark hover:bg-white"
              >
                Afacere: {business.title}
              </Link>
            ) : null,
          )}
        </div>

        <Link
          href={`/blog/${post.slug.current}`}
          className="inline-flex rounded-md bg-dark px-6 py-3 font-medium text-white transition-opacity duration-200 hover:opacity-90"
        >
          Citeste articolul
        </Link>
      </div>
    </article>
  );
}
