import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/libs/metadata";

export const metadata = buildMetadata({
  title: `Pagina inexistenta | ${siteConfig.name}`,
  description: "Pagina de eroare nu trebuie indexata.",
  path: "/error",
  noIndex: true,
});

const ErrorPage = () => {
  return (
    <main>
      <section className="pb-20 pt-39 lg:pb-25 lg:pt-44">
        <div className="mx-auto w-full max-w-[598px] px-4 text-center sm:px-8 lg:px-0">
          <Image
            src="/images/404.svg"
            alt="404"
            className="mx-auto mb-12.5 w-1/2 sm:w-full"
            width={598}
            height={559}
          />
          <h1 className="mb-5 text-heading-6 font-bold text-dark sm:text-heading-4 lg:text-heading-3">
            Pagina nu a fost gasita.
          </h1>
          <p className="mb-7.5">
            Pagina cautata nu este disponibila sau a fost mutata. Revino pe
            homepage si continua navigarea din rutele canonice ale portalului.
          </p>
          <Link
            href="/"
            className="inline-flex rounded-md bg-dark px-6 py-3.5 font-medium text-white duration-300 ease-in hover:opacity-95"
          >
            Inapoi la homepage
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;
