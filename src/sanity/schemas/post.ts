import { slugifyRomanian, validateSlugValue } from "@/sanity/slug";

const post = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required().min(10).max(140),
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "string",
      validation: (Rule: any) => Rule.required().min(50).max(180),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        unique: true,
        slugify: slugifyRomanian,
      },
      validation: (Rule: any) =>
        Rule.required().custom((value: { current?: string }) =>
          validateSlugValue(value),
        ),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "string",
          validation: (Rule: any) =>
            Rule.custom((fields: any) => {
              if (
                fields !== fields.toLowerCase() ||
                fields.split(" ").includes("")
              ) {
                return "Tags must be lowercase and not be included space";
              }
              return true;
            }),
        },
      ],
    },
    {
      name: "relatedCategories",
      title: "Related Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
    },
    {
      name: "relatedCounties",
      title: "Related Counties",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "county" }],
        },
      ],
    },
    {
      name: "relatedCities",
      title: "Related Cities",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "city" }],
        },
      ],
    },
    {
      name: "relatedBusinesses",
      title: "Related Businesses",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "business" }],
        },
      ],
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (Rule: any) => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      category: "category.title",
    },
    prepare(selection: any) {
      const { author, category } = selection;
      const subtitle = [author ? `by ${author}` : null, category ? `in ${category}` : null]
        .filter(Boolean)
        .join(" ");

      return Object.assign({}, selection, {
        subtitle,
      });
    },
  },
};
export default post;
