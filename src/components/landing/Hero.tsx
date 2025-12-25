import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InfiniteCarousel from './InfiniteCarousel';
import { TextFlip } from '../ui/text-flip';
// import { BackgroundRipple } from '../ui/background-ripple';
import { GridBackground } from '../ui/grid-background';

const Hero = () => {
  const navigate = useNavigate();

  const carouselItems = [
    '1-Click Strategy',
    'No generic templates',
    'Learns your voice',
    'Anti-Cringe',
    'Define Roles',
    'Tone Voice',
    'Smart Balance',
    'Zero Cringe',
  ];

  const flipWords = [
    'one by one.',
    'randomly.',
    'without strategy.',
    'like everyone else.',
  ];
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Grid Background */}
      <GridBackground />
      
      {/* Background Ripple Effect */}
      {/* <BackgroundRipple /> */}
      
      {/* Floating Background Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-10 w-32 h-32 bg-[#4A7CFF]/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-[#4A7CFF]/10 rounded-full blur-3xl"
      />

      <div className="max-w-[1200px] mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-[#F0F4FF] text-[#4A7CFF] px-6 py-2 rounded-full font-semibold text-sm mb-8"
        >
          <Quote size={10} />
          For Serious Builders
          <Quote size={10} className="rotate-180" />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6 flex flex-col items-center"
        >
          <h1 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="block mb-2 text-[#1A1F36]">Stop writing posts</span>
            <span className="block text-center">
              <TextFlip words={flipWords} className="text-[#4A7CFF]" />
            </span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-l md:text-xl text-[#6B7280] mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          You are too busy to wake up and ask, "What should I post today?" Calyn builds a full 30-day plan for you in
          minutes, based on your actual goals, not random viral templates.
        </motion.p>


        {/* Infinite Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mb-8"
        >
          <InfiniteCarousel items={carouselItems} />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/register')}
          className="bg-gradient-to-r from-[#4A7CFF] to-[#6B8FFF] text-white px-7 py-3 rounded-full font-bold md:text-lg shadow-2xl hover:shadow-3xl transition-all"
        >
          Build My Plan
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
