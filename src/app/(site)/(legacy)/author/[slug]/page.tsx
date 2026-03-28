import { permanentRedirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function AuthorPage(props: Props) {
  const { slug } = await props.params;
  permanentRedirect(`/blog?author=${slug}`);
}
