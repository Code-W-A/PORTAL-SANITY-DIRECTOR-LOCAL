import Link from "next/link";
import { Business, City, County } from "@/types/directory";
import PortalCardFrame from "../UI/PortalCardFrame";

type HomeHeroProps = {
  counties: County[];
  cities: City[];
  businesses: Business[];
};

const HomeHero = ({ counties, cities, businesses }: HomeHeroProps) => {
  const primaryCounty = counties[0];
  const primaryCity = cities[0];
  const primaryBusiness = businesses[0];

  return (
    <section className="relative overflow-hidden rounded-b-[50px] bg-gray pb-16 pt-34">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(21,23,26,0.08),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_36%)]" />

      <div className="relative z-10 mx-auto grid max-w-[1170px] gap-10 px-4 sm:px-8 lg:grid-cols-[1.3fr_0.9fr] xl:px-0">
        <div className="max-w-[720px]">
          <div className="mb-6 flex flex-wrap gap-3">
            <span className="inline-flex rounded-full border border-gray-3 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-body">
              Local Directory
            </span>
            <span className="inline-flex rounded-full border border-gray-3 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-body">
              Blog Editorial
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-dark sm:text-5xl lg:text-[64px]">
            Descopera judete, orase si afaceri locale, fara sa amesteci directorul cu blogul.
          </h1>

          <p className="max-w-[620px] text-lg leading-8 text-body">
            Portal Local pastreaza doua zone clare: pagini de director pentru
            entitati locale si o zona editoriala distincta pentru articole,
            ghiduri si recomandari.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={primaryCounty ? `/judet/${primaryCounty.slug.current}` : "/#judete"}
              className="rounded-md bg-dark px-6 py-3 font-medium text-white transition-opacity duration-200 hover:opacity-90"
            >
              Exploreaza judetele
            </Link>
            <Link
              href="/blog"
              className="rounded-md border border-dark px-6 py-3 font-medium text-dark transition-colors duration-200 hover:bg-dark hover:text-white"
            >
              Citeste blogul
            </Link>
            <Link
              href={primaryCity ? `/${primaryCity.slug.current}` : "/#orase"}
              className="rounded-md border border-gray-4 bg-white px-6 py-3 font-medium text-dark transition-colors duration-200 hover:border-dark"
            >
              Vezi orasele
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-body">
            <Link
              href="/#judete"
              className="rounded-full border border-gray-3 bg-white px-4 py-2 transition-colors duration-200 hover:border-dark hover:text-dark"
            >
              Judete
            </Link>
            <Link
              href="/#afaceri"
              className="rounded-full border border-gray-3 bg-white px-4 py-2 transition-colors duration-200 hover:border-dark hover:text-dark"
            >
              Afaceri locale
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-gray-3 bg-white px-4 py-2 transition-colors duration-200 hover:border-dark hover:text-dark"
            >
              Articole recente
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <PortalCardFrame className="shadow-sm" padding="compact">
              <p className="text-3xl font-bold text-dark">{counties.length}</p>
              <p className="text-sm text-body">judete listate</p>
            </PortalCardFrame>
            <PortalCardFrame className="shadow-sm" padding="compact">
              <p className="text-3xl font-bold text-dark">{cities.length}</p>
              <p className="text-sm text-body">orase active</p>
            </PortalCardFrame>
            <PortalCardFrame className="shadow-sm" padding="compact">
              <p className="text-3xl font-bold text-dark">{businesses.length}</p>
              <p className="text-sm text-body">afaceri recomandate</p>
            </PortalCardFrame>
          </div>
        </div>

        <div className="grid gap-4 self-end">
          {primaryCounty && (
            <Link
              href={`/judet/${primaryCounty.slug.current}`}
              className="block"
            >
              <PortalCardFrame className="transition-all duration-200 hover:-translate-y-1 hover:shadow-1" padding="comfortable">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-body">
                  Judet in focus
                </p>
                <h2 className="mb-3 text-2xl font-semibold text-dark">
                  {primaryCounty.title}
                </h2>
                <p className="line-clamp-3 text-body">{primaryCounty.summary}</p>
              </PortalCardFrame>
            </Link>
          )}

          {primaryCity && (
            <Link
              href={`/${primaryCity.slug.current}`}
              className="block"
            >
              <PortalCardFrame className="transition-all duration-200 hover:-translate-y-1 hover:shadow-1" padding="comfortable">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-body">
                  Oras recomandat
                </p>
                <h2 className="mb-3 text-2xl font-semibold text-dark">
                  {primaryCity.title}
                </h2>
                <p className="line-clamp-3 text-body">{primaryCity.summary}</p>
              </PortalCardFrame>
            </Link>
          )}

          {primaryBusiness && primaryBusiness.city && (
            <Link
              href={`/${primaryBusiness.city.slug.current}/${primaryBusiness.slug.current}`}
              className="block"
            >
              <PortalCardFrame
                className="transition-all duration-200 hover:-translate-y-1"
                tone="dark"
                padding="comfortable"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                  Afacere recomandata
                </p>
                <h2 className="mb-3 text-2xl font-semibold">
                  {primaryBusiness.title}
                </h2>
                <p className="line-clamp-3 text-white/80">
                  {primaryBusiness.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/70">
                  {primaryBusiness.city?.title && <span>{primaryBusiness.city.title}</span>}
                  {primaryBusiness.county?.title && (
                    <span>{primaryBusiness.county.title}</span>
                  )}
                </div>
              </PortalCardFrame>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
