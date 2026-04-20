"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/app/lib/animations";
import type { ProjectAboutBlock } from "@/app/lib/data/project-review";

interface AboutProjectProps {
  content: ProjectAboutBlock;
}

export default function AboutProject({ content }: AboutProjectProps) {
  return (
    <section className="bg-[#000000]  text-white lg:pt-20 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid items-center  lg:grid-cols-2 ">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="relative overflow-hidden h-full w-full rounded-tl-xl rounded-bl-xl border border-white/10 bg-[#0a0a0a]"
          >
            <Image
              src={content.imageSrc}
              alt={content.imageAlt}
              fill
              className="  object-cover object-top rounded-none"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ delay: 0.08 }}
            className="flex flex-col gap-6 bg-[#FFFFFF0F] h-full  px-6 py-10"
          >
            <h2 className="font-inter text-[28px] font-semibold leading-[60px] text-white md:text-4xl lg:text-[44px]">
              {content.sectionTitle}
            </h2>

            <div className="space-y-4 text-base leading-7 tracking-[1%] font-normal text-[#FFFFFF] md:text-lg">
              {content.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <p className="text-base font-medium leading-7 tracking-[1%]  mt-6 text-[#0094DB] md:text-lg">
              {content.technologies.join(", ")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
