'use client';

import { useState, useEffect, useRef, type MouseEvent } from 'react';

interface TermsTopic {
  _id: string;
  title: string;
  paragraphs: string[];
  bullets: string[];
  order: number;
}

const palette = {
  surface: 'bg-[#010101] text-neutral-100',
  border: 'border-white/10',
  heading: 'text-white',
  muted: 'text-[#F5F5F5]',
  glow: 'rgba(255, 255, 255, 0.08)',
  shadow: 'shadow-[0_36px_140px_-60px_rgba(10,10,10,0.95)]',
} as const;

function toSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

interface TopicsProps {
  topics?: TermsTopic[];
}

export default function Topics({ topics: propTopics }: TopicsProps) {
  const topics = propTopics ?? [];
  const [activeTopicId, setActiveTopicId] = useState(topics.length > 0 ? toSlug(topics[0].title) : '');

  const isClickScrolling = useRef(false);
  const clickScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll spy
  useEffect(() => {
    if (topics.length === 0) return;

    const visibleSections = new Set<string>();
    const observers: IntersectionObserver[] = [];

    const updateActive = () => {
      if (isClickScrolling.current) return;
      for (const topic of topics) {
        const slug = toSlug(topic.title);
        if (visibleSections.has(slug)) {
          setActiveTopicId(slug);
          return;
        }
      }
    };

    topics.forEach((topic) => {
      const slug = toSlug(topic.title);
      const el = document.getElementById(`terms-topic-${slug}`);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.add(slug);
            } else {
              visibleSections.delete(slug);
            }
            updateActive();
          });
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [topics]);

  const handleTopicChange = (slug: string) => {
    setActiveTopicId(slug);
    isClickScrolling.current = true;
    if (clickScrollTimer.current) clearTimeout(clickScrollTimer.current);
    clickScrollTimer.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
    document
      .getElementById(`terms-topic-${slug}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const setCardGlow = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--faq-x', `${event.clientX - rect.left}px`);
    target.style.setProperty('--faq-y', `${event.clientY - rect.top}px`);
  };

  const clearCardGlow = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    target.style.removeProperty('--faq-x');
    target.style.removeProperty('--faq-y');
  };

  if (topics.length === 0) return null;

  return (
    <section
      className={`relative w-full overflow-clip lg:py-20 md:py-15 py-10 ${palette.surface}`}
    >
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-10">
        <h2 className="mb-3 text-[32px] leading-[40px] font-medium tracking-[1%] text-white">
          Topics
        </h2>

        <div className="grid gap-6 lg:grid-cols-[1fr_3fr] lg:gap-7">
          {/* Sticky sidebar nav */}
          <aside className="h-fit border rounded-[10px] border-[#FFFFFF4D] bg-[#0094DB] p-3 sm:p-4 lg:sticky lg:top-6">
            <div className="space-y-1.5">
              {topics.map((topic) => {
                const slug = toSlug(topic.title);
                const isActive = slug === activeTopicId;
                return (
                  <button
                    key={topic._id}
                    type="button"
                    onClick={() => handleTopicChange(slug)}
                    className={`w-full rounded-lg px-4 py-3 text-left text-sm transition-all duration-300 sm:text-base ${
                      isActive
                        ? 'bg-[#000000] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)]'
                        : 'text-[#DDF4FF] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {/* <span
                        className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 ${
                          isActive ? 'bg-white scale-125' : 'bg-white/30'
                        }`}
                      /> */}
                      <span className="block font-medium">{topic.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Content panels */}
          <div className="space-y-5">
            {topics.map((topic, index) => {
              const slug = toSlug(topic.title);
              return (
                <div
                  key={topic._id}
                  id={`terms-topic-${slug}`}
                  className="space-y-3 scroll-mt-6"
                >
                  {/* Divider between topics */}
                  <div
                    className={`flex items-center gap-4 px-1 ${index === 0 ? 'hidden' : ''}`}
                  >
                    <span className="h-px flex-1 bg-[#535353]" />
                    <h3 className="shrink-0 text-base tracking-[1%] text-[#F5F5F5] leading-7 sm:text-lg">
                      {topic.title}
                    </h3>
                    <span className="h-px flex-1 bg-[#535353]" />
                  </div>

                  <div
                    className={`group relative overflow-clip rounded-[10px] border border-[#757575] ${palette.border} bg-[#0B0B0B] p-3 sm:p-4 ${palette.shadow}`}
                    onMouseMove={setCardGlow}
                    onMouseLeave={clearCardGlow}
                  >
                    {/* Glow effect */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(240px circle at var(--faq-x, 50%) var(--faq-y, 50%), ${palette.glow}, transparent 70%)`,
                      }}
                    />

                    <h4
                      className={`text-lg font-semibold text-[#F5F5F5] leading-[34px] tracking-[1%] sm:text-2xl ${palette.heading}`}
                    >
                      {topic.title}
                    </h4>

                    <div className="relative mt-2 space-y-2">
                      {topic.paragraphs.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className={`text-sm leading-7 tracking-[1%] sm:text-lg ${palette.muted}`}
                        >
                          {paragraph}
                        </p>
                      ))}

                      {topic.bullets?.length > 0 && (
                        <ul
                          className={`list-disc space-y-1 pl-4 text-sm leading-7 tracking-[1%] sm:text-lg ${palette.muted}`}
                        >
                          {topic.bullets.map((bullet, bIdx) => (
                            <li key={bIdx}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
