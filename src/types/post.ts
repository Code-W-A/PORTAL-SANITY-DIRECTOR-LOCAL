import { PortableTextBlock } from "sanity";
import { Author } from "./author";
import { Slug } from "./common";
import {
  Business,
  CategorySummary,
  CitySummary,
  CountySummary,
} from "./directory";

export type PostNavigation = {
  title: string;
  slug: Slug;
};

export type RelatedBusinessSummary = Pick<
  Business,
  "_id" | "title" | "slug" | "city" | "county" | "address"
>;

export type Post = {
  _id: string;
  title: string;
  slug: Slug;
  category?: string;
  categorySlug?: Slug;
  metaDescription?: string;
  body?: PortableTextBlock[];
  mainImage?: any;
  author?: Author;
  tags?: string[];
  publishedAt?: string;
  relatedCategories?: CategorySummary[];
  relatedCounties?: CountySummary[];
  relatedCities?: CitySummary[];
  relatedBusinesses?: RelatedBusinessSummary[];
  nextPost?: PostNavigation | null;
  prevPost?: PostNavigation | null;
};
