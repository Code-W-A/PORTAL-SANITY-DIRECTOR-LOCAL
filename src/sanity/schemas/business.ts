import {
  isUniqueBusinessSlugWithinCity,
  slugifyRomanian,
  validateSlugValue,
} from "@/sanity/slug";

const business = {
  name: "business",
  title: "Business",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required().min(2).max(120),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        slugify: slugifyRomanian,
        isUnique: isUniqueBusinessSlugWithinCity,
      },
      validation: (Rule: any) =>
        Rule.required().custom((value: { current?: string }) =>
          validateSlugValue(value, { blockReserved: true }),
        ),
    },
    {
      name: "city",
      title: "City",
      type: "reference",
      to: [{ type: "city" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.required().min(50).max(220),
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule: any) => Rule.required().min(10).max(200),
    },
    {
      name: "neighborhood",
      title: "Neighborhood",
      type: "string",
    },
    {
      name: "postalCode",
      title: "Postal code",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
    },
    {
      name: "website",
      title: "Website",
      type: "url",
    },
    {
      name: "email",
      title: "Email",
      type: "email",
    },
    {
      name: "googleMapsUrl",
      title: "Google Maps URL",
      type: "url",
    },
    {
      name: "coordinates",
      title: "Coordinates",
      type: "geopoint",
    },
    {
      name: "schedule",
      title: "Schedule",
      type: "text",
      rows: 4,
    },
    {
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "string" }],
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
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      city: "city.title",
      summary: "summary",
      media: "coverImage",
    },
    prepare(selection: any) {
      const subtitle = [selection.city, selection.summary]
        .filter(Boolean)
        .join(" · ");

      return {
        ...selection,
        subtitle,
      };
    },
  },
};

export default business;
