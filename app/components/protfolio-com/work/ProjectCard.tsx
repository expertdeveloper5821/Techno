import Image from "next/image";
import type { PortfolioWorkItem } from "@/app/lib/data/portfolio-work";

interface ProjectCardProps {
  item: PortfolioWorkItem;
}

export default function ProjectCard({ item }: ProjectCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0F0F0F]">
      <div className="relative aspect-412/220 w-full bg-[#1a1a1a]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug text-white sm:text-lg">
            {item.title}
          </h3>
          <span className="shrink-0 rounded-full border border-white/15 bg-[#141414] px-3 py-1 text-xs font-medium text-white/90">
            {item.tag}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-white/80 sm:text-[15px]">
          {item.description}
        </p>
      </div>
    </article>
  );
}
