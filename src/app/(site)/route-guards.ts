import { isReservedDirectorySlug } from "@/config/site";
import { notFound } from "next/navigation";

export function notFoundIfReservedDirectorySlug(slug: string) {
  if (isReservedDirectorySlug(slug)) {
    notFound();
  }
}

export function notFoundIfReservedDirectorySlugs(slugs: string[]) {
  if (slugs.some((slug) => isReservedDirectorySlug(slug))) {
    notFound();
  }
}
