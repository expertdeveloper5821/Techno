import type { PortfolioCategory } from "./Work";

const PORTFOLIO_FILTER_LABELS: PortfolioCategory[] = [
  "All",
  "Consulting",
  "Mobile Apps",
  "Web Development",
  "Cloud & DevOps",
  "AI Solutions",
  "E-Commerce",
];

interface FilterBarProps {
  active: PortfolioCategory;
  onChange: (category: PortfolioCategory) => void;
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {PORTFOLIO_FILTER_LABELS.map((label) => {
        const isActive = active === label;
        return (
          <button
            key={label}
            type="button"
            onClick={() => onChange(label)}
            className={
              isActive
                ? "rounded-full bg-[#0094DB] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0284c7] sm:px-5 sm:text-base"
                : "rounded-full border border-[#3F3F3F] bg-[#0F0F0F] px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 sm:px-5 sm:text-base"
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
