'use client';

import Image from 'next/image';

interface BlogDetailContentProps {
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

export default function BlogDetailContent({
  title,
  excerpt,
  image,
  author,
  date,
  category,
}: BlogDetailContentProps) {
  return (
    <section className="bg-[#000000] text-white w-full overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 overflow-hidden">
        {/* Featured Image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 border border-white/10">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {author}
          </span>
          <span className="text-white/20">|</span>
          <span className="inline-flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {date}
          </span>
          <span className="text-white/20">|</span>
          <span className="inline-flex items-center gap-1.5 bg-[#0094DB]/20 text-[#0094DB] px-3 py-0.5 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>

        {/* Blog Content (Rich HTML) */}
        <article
          className="
            prose prose-invert prose-lg max-w-none overflow-hidden break-words
            prose-headings:text-[#0094DB] prose-headings:font-semibold
            prose-h1:text-3xl prose-h1:mb-6
            prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-10
            prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-8
            prose-p:text-gray-300 prose-p:leading-[28px] prose-p:mb-4 prose-p:break-words
            prose-a:text-[#0094DB] prose-a:no-underline hover:prose-a:underline prose-a:break-all
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:text-gray-300 prose-ul:pl-6
            prose-ol:text-gray-300 prose-ol:pl-6
            prose-li:mb-2 prose-li:leading-[28px]
            prose-blockquote:border-l-[#0094DB] prose-blockquote:bg-white/5 prose-blockquote:rounded-r-lg prose-blockquote:py-2 prose-blockquote:px-4
            [&_*]:max-w-full [&_img]:max-w-full [&_pre]:overflow-x-auto [&_pre]:max-w-full
          "
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />

        {/* Back to blog */}
        <div className="mt-16 pt-8 border-t border-white/10" />
      </div>
    </section>
  );
}
