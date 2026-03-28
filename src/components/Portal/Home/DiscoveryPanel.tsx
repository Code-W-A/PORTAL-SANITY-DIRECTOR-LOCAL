"use client";

import { startTransition, useDeferredValue, useState } from "react";
import { useRouter } from "next/navigation";

type SearchItem = {
  id: string;
  label: string;
  href: string;
  type: "judet" | "oras" | "afacere";
  meta?: string;
};

type DiscoveryPanelProps = {
  items: SearchItem[];
};

const typeLabel: Record<SearchItem["type"], string> = {
  judet: "Judet",
  oras: "Oras",
  afacere: "Afacere",
};

export default function DiscoveryPanel({ items }: DiscoveryPanelProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const matches = normalizedQuery
    ? items
        .filter((item) => {
          const haystack = `${item.label} ${item.meta || ""}`.toLowerCase();
          return haystack.includes(normalizedQuery);
        })
        .slice(0, 8)
    : [];

  function goTo(href: string) {
    startTransition(() => {
      router.push(href);
    });
  }

  return (
    <div className="rounded-[28px] border border-gray-3 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-body">
          Browse / Search
        </p>
        <h2 className="mb-3 text-2xl font-bold text-dark sm:text-3xl">
          Cauta rapid un judet, un oras sau o afacere.
        </h2>
        <p className="max-w-[720px] text-body">
          Foloseste cautarea ca punct de intrare sau sari direct in zonele cele
          mai importante din portal.
        </p>
      </div>

      <form
        className="mb-5 flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();

          if (matches[0]) {
            goTo(matches[0].href);
          }
        }}
      >
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ex: Cluj, Brasov, dentist..."
          className="h-13 w-full rounded-xl border border-gray-3 bg-gray px-4 text-dark outline-none transition-shadow duration-200 focus:border-dark focus:ring-0"
        />
        <button
          type="submit"
          className="rounded-xl bg-dark px-6 py-3 font-medium text-white transition-opacity duration-200 hover:opacity-90"
        >
          Deschide
        </button>
      </form>

      {matches.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2">
          {matches.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(item.href)}
              className="rounded-2xl border border-gray-3 bg-gray px-4 py-4 text-left transition-colors duration-200 hover:border-dark hover:bg-white"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-body">
                {typeLabel[item.type]}
              </p>
              <p className="font-semibold text-dark">{item.label}</p>
              {item.meta && <p className="mt-1 text-sm text-body">{item.meta}</p>}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          <a
            href="#judete"
            className="rounded-full border border-gray-3 bg-gray px-4 py-2 text-sm text-dark transition-colors duration-200 hover:border-dark hover:bg-white"
          >
            Exploreaza judetele
          </a>
          <a
            href="#orase"
            className="rounded-full border border-gray-3 bg-gray px-4 py-2 text-sm text-dark transition-colors duration-200 hover:border-dark hover:bg-white"
          >
            Vezi orasele active
          </a>
          <a
            href="#afaceri"
            className="rounded-full border border-gray-3 bg-gray px-4 py-2 text-sm text-dark transition-colors duration-200 hover:border-dark hover:bg-white"
          >
            Afaceri recomandate
          </a>
          <a
            href="#blog"
            className="rounded-full border border-gray-3 bg-gray px-4 py-2 text-sm text-dark transition-colors duration-200 hover:border-dark hover:bg-white"
          >
            Articole utile
          </a>
        </div>
      )}
    </div>
  );
}
