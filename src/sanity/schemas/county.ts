import { slugifyRomanian, validateSlugValue } from "@/sanity/slug";

const county = {
  name: "county",
  title: "County",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required().min(2).max(80),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        slugify: slugifyRomanian,
      },
      validation: (Rule: any) =>
        Rule.required().custom((value: { current?: string }) =>
          validateSlugValue(value, { blockReserved: true }),
        ),
    },
    {
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.required().min(50).max(220),
    },
    {
      name: "intro",
      title: "Intro",
      type: "blockContent",
    },
    {
      name: "region",
      title: "Region",
      type: "string",
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
    },
    {
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "region",
      media: "coverImage",
    },
  },
};

export default county;
