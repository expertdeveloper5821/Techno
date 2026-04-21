"use client";

import { useMemo, useState } from "react";
import FilterBar from "./FilterBar";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import {
  ITEMS_PER_PAGE,
  portfolioWorkItems,
  type PortfolioCategory,
} from "@/app/lib/data/portfolio-work";
import ChevronLeftIcon from "@/app/lib/icon/chevron-left-icon";
import ChevronRightIcon from "@/app/lib/icon/chevron-right-icon";
export default function Work() {
  const [category, setCategory] = useState<PortfolioCategory>("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (category === "All") return portfolioWorkItems;
    return portfolioWorkItems.filter((p) => p.category === category);
  }, [category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const handleCategory = (next: PortfolioCategory) => {
    setCategory(next);
    setPage(1);
  };

  return (
    <section

            className="bg-[#000000] text-white w-full mx-auto lg:pt-20 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10"
        >
            <div className="flex flex-col justify-center  px-4 sm:px-6 lg:px-6">
        <div className="mx-auto mb-10 max-w-4xl text-center md:mb-14">
          <h2
            id="portfolio-work-heading"
            className="font-inter text-[25px] font-semibold leading-tight text-white md:text-4xl lg:text-[44px] lg:leading-tight"
          >
            Work We&apos;ve Completed Across
            <br />
            <span className="text-[#0094DB]">Multiple Industries</span>
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-base leading-7 text-white/90 md:text-lg">
            These projects reflect the real challenges our clients faced and how
            we helped them solve them through practical strategy, marketing, and
            technology solutions.
          </p>
        </div>

        <div className="mb-10 md:mb-12">
          <FilterBar active={category} onChange={handleCategory} />
        </div>

        {pageItems.length === 0 ? (
          <p className="py-16 text-center text-white/70">
            No projects in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {pageItems.map((item) => (
              <Link href={`/projects`} key={item.id}>
              <ProjectCard key={item.id} item={item} />
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={page <= 1}
            className="rounded-lg border border-[#3F3F3F] bg-[#141414] px-4 py-2 text-sm font-medium text-white transition enabled:hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeftIcon width={7} height={11} color="#626262" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />  Back
          </button>
          {pageNumbers.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={
                page === n
                  ? "min-w-[40px] rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black"
                  : "min-w-[40px] rounded-lg border border-[#3F3F3F] bg-[#141414] px-3 py-2 text-sm font-medium text-white transition hover:border-white/30"
              }
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={goNext}
            disabled={page >= totalPages}
            className="rounded-lg border border-[#3F3F3F] bg-[#141414] px-4 py-2 text-sm font-medium text-white transition enabled:hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next <ChevronRightIcon width={7} height={11} color="#626262" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
