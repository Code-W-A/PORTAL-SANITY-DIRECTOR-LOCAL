import { PortableTextBlock } from "sanity";
import { Slug } from "./common";

export type CategorySummary = {
  _id: string;
  title: string;
  slug: Slug;
  description?: string;
  businessCount?: number;
};

export type Category = CategorySummary & {
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: any;
  featured?: boolean;
};

export type CountySummary = {
  _id: string;
  title: string;
  slug: Slug;
  summary?: string;
};

export type CitySummary = {
  _id: string;
  title: string;
  slug: Slug;
  summary?: string;
};

export type County = CountySummary & {
  intro?: PortableTextBlock[];
  region?: string;
  seoTitle?: string;
  seoDescription?: string;
  coverImage?: any;
  featured?: boolean;
  cityCount?: number;
};

export type City = CitySummary & {
  intro?: PortableTextBlock[];
  population?: number;
  seoTitle?: string;
  seoDescription?: string;
  coverImage?: any;
  featured?: boolean;
  county?: CountySummary;
  businessCount?: number;
};

export type Business = {
  _id: string;
  title: string;
  slug: Slug;
  summary: string;
  category: string;
  categories: CategorySummary[];
  address: string;
  neighborhood?: string;
  postalCode?: string;
  phone?: string;
  website?: string;
  email?: string;
  googleMapsUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
    alt?: number;
  };
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
  services?: string[];
  schedule?: string;
  coverImage?: any;
  gallery?: any[];
  description?: PortableTextBlock[];
  city?: CitySummary;
  county?: CountySummary;
};
