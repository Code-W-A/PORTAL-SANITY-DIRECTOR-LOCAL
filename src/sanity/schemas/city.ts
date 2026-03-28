import { slugifyRomanian, validateSlugValue } from "@/sanity/slug";

const city = {
  name: "city",
  title: "City",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required().min(2).max(100),
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
      name: "county",
      title: "County",
      type: "reference",
      to: [{ type: "county" }],
      validation: (Rule: any) => Rule.required(),
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
      name: "population",
      title: "Population",
      type: "number",
      validation: (Rule: any) => Rule.min(0).integer(),
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
      county: "county.title",
      media: "coverImage",
    },
    prepare(selection: any) {
      return {
        ...selection,
        subtitle: selection.county,
      };
    },
  },
};

export default city;
