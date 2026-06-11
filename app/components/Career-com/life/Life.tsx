"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import '../../About-com/milestone/vision.css'
import "swiper/css";
import "swiper/css/effect-coverflow";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";

import "swiper/css";
import VisionSlider from "../../About-com/milestone/Visionslider";

interface Milestone {
  _id: string;
  image: string;
  order: number;
}

interface LifeProps {
  milestones?: Milestone[];
}

export default function MilestoneCelebration({ milestones = [] }: LifeProps) {
    return (
        <section className="bg-black py-16 md:pb-28">
            <div className="mx-auto max-w-full ">
                <div className=" flex md:flex-row flex-col  w-full" >
                    {/* Heading */}
                    <div className="mb-10 text-start text-white px-4  sm:px-6 md:w-6/10 w-full">
                        <h2 className="mb-3 text-[25px] mx-auto sm:text-xl md:text-4xl lg:text-[44px] font-semibold font-inter text-white lg:leading-[60px] md:leading-[50px] leading-[32px]  max-w-4xl">
                            Life at Technogetic
                        </h2>
                        <p className=" max-w-2xl text-base  text-[#FFFFFF]   leading-[28px] tracking-[1%]">
                            We promote creativity, teamwork, and continuous improvement. Whether working remotely or in-office, our team thrives on solving complex challenges, sharing ideas openly, and building technology that creates measurable business impact.
                        </p>
                    </div>

                    {/* social media session  */}
                    <div className="flex flex-row px-4 md:w-4/10 w-full">
                        {/* Social Buttons */}
                        <div className="flex lg:flex-row md:flex-col  gap-2 w-full justify-center items-center">
                            <a
                                href="#"
                                className=" h-[40px] flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                            >
                                Linkedin in <FaLinkedinIn />
                            </a>

                            <a
                                href="#"
                                className=" h-[40px] flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
                            >
                                Instagram  <FaInstagram />
                            </a>

                            <a
                                href="#"
                                className=" h-[40px] flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition"
                            >
                                Facebook    <FaFacebookF />
                            </a>
                        </div>
                    </div>
                </div>



                <VisionSlider milestones={milestones} />


            </div>
        </section>
    );
}
