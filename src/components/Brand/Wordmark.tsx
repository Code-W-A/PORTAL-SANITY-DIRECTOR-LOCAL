import Link from "next/link";
import { siteConfig } from "@/config/site";

const Wordmark = () => {
  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label={siteConfig.name}>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-dark text-sm font-bold text-white shadow-sm">
        PL
      </span>
      <span className="flex flex-col">
        <span className="text-lg font-bold tracking-[0.12em] text-dark uppercase">
          {siteConfig.name}
        </span>
        <span className="text-xs tracking-[0.24em] text-body uppercase">
          Judete, Orase, Afaceri
        </span>
      </span>
    </Link>
  );
};

export default Wordmark;
