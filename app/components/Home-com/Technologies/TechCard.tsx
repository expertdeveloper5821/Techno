import Image from 'next/image';
import { memo } from 'react';

interface Tech {
  name: string;
  logo: string;
  description: string;
}

const TechCard = memo(function TechCard({ tech }: { tech: Tech }) {
  return (
    <div className="bg-[#ffffff05]   md:w-[500px] w-[500px] border border-[#282926] p-4 rounded-lg flex items-start gap-5 hover:border-white/10 hover:bg-[#1a1a1a] transition-all duration-300 h-full group cursor-pointer">
      {/* Logo Box */}
      <div className="w-14 h-14  bg-[#222] rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
        <Image 
          src={tech.logo} 
          alt={tech.name} 
          width={32} 
          height={32} 
          className="w-8 h-8 object-contain"
          sizes="32px"
          loading="lazy"
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-col w-[70%] ">
        <h3 className="text-[#F6F7F7] font-Manrope  text-xl mb-2 group-hover:text-blue-400 transition-colors">
          {tech.name}
        </h3>
        <p className=" font-inter text-[#BCBDB9] text-base  leading-relaxed">
          {tech.description}
        </p>
      </div>
    </div>
  );
});

export default TechCard;