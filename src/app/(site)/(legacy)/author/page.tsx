import { permanentRedirect } from "next/navigation";

export default function AuthorsPage() {
  permanentRedirect("/blog");
}
