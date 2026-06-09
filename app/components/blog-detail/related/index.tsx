'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPosts } from '@/app/services';
import type { BlogPost } from '@/app/services';

interface RelatedBlogsProps {
  currentPostId: string;
}

export default function RelatedBlogs({ currentPostId }: RelatedBlogsProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getBlogPosts({ page: 1, limit: 4 })
      .then(({ posts: fetched }) => {
        // Filter out current post and take up to 3
        const related = fetched.filter((p) => p._id !== currentPostId).slice(0, 3);
        setPosts(related);
      })
      .catch(console.error);
  }, [currentPostId]);

  if (posts.length === 0) return null;

  return (
    <section className="bg-[#000000] text-white w-full overflow-hidden">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Heading */}
        <h2 className="text-2xl md:text-[32px]  tracking-[1%] font-medium text-white mb-8">
          Read More Blogs
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post._id} href={`/blogdetail/${post._id}`} className="block group">
              <article className="flex flex-col overflow-hidden rounded-2xl border border-[#FFFFFF33] bg-[#141414] transition-all duration-300 group-hover:border-[#0094DB]/50 group-hover:shadow-[0_0_30px_rgba(0,148,219,0.1)] h-full">
                <div className="relative aspect-16/10 w-full bg-[#0a1628]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-[#0c4a6e]/40 to-[#020617]/90" />
                  <span className="absolute right-3 top-3 rounded-full bg-[#0094DB] px-3 py-1 text-xs font-medium text-white shadow-sm">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="text-lg font-semibold tracking-[1%] leading-snug text-white sm:text-xl">
                    {post.title}
                  </h3>
                  <div
                    className="line-clamp-3 flex-1 text-sm tracking-[1%] leading-relaxed text-[#FFFFFF] sm:text-[14px] [&>p]:mb-1"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                  <p className="text-xs text-[#8B8B8B] tracking-[1%] leading-[20px] sm:text-sm">
                    {post.author} <span className="text-white/40">|</span> {post.date}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#0094DB] hover:bg-[#007ab8] text-white font-medium px-6 py-3 rounded-full transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>
      </div>
    </section>
  );
}
