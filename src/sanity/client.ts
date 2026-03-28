import { createImageUrlBuilder } from "@sanity/image-url";
import { createClient, QueryParams } from "next-sanity";
import { integrations } from "../../integrations.config";
import clientConfig from "./config/client-config";

export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags = [],
}: {
  query: string;
  qParams?: QueryParams;
  tags?: string[];
}): Promise<QueryResponse> {
  if (!integrations?.isSanityEnabled || !clientConfig.projectId) {
    return null as QueryResponse;
  }

  const client = createClient(clientConfig);
  return client.fetch<QueryResponse>(query, qParams, {
    cache: "force-cache",
    next: { tags },
  });
}

export function imageBuilder(source: any) {
  return createImageUrlBuilder(clientConfig).image(source);
}
