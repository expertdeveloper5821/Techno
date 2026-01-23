import Image from 'next/image';


export default function TechCard({ tech }: { tech: { name: string; logo: string; description: string } }) {
  return (
    <div className="bg-[#151515] border border-white/5 p-6 rounded-lg flex items-start gap-5 hover:border-white/10 hover:bg-[#1a1a1a] transition-all duration-300 h-full group cursor-pointer">
      {/* Logo Box */}
      <div className="w-14 h-14 bg-[#222] rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
        <Image 
          src={tech.logo} 
          alt={tech.name} 
          width={32} 
          height={32} 
          className="w-8 h-8 object-contain"
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-col">
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors">
          {tech.name}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {tech.description}
        </p>
      </div>
    </div>
  );
}