"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Wordmark from "@/components/Brand/Wordmark";
import menuData from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const pathUrl = usePathname();

  useEffect(() => {
    const handleStickyMenu = () => {
      setStickyMenu(window.scrollY >= 80);
    };

    window.addEventListener("scroll", handleStickyMenu);

    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: any) {
      const navigationElement = document.querySelector(".navigation");
      if (
        navigationElement &&
        !navigationElement.contains(event.target) &&
        navigationOpen
      ) {
        setNavigationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigationOpen]);

  useEffect(() => {
    setNavigationOpen(false);
  }, [pathUrl]);

  return (
    <header
      className={`fixed top-0 left-0 z-9999 w-full border-b border-transparent bg-white/95 py-5 backdrop-blur-sm transition-all duration-300 ease-in-out lg:py-0 ${
        stickyMenu ? "border-gray-3 shadow-sm" : ""
      }`}
    >
      <div className="navigation relative mx-auto max-w-[1170px] items-center justify-between px-4 sm:px-8 lg:flex xl:px-0">
        <div className="flex w-full items-center justify-between lg:w-3/12">
          <Wordmark />

          <button
            className="block lg:hidden"
            onClick={() => setNavigationOpen((state) => !state)}
            aria-label="mobile menu toggler"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`bg-dark relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm delay-0 duration-200 ease-in-out ${
                    !navigationOpen && "w-full! delay-300"
                  }`}
                ></span>

                <span
                  className={`bg-dark relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm delay-150 duration-200 ease-in-out ${
                    !navigationOpen && "w-full! delay-400"
                  }`}
                ></span>
                <span
                  className={`bg-dark relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm delay-200 duration-200 ease-in-out ${
                    !navigationOpen && "w-full! delay-500"
                  }`}
                ></span>
              </span>
              <span className="du-block absolute right-0 h-full w-full rotate-45">
                <span
                  className={`bg-dark absolute top-0 left-2.5 block h-full w-0.5 rounded-sm delay-300 duration-200 ease-in-out ${
                    !navigationOpen && "h-0! delay-0"
                  }`}
                ></span>
                <span
                  className={`bg-dark absolute top-2.5 left-0 block h-0.5 w-full rounded-sm delay-400 duration-200 ease-in-out ${
                    !navigationOpen && "dealy-200 h-0!"
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        <div
          className={`invisible h-0 w-full items-center justify-between lg:visible lg:flex lg:h-auto lg:w-9/12 ${
            navigationOpen
              ? "visible! mt-4 h-auto! max-h-[400px] overflow-y-scroll rounded-md bg-white p-7.5 shadow-lg"
              : ""
          }`}
        >
          <nav className="lg:flex lg:items-center lg:gap-6">
            <span className="hidden rounded-full border border-gray-3 bg-gray px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-body lg:inline-flex">
              Local Directory
            </span>
            <ul className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
              {menuData.map((menuItem) => {
                const isActive =
                  menuItem.path &&
                  menuItem.path !== "/"
                    ? pathUrl.startsWith(menuItem.path.replace("/#", "/"))
                    : pathUrl === "/";

                return (
                  <li
                    className={`group relative lg:py-6 ${
                      stickyMenu ? "lg:py-5" : ""
                    }`}
                    key={menuItem.id}
                  >
                    <Link
                      onClick={() => setNavigationOpen(false)}
                      href={menuItem.path || "/"}
                      className={`flex items-center justify-between gap-3 font-medium transition-colors duration-200 ${
                        isActive ? "text-dark" : "text-body hover:text-dark"
                      }`}
                    >
                      {menuItem.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-7 flex flex-col gap-4 lg:mt-0 lg:flex-row lg:items-center">
            <Link
              href="/contact"
              className="rounded-md border border-dark px-5.5 py-2.5 font-medium text-dark transition-colors duration-200 hover:bg-dark hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
