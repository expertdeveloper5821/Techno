
"use client"
import Image from 'next/image'
import ChevronRightIcon from '@/app/lib/icon/chevron-right-icon'
import { motion } from 'framer-motion'
import { parallaxVariants } from '@/app/lib/animations'
function Contact() {
  return (
    <>

      <section
        className="relative overflow-hidden  flex flex-col justify-start lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10 bg-[#0a0a0a] "

      >



        <div className="w-full flex  flex-col gap-0 lg:gap-0   mx-auto  px-4 sm:px-6 lg:px-6 ">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
            variants={parallaxVariants}
          >

            <div className="mx-auto overflow-hidden relative w-full flex flex-col items-center  gap-0 md:flex-row bg-[#0094DB]  rounded-2xl ">
              <div className='absolute w-full h-full' >
                <Image
                  src="/About/hero/hero.svg"
                  alt="Hero illustration"
                  width={600}
                  height={400}
                  className='w-full h-full object-cover '
                  loading="lazy"
                  sizes="100vw"
                />
              </div>
              {/* Left Content */}
              <div className=" text-white p-10 lg:pr-0">
                <h2 className="mb-4 text-2xl font-semibold  md:leading-snug leading-[30px] md:text-4xl  lg:text-[44px]">
                  Let’s Build Solutions That Drive Real Business Impact
                </h2>

                <p className="mb-6 text-base sm:text-[20px] text-white/90 md:text-base leading-relaxed">
                  Tell us about your idea, and our experts will help you bring it to life.
                </p>

                <a
                  href="#services"
                  className="group shrink-0 inline-flex items-center justify-center gap-2 sm:px-8  sm:py-3.5 px-4 py-2 text-base font-semibold text-[#000000] bg-white rounded-full hover:bg-white/95 transition-all duration-200 shadow-lg whitespace-nowrap mt-0"
                >
                  Get a Free Consultation <ChevronRightIcon width={7} height={11} color="#000000" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
                </a>
              </div>

              {/* Right Image */}
              <div className="relative h-[260px] w-full max-w-[320px] md:h-[400px] md:max-w-[380px] lg:block hidden  ">
                <Image
                  src="/About/contact/contact.webp" // replace with your actual image path
                  alt="Customer support representative"
                  fill
                  className="object-fill pt-10 pr-10 h-full"
                  loading="lazy"
                  sizes="(max-width: 768px) 0px, (max-width: 1024px) 320px, 380px"
                />
              </div>
            </div>
            </motion.div>
        </div>
       
      </section>

    </>
  )
}

export default Contact