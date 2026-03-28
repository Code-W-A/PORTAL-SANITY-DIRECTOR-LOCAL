import { Blog } from "@/types/blog";
import PortableTextContent from "@/components/Common/PortableTextContent";

const RenderBodyContent = ({ post }: { post: Blog }) => {
  return <PortableTextContent value={post?.body} />;
};

export default RenderBodyContent;
