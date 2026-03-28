import { groq } from "next-sanity";

export const authorFields = `{
  _id,
  name,
  description,
  slug,
  image,
  bio,
  "numberOfPosts": count(*[_type == "post" && references(^._id)])
}`;

export const authorListQuery = groq`*[_type == "author"] ${authorFields}`;

export const authorBySlugQuery = groq`*[_type == "author" && slug.current == $slug][0] ${authorFields}`;
