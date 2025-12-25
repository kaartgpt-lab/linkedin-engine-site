import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface InfiniteCarouselProps {
  items: string[];
}

const InfiniteCarousel = ({ items }: InfiniteCarouselProps) => {
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#E8F0FF] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#E8F0FF] to-transparent z-10" />
      
      <motion.div
        className="flex gap-4"
        animate={{
          x: [0, '-50%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          },
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md whitespace-nowrap flex-shrink-0"
          >
            <div className="bg-[#4A7CFF] rounded-full p-1">
              <Check size={14} className="text-white" />
            </div>
            <span className="text-[#1A1F36] font-medium text-sm">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteCarousel;
