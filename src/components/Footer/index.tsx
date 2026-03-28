import Link from "next/link";
import Wordmark from "@/components/Brand/Wordmark";
import { footerNavigation, siteConfig } from "@/config/site";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-20 border-t border-gray-3 bg-gray py-10">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr_0.9fr] lg:items-start">
          <div className="flex flex-col gap-4">
            <Wordmark />
            <p className="max-w-[340px] text-custom-sm text-body">
              Portal local construit pe doua zone clare: directory pentru
              descoperire locala si blog pentru continut editorial.
            </p>
            <p className="text-custom-sm">
              &copy; {year} {siteConfig.name}. Toate drepturile rezervate.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-body">
              Navigare
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex text-custom-sm leading-none text-body transition-colors duration-200 hover:text-dark"
                  >
                    <span className="from-dark to-dark bg-linear-to-r bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-body">
              Zonele site-ului
            </p>
            <div className="space-y-3 text-custom-sm text-body">
              <p>
                <span className="font-semibold text-dark">Directory:</span>{" "}
                judete, orase si afaceri locale.
              </p>
              <p>
                <span className="font-semibold text-dark">Blog:</span> ghiduri,
                articole si continut editorial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
