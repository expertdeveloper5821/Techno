import {
  BLOG_FILTER_LABELS,
  type BlogFilterCategory,
} from "@/app/lib/data/blog-posts";

interface BlogFilterBarProps {
  active: BlogFilterCategory;
  onChange: (category: BlogFilterCategory) => void;
}

export default function BlogFilterBar({ active, onChange }: BlogFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {BLOG_FILTER_LABELS.map((label) => {
        const isActive = active === label;
        return (
          <button
            key={label}
            type="button"
            onClick={() => onChange(label)}
            className={
              isActive
                ? "rounded-full bg-[#0094DB] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0284c7] sm:px-5 sm:text-base"
                : "rounded-full bg-[#1f1f1f] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2a2a2a] sm:px-5 sm:text-base"
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
