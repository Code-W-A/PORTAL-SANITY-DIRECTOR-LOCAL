import { Business, CategorySummary, City } from "@/types/directory";

export type CategoryInsight = {
  _id: string;
  title: string;
  count: number;
  description?: string;
  slug?: CategorySummary["slug"];
};

export function getTopCategoriesFromBusinesses(
  businesses: Business[],
  limit = 6,
) {
  const categoryMap = new Map<string, CategoryInsight>();

  businesses.forEach((business) => {
    if (business.categories.length > 0) {
      business.categories.forEach((category) => {
        const existing = categoryMap.get(category._id);

        if (existing) {
          existing.count += 1;
          return;
        }

        categoryMap.set(category._id, {
          _id: category._id,
          title: category.title,
          description: category.description,
          slug: category.slug,
          count: 1,
        });
      });

      return;
    }

    if (business.category) {
      const fallbackKey = `fallback-${business.category.toLowerCase()}`;
      const existing = categoryMap.get(fallbackKey);

      if (existing) {
        existing.count += 1;
        return;
      }

      categoryMap.set(fallbackKey, {
        _id: fallbackKey,
        title: business.category,
        count: 1,
      });
    }
  });

  return [...categoryMap.values()]
    .sort((left, right) => {
      if (right.count !== left.count) {
        return right.count - left.count;
      }

      return left.title.localeCompare(right.title, "ro");
    })
    .slice(0, limit);
}

export function getImportantCities(cities: City[], limit = 6) {
  return [...cities]
    .sort((left, right) => {
      const featuredDelta = Number(right.featured) - Number(left.featured);

      if (featuredDelta !== 0) {
        return featuredDelta;
      }

      const businessDelta = (right.businessCount || 0) - (left.businessCount || 0);

      if (businessDelta !== 0) {
        return businessDelta;
      }

      return left.title.localeCompare(right.title, "ro");
    })
    .slice(0, limit);
}

export function getRelatedBusinesses(
  currentBusiness: Business,
  businesses: Business[],
  limit = 3,
) {
  const currentCategoryIds = new Set(
    currentBusiness.categories.map((category) => category._id),
  );

  return businesses
    .filter((business) => business._id !== currentBusiness._id)
    .sort((left, right) => {
      const leftCategoryMatches = left.categories.filter((category) =>
        currentCategoryIds.has(category._id),
      ).length;
      const rightCategoryMatches = right.categories.filter((category) =>
        currentCategoryIds.has(category._id),
      ).length;

      if (rightCategoryMatches !== leftCategoryMatches) {
        return rightCategoryMatches - leftCategoryMatches;
      }

      const featuredDelta = Number(right.featured) - Number(left.featured);

      if (featuredDelta !== 0) {
        return featuredDelta;
      }

      return left.title.localeCompare(right.title, "ro");
    })
    .slice(0, limit);
}
