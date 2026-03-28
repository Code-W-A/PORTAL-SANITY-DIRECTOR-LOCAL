import { permanentRedirect } from "next/navigation";

type Props = {
  params: Promise<{ tag: string }>;
};

export default async function TagPage(props: Props) {
  const { tag } = await props.params;
  permanentRedirect(`/blog?tag=${tag}`);
}
