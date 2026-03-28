import { Slug } from "./common";

type BioBlock = {
  style: "normal";
  _key: string;
  markDefs: any[];
  children: BioBlockChild[];
  _type: "block";
};

type BioBlockChild = {
  _type: "span";
  text: string;
};

export type Author = {
  name: string;
  image: any;
  bio: BioBlock[];
  numberOfPosts: number;
  _id: string;
  slug: Slug;
  description: string;
};
