import { ElementType, ReactNode } from "react";

type PortalCardTone = "default" | "muted" | "dark";
type PortalCardPadding = "compact" | "comfortable";

type PortalCardFrameProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  tone?: PortalCardTone;
  padding?: PortalCardPadding;
};

const toneClasses: Record<PortalCardTone, string> = {
  default: "border border-gray-3 bg-white text-dark",
  muted: "border border-gray-3 bg-gray text-dark",
  dark: "border border-dark bg-dark text-white",
};

const paddingClasses: Record<PortalCardPadding, string> = {
  compact: "p-4",
  comfortable: "p-6",
};

export default function PortalCardFrame({
  children,
  as: Tag = "article",
  className,
  tone = "default",
  padding = "compact",
}: PortalCardFrameProps) {
  return (
    <Tag
      className={[
        "rounded-[20px]",
        toneClasses[tone],
        paddingClasses[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
