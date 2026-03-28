import Link from "next/link";

export type BreadcrumbItem = {
  name: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumbs({
  items,
  className,
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-body">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
              {item.href && !isCurrent ? (
                <Link
                  href={item.href}
                  className="font-medium transition-colors duration-200 hover:text-dark"
                >
                  {item.name}
                </Link>
              ) : (
                <span aria-current={isCurrent ? "page" : undefined}>
                  {item.name}
                </span>
              )}

              {!isCurrent && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
