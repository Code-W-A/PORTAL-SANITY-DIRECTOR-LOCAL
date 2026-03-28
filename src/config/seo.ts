export type SitemapChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export type StaticSitemapEntry = {
  path: string;
  changeFrequency: SitemapChangeFrequency;
  priority: number;
};

export const indexableStaticPaths = ["/", "/blog", "/despre", "/contact"] as const;

export const noIndexStaticPaths = ["/servicii", "/privacy-policy"] as const;

export const noIndexRoutePrefixes = ["/auth", "/account", "/docs"] as const;

export const robotsDisallowPaths = ["/admin/", "/api/", "/auth/", "/account"] as const;

export const sitemapStaticEntries: StaticSitemapEntry[] = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/blog",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/despre",
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.4,
  },
];
