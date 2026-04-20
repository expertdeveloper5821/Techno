"use client";

import { useMemo, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import BlogCard from "./BlogCard";
import BlogFilterBar from "./BlogFilterBar";
import {
  BLOG_ITEMS_PER_PAGE,
  blogPosts,
  type BlogFilterCategory,
} from "@/app/lib/data/blog-posts";

function normalize(s: string) {
  return s.trim().toLowerCase();
}
import ChevronRightIcon from "@/app/lib/icon/chevron-right-icon";
import ChevronLeftIcon from "@/app/lib/icon/chevron-left-icon";

export default function BlogListing() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlogFilterCategory>("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = normalize(query);
    return blogPosts.filter((post) => {
      const catOk =
        category === "All" ? true : post.category === category;
      if (!catOk) return false;
      if (!q) return true;
      const hay = `${post.title} ${post.excerpt} ${post.category} ${post.author}`;
      return normalize(hay).includes(q);
    });
  }, [category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / BLOG_ITEMS_PER_PAGE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * BLOG_ITEMS_PER_PAGE;
    return filtered.slice(start, start + BLOG_ITEMS_PER_PAGE);
  }, [filtered, page]);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const handleCategory = (next: BlogFilterCategory) => {
    setCategory(next);
    setPage(1);
  };

  return (
    <section

    className="bg-[#000000] text-white w-full mx-auto lg:pt-20 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10"
>
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-6">
        <div className="relative mx-auto mb-8 max-w-3xl md:mb-10">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search articles, topics, or problems..."
            className="w-full rounded-full border border-white/10 bg-[#1a1a1a] py-3 pl-5 pr-12 text-sm text-white placeholder:text-[#888888] outline-none ring-0 transition focus:border-[#0094DB]/50 sm:py-3.5 sm:text-base"
            autoComplete="off"
          />
          <span
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#a3a3a3]"
            aria-hidden
          >
            <HiOutlineMagnifyingGlass className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
        </div>

        <div className="mb-10 md:mb-12">
          <BlogFilterBar active={category} onChange={handleCategory} />
        </div>

        {pageItems.length === 0 ? (
          <p className="py-16 text-center text-white/70">
            No articles match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {pageItems.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={page <= 1}
            className="rounded-lg border border-[#EAEAEA33] bg-[#FFFFFF1A] px-4 py-2 text-sm font-medium text-white transition enabled:hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-40"
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
