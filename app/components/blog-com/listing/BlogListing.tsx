"use client";

import { useEffect, useState, useCallback } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import BlogCard from "./BlogCard";
import BlogFilterBar from "./BlogFilterBar";
import ChevronRightIcon from "@/app/lib/icon/chevron-right-icon";
import ChevronLeftIcon from "@/app/lib/icon/chevron-left-icon";
import { getBlogPosts } from "@/app/services";
import type { BlogPost } from "@/app/services";

export type BlogFilterCategory =
  | "All"
  | "Technology"
  | "Marketing"
  | "Business"
  | "Case Studies"
  | "AI Solutions"
  | "E-Commerce";

const ITEMS_PER_PAGE = 6;

export default function BlogListing() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlogFilterCategory>("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(() => {
    setLoading(true);
    getBlogPosts({ page, limit: ITEMS_PER_PAGE, category })
      .then(({ posts: fetched, pagination }) => {
        // Client-side search filter (search is local since API doesn't support it)
        const q = query.trim().toLowerCase();
        const filtered = q
          ? fetched.filter((p) =>
              `${p.title} ${p.excerpt} ${p.category} ${p.author}`
                .toLowerCase()
                .includes(q)
            )
          : fetched;
        setPosts(filtered);
        setTotal(pagination.total);
        setTotalPages(pagination.totalPages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, category, query]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCategory = (next: BlogFilterCategory) => {
    setCategory(next);
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="bg-[#000000] text-white w-full mx-auto lg:pt-20 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-6">

        {/* Search */}
        <div className="relative mx-auto mb-8 max-w-3xl md:mb-10">
          <input
            type="search"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search articles, topics, or problems..."
            className="w-full rounded-full border border-white/10 bg-[#1a1a1a] py-3 pl-5 pr-12 text-sm text-white placeholder:text-[#888888] outline-none ring-0 transition focus:border-[#0094DB]/50 sm:py-3.5 sm:text-base"
            autoComplete="off"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#a3a3a3]" aria-hidden>
            <HiOutlineMagnifyingGlass className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
        </div>

        {/* Filter */}
        <div className="mb-10 md:mb-12">
          <BlogFilterBar active={category} onChange={handleCategory} />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <p className="py-16 text-center text-white/70">No articles match your search.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-10 flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-lg border border-[#EAEAEA33] bg-[#FFFFFF1A] px-4 py-2 text-sm font-medium text-white transition enabled:hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-40"
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
