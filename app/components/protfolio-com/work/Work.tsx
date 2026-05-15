"use client";

import { useEffect, useState, useCallback } from "react";
import FilterBar from "./FilterBar";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import ChevronLeftIcon from "@/app/lib/icon/chevron-left-icon";
import ChevronRightIcon from "@/app/lib/icon/chevron-right-icon";
import { getPortfolioItems } from "@/app/services";
import type { PortfolioItem } from "@/app/services";

export type PortfolioCategory =
  | "All"
  | "Consulting"
  | "Mobile Apps"
  | "Web Development"
  | "Cloud & DevOps"
  | "AI Solutions"
  | "E-Commerce";

const ITEMS_PER_PAGE = 9;

export default function Work() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState<PortfolioCategory>("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(() => {
    setLoading(true);
    getPortfolioItems({ page, limit: ITEMS_PER_PAGE, category })
      .then(({ items: fetched, pagination }) => {
        setItems(fetched);
        setTotalPages(pagination.totalPages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, category]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleCategory = (next: PortfolioCategory) => {
    setCategory(next);
    setPage(1);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="bg-[#000000] text-white w-full mx-auto lg:pt-20 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10">
      <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-6">

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

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <p className="py-16 text-center text-white/70">No projects in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {items.map((item) => (
              <Link href="/projects" key={item._id}>
                <ProjectCard item={item} />
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-lg border border-[#3F3F3F] bg-[#141414] px-4 py-2 text-sm font-medium text-white transition enabled:hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeftIcon width={7} height={11} color="#626262" className="inline-block" /> Back
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
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="rounded-lg border border-[#3F3F3F] bg-[#141414] px-4 py-2 text-sm font-medium text-white transition enabled:hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next <ChevronRightIcon width={7} height={11} color="#626262" className="inline-block" />
          </button>
        </div>
      </div>
    </section>
  );
}
