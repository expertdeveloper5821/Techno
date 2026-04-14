import Image from "next/image";
import type { BlogPost } from "@/app/lib/data/blog-posts";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-[#FFFFFF33] bg-[#141414]">
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
        <h2 className="text-lg font-semibol tracking-[1%]  leading-snug text-white sm:text-xl">
          {post.title}
        </h2>
        <p className="line-clamp-3 flex-1 text-sm tracking-[1%] leading-relaxed text-[#FFFFFF] sm:text-[14px]">
          {post.excerpt}
        </p>
        <p className="text-xs text-[#8B8B8B] tracking-[1%] leading-[20px] sm:text-sm">
          {post.author} <span className="text-white/40">|</span> {post.date}
        </p>
      </div>
    </article>
  );
}
