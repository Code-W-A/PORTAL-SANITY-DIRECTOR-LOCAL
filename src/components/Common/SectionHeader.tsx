import React from "react";
type Data = {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
};

const SectionHeader = ({
  title,
  description,
  eyebrow,
  align = "center",
  className,
}: Data) => {
  const isLeftAligned = align === "left";

  return (
    <div
      className={[
        "mb-12.5",
        isLeftAligned ? "text-left" : "text-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={isLeftAligned ? "max-w-[760px]" : "mx-auto max-w-[760px]"}>
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-body">
            {eyebrow}
          </p>
        )}
        <h2 className="mb-3.5 text-2xl font-bold text-dark sm:text-4xl xl:text-heading-3">
          {title}
        </h2>
        {description && <p className="text-body">{description}</p>}
      </div>
    </div>
  );
};

export default SectionHeader;
