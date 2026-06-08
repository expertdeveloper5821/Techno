'use client';

import { useState, useEffect, useRef, type CSSProperties, type MouseEvent } from 'react';
import { getFAQs } from '@/app/services/faqService';
import type { FAQ } from '@/app/services/faqService';

const palette = {
  surface: 'bg-[#010101] text-neutral-100',
  panel: 'bg-neutral-900/50',
  border: 'border-white/10',
  heading: 'text-white',
  muted: 'text-neutral-400',
  iconRing: 'border-white/20',
  iconSurface: 'bg-white/5',
  icon: 'text-white',
  glow: 'rgba(255, 255, 255, 0.08)',
  shadow: 'shadow-[0_36px_140px_-60px_rgba(10,10,10,0.95)]',
} as const;

interface FAQTopic {
  id: string;
  title: string;
  items: FAQ[];
}

function groupByMeta(faqs: FAQ[]): FAQTopic[] {
  const map = new Map<string, FAQ[]>();
  for (const faq of faqs) {
    const key = faq.meta?.trim() || 'General';
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(faq);
  }
  return Array.from(map.entries()).map(([title, items]) => ({
    id: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    title,
    items,
  }));
}

export default function TopicsAccordion() {
  const [topics, setTopics] = useState<FAQTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTopicId, setActiveTopicId] = useState('');
  const [openIndexesByTopic, setOpenIndexesByTopic] = useState<Record<string, number>>({});

  // Track whether the user clicked a nav button so we don't fight the observer
  const isClickScrolling = useRef(false);
  const clickScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    getFAQs()
      .then((data) => {
        const grouped = groupByMeta(data);
        setTopics(grouped);
        if (grouped.length > 0) {
          setActiveTopicId(grouped[0].id);
          setOpenIndexesByTopic(
            grouped.reduce<Record<string, number>>((acc, topic) => {
              acc[topic.id] = 0;
              return acc;
            }, {})
          );
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ── Scroll spy via IntersectionObserver ──────────────────────────────────
  useEffect(() => {
    if (topics.length === 0) return;

    const observers: IntersectionObserver[] = [];

    // We track which sections are currently visible and pick the topmost one
    const visibleSections = new Set<string>();

    const updateActive = () => {
      if (isClickScrolling.current) return;
      // Pick the first topic (in DOM order) that is currently intersecting
      for (const topic of topics) {
        if (visibleSections.has(topic.id)) {
          setActiveTopicId(topic.id);
          return;
        }
      }
    };

    topics.forEach((topic) => {
      const el = document.getElementById(`faq-topic-${topic.id}`);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.add(topic.id);
            } else {
              visibleSections.delete(topic.id);
            }
            updateActive();
          });
        },
        {
          // Fire when the section enters the middle band of the viewport
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [topics]);

  // ── Nav click: scroll to section and temporarily pause the observer ──────
  const handleTopicChange = (topicId: string) => {
    setActiveTopicId(topicId);

    // Suppress observer updates while the page is animating to the target
    isClickScrolling.current = true;
    if (clickScrollTimer.current) clearTimeout(clickScrollTimer.current);
    clickScrollTimer.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);

    const target = document.getElementById(`faq-topic-${topicId}`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const setCardGlow = (event: MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--faq-x', `${event.clientX - rect.left}px`);
    target.style.setProperty('--faq-y', `${event.clientY - rect.top}px`);
  };

  const clearCardGlow = (event: MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    target.style.removeProperty('--faq-x');
    target.style.removeProperty('--faq-y');
  };

  if (loading) {
    return (
      <section className={`relative w-full overflow-clip lg:py-20 md:py-15 py-10 ${palette.surface}`}>
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-10">
          <div className="h-8 w-32 bg-white/10 rounded animate-pulse mb-6" />
          <div className="grid gap-6 lg:grid-cols-[1fr_3fr] lg:gap-7">
            <div className="h-64 bg-white/5 rounded-[10px] animate-pulse" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-white/5 rounded-[10px] animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (topics.length === 0) return null;

  return (
    <section className={`relative w-full overflow-clip lg:py-20 md:py-15 py-10 ${palette.surface}`}>
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-10">
        <h2 className="mb-3 text-[32px] leading-[40px] font-medium tracking-[1%] text-white">Topics</h2>
        <div className="grid gap-6 lg:grid-cols-[1fr_3fr] lg:gap-7">

          {/* ── Sticky sidebar nav ── */}
          <aside className="h-fit border rounded-[10px] border-[#FFFFFF4D] bg-[#0094DB] p-3 sm:p-4 lg:sticky lg:top-6">
            <div className="space-y-1.5">
              {topics.map((topic) => {
                const isActive = topic.id === activeTopicId;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => handleTopicChange(topic.id)}
                    className={`w-full rounded-lg px-4 py-3 text-left text-sm transition-all duration-300 sm:text-base ${
                      isActive
                        ? 'bg-[#000000] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)]'
                        : 'text-[#DDF4FF] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {/* Active indicator dot */}
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

          {/* ── FAQ panels ── */}
          <div className="space-y-5">
            {topics.map((topic, index) => (
              <div key={topic.id} id={`faq-topic-${topic.id}`} className="space-y-3 scroll-mt-6">

                {/* Divider between topics (hidden for first) */}
                <div className={`flex items-center gap-4 px-1 ${index === 0 ? 'hidden' : ''}`}>
                  <span className="h-px flex-1 bg-[#535353]" />
                  <h3 className="shrink-0 text-base tracking-[1%] text-[#F5F5F5] leading-7 sm:text-lg">
                    {topic.title}
                  </h3>
                  <span className="h-px flex-1 bg-[#535353]" />
                </div>

                <div className={`rounded-[10px] border border-[#757575] ${palette.border} bg-[#0B0B0B] p-3 sm:p-4`}>
                  <h4 className={`text-lg font-semibold text-[#F5F5F5] leading-[34px] tracking-[1%] sm:text-2xl ${palette.heading}`}>
                    {topic.title}
                  </h4>

                  <ul className="space-y-4 mt-4">
                    {topic.items.map((item, itemIndex) => {
                      const open = openIndexesByTopic[topic.id] === itemIndex;
                      const panelId = `faq-topic-panel-${topic.id}-${itemIndex}`;
                      const buttonId = `faq-topic-trigger-${topic.id}-${itemIndex}`;

                      return (
                        <li
                          key={item._id}
                          className={`group relative overflow-clip rounded-2xl border border-[#282828] backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 ${palette.border} ${palette.panel} ${palette.shadow} ${
                            open ? 'border-[#0183C1]' : ''
                          }`}
                          onMouseMove={setCardGlow}
                          onMouseLeave={clearCardGlow}
                        >
                          <div
                            className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                              open ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                            }`}
                            style={{
                              background: `radial-gradient(240px circle at var(--faq-x, 50%) var(--faq-y, 50%), ${palette.glow}, transparent 70%)`,
                            }}
                          />

                          <button
                            type="button"
                            id={buttonId}
                            aria-controls={panelId}
                            aria-expanded={open}
                            onClick={() =>
                              setOpenIndexesByTopic((prev) => ({
                                ...prev,
                                [topic.id]: prev[topic.id] === itemIndex ? -1 : itemIndex,
                              }))
                            }
                            style={{ '--faq-outline': 'rgba(255,255,255,0.35)' } as CSSProperties}
                            className="relative flex w-full items-start gap-4 px-4 py-4 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--faq-outline) sm:gap-6 sm:px-6 sm:py-5"
                          >
                            <span
                              className={`relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 group-hover:scale-105 sm:h-11 sm:w-11 ${palette.iconRing} ${palette.iconSurface}`}
                            >
                              <svg
                                className={`relative transition-transform duration-500 ${palette.icon} ${open ? 'rotate-45 text-[#0183C1]' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="34"
                                height="34"
                                viewBox="0 0 34 34"
                                fill="none"
                              >
                                <path
                                  d="M25.4987 18.4134H18.4154V25.4967C18.4154 25.8725 18.2661 26.2328 18.0004 26.4985C17.7348 26.7642 17.3744 26.9134 16.9987 26.9134C16.623 26.9134 16.2626 26.7642 15.997 26.4985C15.7313 26.2328 15.582 25.8725 15.582 25.4967V18.4134H8.4987C8.12297 18.4134 7.76264 18.2642 7.49696 17.9985C7.23129 17.7328 7.08203 17.3725 7.08203 16.9967C7.08203 16.621 7.23129 16.2607 7.49696 15.995C7.76264 15.7293 8.12297 15.5801 8.4987 15.5801H15.582V8.49674C15.582 8.12102 15.7313 7.76069 15.997 7.49501C16.2626 7.22933 16.623 7.08008 16.9987 7.08008C17.3744 7.08008 17.7348 7.22933 18.0004 7.49501C18.2661 7.76069 18.4154 8.12102 18.4154 8.49674V15.5801H25.4987C25.8744 15.5801 26.2348 15.7293 26.5004 15.995C26.7661 16.2607 26.9154 16.621 26.9154 16.9967C26.9154 17.3725 26.7661 17.7328 26.5004 17.9985C26.2348 18.2642 25.8744 18.4134 25.4987 18.4134Z"
                                  fill="white"
                                />
                              </svg>
                            </span>

                            <div className="flex flex-1 flex-col gap-2">
                              <h4 className={`text-sm sm:text-xl leading-[36px] tracking-[2%] text-[#F5F5F5] ${palette.heading}`}>
                                {item.question}
                              </h4>
                              <div
                                id={panelId}
                                role="region"
                                aria-labelledby={buttonId}
                                className={`overflow-clip text-sm leading-relaxed transition-[max-height] duration-500 ease-out ${palette.muted} ${
                                  open ? 'max-h-96' : 'max-h-0'
                                }`}
                              >
                                <div className="pr-1 pb-1 space-y-2">
                                  {item.answer.split(/\r?\n/).map((line, i) =>
                                    line.trim() === '' ? (
                                      <br key={i} />
                                    ) : (
                                      <p key={i}>{line}</p>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
