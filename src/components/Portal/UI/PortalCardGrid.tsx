import { ReactNode } from "react";

type PortalCardGridProps = {
  children: ReactNode;
  className?: string;
};

export default function PortalCardGrid({
  children,
  className,
}: PortalCardGridProps) {
  return (
    <div
      className={[
        "grid grid-cols-1 gap-7.5 md:grid-cols-2 xl:grid-cols-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
