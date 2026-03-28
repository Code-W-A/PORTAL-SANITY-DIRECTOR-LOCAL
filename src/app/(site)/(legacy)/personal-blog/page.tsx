import { permanentRedirect } from "next/navigation";

export default function PersonalBlogPage() {
  permanentRedirect("/blog");
}
