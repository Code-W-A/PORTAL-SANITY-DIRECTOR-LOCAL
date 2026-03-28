import config from "@/sanity/config/client-config";
import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import Image from "next/image";
import { PortableTextBlock } from "sanity";

const PortableImage = ({ value, isInline }: any) => {
  const { width, height } = getImageDimensions(value);
  const url = urlBuilder(config).image(value).fit("max").auto("format").url();

  return (
    <Image
      src={url || ""}
      width={width}
      height={height}
      alt={value.alt || "image"}
      loading="lazy"
      style={{
        display: isInline ? "inline-block" : "block",
        aspectRatio: width / height,
      }}
    />
  );
};

const components = {
  types: {
    image: PortableImage,
  },
};

const PortableTextContent = ({
  value,
}: {
  value?: PortableTextBlock[];
}) => {
  return <PortableText value={value || []} components={components} />;
};

export default PortableTextContent;
