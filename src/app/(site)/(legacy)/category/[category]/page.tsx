import { permanentRedirect } from "next/navigation";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage(props: Props) {
  const { category } = await props.params;
  permanentRedirect(`/blog?category=${category}`);
}
