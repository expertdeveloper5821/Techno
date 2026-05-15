"use client";

import { useEffect, useState } from "react";
import { getGrowthItems } from "@/app/services";
import type { GrowthItem } from "@/app/services";

export default function Growth() {
  const [items, setItems] = useState<GrowthItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGrowthItems()
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bg-[#000000] text-white w-full mx-auto lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10 flex items-center justify-center min-h-[300px]">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section className="bg-[#000000] text-white w-full mx-auto lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10">
      <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-[25px] md:text-4xl lg:text-[44px] font-semibold text-white max-w-4xl text-center mb-6">
            Your Growth Matters
          </h2>
          <p className="text-base sm:text-base md:text-lg text-center max-w-5xl leading-[28px] text-[#ffff]">
            We create an environment where talent thrives through skill development programs, supportive teamwork,
            performance recognition, and structured career advancement opportunities.
          </p>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 p-1 py-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="group relative rounded-xl border border-white/10 bg-white/6 px-6 py-8 pt-0 transition-all duration-300 hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] w-full min-w-[260px]"
              >
                <div className="flex justify-between mb-3">
                  <img src={item.icon} alt={item.title} className="relative top-[-16px]" />
                  {item.blackIcon && <img src={item.blackIcon} alt="" aria-hidden="true" />}
                </div>
                <h3 className="text-lg md:text-[20px] leading-[20px] font-semibold mb-4">
                  {item.title}
                </h3>
                <p className="text-base md:text-lg text-gray-400 leading-[28px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
