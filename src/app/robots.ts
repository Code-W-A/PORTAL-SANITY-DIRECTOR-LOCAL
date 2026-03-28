import type { MetadataRoute } from "next";
import { robotsDisallowPaths } from "@/config/seo";
import { absoluteSiteUrl, siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...robotsDisallowPaths],
      },
    ],
    sitemap: absoluteSiteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
