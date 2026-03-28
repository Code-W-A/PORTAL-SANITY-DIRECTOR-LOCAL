import SidebarLink from "@/components/Docs/SidebarLink";
import { getAllPosts } from "@/libs/markdown";
import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DocsLayout({ children }: PropsWithChildren) {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <div className="bg-gray-2">
      <div className="mx-auto grid max-w-[1170px] gap-x-8 gap-y-4 pt-24 pb-16 md:pt-28 md:pb-20 lg:grid-cols-[auto_1fr] lg:pt-32 lg:pb-24">
        <aside className="max-h-fit rounded-lg bg-white p-4 lg:sticky lg:top-[80px]">
          <nav>
            <ul className="space-y-2">
              {posts.map((post) => (
                <SidebarLink post={post} key={post.slug} />
              ))}
            </ul>
          </nav>
        </aside>

        <main className="prose max-w-none rounded-lg bg-white px-8 py-11 sm:p-[55px] lg:px-8 xl:p-[55px]">
          {children}
        </main>
      </div>
    </div>
  );
}
