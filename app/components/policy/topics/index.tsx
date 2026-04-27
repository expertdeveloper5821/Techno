'use client';

import { useState, type MouseEvent } from 'react';
import { privacyTopics } from '../../../lib/data/privacy-page-topics';

const palette = {
  surface: 'bg-[#010101] text-neutral-100',
  panel: 'bg-neutral-900/50',
  border: 'border-white/10',
  heading: 'text-white',
  muted: 'text-[#F5F5F5]',
  iconRing: 'border-white/20',
  iconSurface: 'bg-white/5',
  icon: 'text-white',
  glow: 'rgba(255, 255, 255, 0.08)',
  shadow: 'shadow-[0_36px_140px_-60px_rgba(10,10,10,0.95)]',
} as const;



 
 

 



export default function Topics() {
  const [activeTopicId, setActiveTopicId] = useState(privacyTopics[0]?.id ?? '');

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

  const handleTopicChange = (topicId: string) => {
    setActiveTopicId(topicId);
    const target = document.getElementById(`faq-topic-${topicId}`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };







  return (
    <section className={`relative w-full overflow-clip lg:py-20 md:py-15 py-10 ${palette.surface}`}>
      <div className="mx-auto w-full  px-4 sm:px-6 lg:px-10">
      <h2 className="mb-3 text-[32px] leading-[40px] font-medium tracking-[1%] text-white">Topics</h2>
        <div className="grid gap-6 lg:grid-cols-[1fr_3fr] lg:gap-7">
          <aside className="h-fit  border rounded-[10px] border-[#FFFFFF4D] bg-[#0094DB] p-3 sm:p-4  xl:sticky top-0">
            

            <div className="space-y-1.5">
              {privacyTopics.map((topic) => {
                const isActive = topic.id === activeTopicId;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => handleTopicChange(topic.id)}
                    className={`w-full rounded-lg px-4 py-3 text-left text-sm transition-all duration-200 sm:text-base ${isActive
                        ? 'bg-[#000000] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)]'
                        : 'text-[#DDF4FF] hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    <span className="block font-medium">{topic.title}</span>
                 
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="space-y-5">
            {privacyTopics.map((topic , index) => (
              <div key={topic.id} id={`faq-topic-${topic.id}`} className="space-y-3">
                <div className={`flex items-center gap-4 px-1 ${index === 0 ? 'hidden' : ''}`}>
                  <span className="h-px flex-1 bg-[#535353]" />
                  <h3
                    className={`shrink-0 text-base  tracking-[1%]   text-[#F5F5F5] leading-7 sm:text-lg ${
                      index === 0 ? 'hidden' : ''
                    }`}
                  >
                    {topic.title}
                  </h3>
                  <span className="h-px flex-1 bg-[#535353]" />
                </div>

                <div
                  className={`group relative overflow-clip rounded-[10px] border border-[#757575] ${palette.border} bg-[#0B0B0B] p-3 sm:p-4 ${palette.shadow}`}
                  onMouseMove={setCardGlow}
                  onMouseLeave={clearCardGlow}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(240px circle at var(--faq-x, 50%) var(--faq-y, 50%), ${palette.glow}, transparent 70%)`,
                    }}
                  />
                  <h4 className={`text-lg font-semibold text-[#F5F5F5] leading-[34px] tracking-[1%] sm:text-2xl ${palette.heading}`}>
                    {topic.title}
                  </h4>
                  <div className="relative mt-2 space-y-2">
                    {topic.paragraphs.map((paragraph, paragraphIndex) => (
                      <p
                        key={`${topic.id}-paragraph-${paragraphIndex}`}
                        className={`text-sm leading-7 tracking-[1%] sm:text-lg ${palette.muted}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                    {topic.bullets?.length ? (
                      <ul className={`list-disc space-y-1 pl-4 text-sm leading-7 tracking-[1%] sm:text-lg ${palette.muted}`}>
                        {topic.bullets.map((bullet, bulletIndex) => (
                          <li key={`${topic.id}-bullet-${bulletIndex}`}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
