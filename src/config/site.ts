import { Menu } from "@/types/menu";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_APP_URL || process.env.SITE_URL || "http://localhost:3000";

export const siteConfig = {
  name: "Portal Local",
  description:
    "Portal local din Romania cu ghiduri editoriale, orase, judete si afaceri locale.",
  url: rawSiteUrl.replace(/\/$/, ""),
  locale: "ro_RO",
};

export const reservedDirectorySlugs = [
  "blog",
  "contact",
  "despre",
  "servicii",
  "judet",
  "api",
  "admin",
] as const;

export const primaryNavigation: Menu[] = [
  {
    id: 1,
    title: "Judete",
    path: "/#judete",
  },
  {
    id: 2,
    title: "Orase",
    path: "/#orase",
  },
  {
    id: 3,
    title: "Afaceri",
    path: "/#afaceri",
  },
  {
    id: 4,
    title: "Blog",
    path: "/blog",
  },
  {
    id: 5,
    title: "Contact",
    path: "/contact",
  },
];

export const footerNavigation = [
  {
    label: "Judete",
    href: "/#judete",
  },
  {
    label: "Orase",
    href: "/#orase",
  },
  {
    label: "Afaceri",
    href: "/#afaceri",
  },
  {
    label: "Despre",
    href: "/despre",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function absoluteSiteUrl(path = "/") {
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}

export function isReservedDirectorySlug(slug: string) {
  return reservedDirectorySlugs.includes(
    slug.toLowerCase() as (typeof reservedDirectorySlugs)[number],
  );
}
