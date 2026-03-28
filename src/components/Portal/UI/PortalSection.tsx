import { ReactNode } from "react";

type PortalSectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
};

export default function PortalSection({
  children,
  id,
  className,
  containerClassName,
}: PortalSectionProps) {
  return (
    <section id={id} className={className}>
      <div
        className={[
          "mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0",
          containerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </section>
  );
}
