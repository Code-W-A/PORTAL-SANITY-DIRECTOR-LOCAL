import { isReservedDirectorySlug } from "@/config/site";

const romanianDiacriticsMap: Record<string, string> = {
  ă: "a",
  â: "a",
  î: "i",
  ș: "s",
  ş: "s",
  ț: "t",
  ţ: "t",
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugifyRomanian(input: string) {
  return input
    .trim()
    .toLowerCase()
    .split("")
    .map((character) => romanianDiacriticsMap[character] ?? character)
    .join("")
    .replace(/&/g, " si ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function validateSlugValue(
  value: { current?: string } | undefined,
  options: { blockReserved?: boolean } = {},
) {
  const slug = value?.current;

  if (!slug) {
    return true;
  }

  if (!slugPattern.test(slug)) {
    return "Slugul trebuie sa foloseasca doar litere mici, cifre si cratime.";
  }

  if (options.blockReserved && isReservedDirectorySlug(slug)) {
    return "Slugul este rezervat pentru rutele sistemului.";
  }

  return true;
}

export async function isUniqueBusinessSlugWithinCity(
  slug: string,
  context: {
    document?: { _id?: string; city?: { _ref?: string } };
    getClient: (options: { apiVersion: string }) => {
      fetch: <T>(query: string, params: Record<string, string>) => Promise<T>;
    };
  },
) {
  const cityRef = context.document?.city?._ref;

  if (!slug || !cityRef) {
    return true;
  }

  const baseId = context.document?._id?.replace(/^drafts\./, "") ?? "";
  const publishedId = baseId;
  const draftId = baseId ? `drafts.${baseId}` : "";

  const query = `count(*[
    _type == "business" &&
    slug.current == $slug &&
    city._ref == $cityRef &&
    !(_id in [$draftId, $publishedId])
  ]) == 0`;

  return context
    .getClient({ apiVersion: "2023-06-19" })
    .fetch<boolean>(query, {
      slug,
      cityRef,
      draftId,
      publishedId,
    });
}
