import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, BarChart3, Target, Bell, Radio, Mail, Quote } from 'lucide-react';

const features = [
  {
    icon: User,
    title: 'Mix Your Roles',
    description: 'You wear many hats. We help you talk about your Startup, Agency, and life without sounding random.',
  },
  {
    icon: BarChart3,
    title: 'Smart Balance',
    description: 'Want to prioritize your "Founder" role over your "Agency" role this month? Just adjust the slider.',
  },
  {
    icon: Target,
    title: 'Stay Focused',
    description: 'Not topics like "Hiring" or "Building." We make sure you stick to them consistently.',
  },
  {
    icon: Bell,
    title: 'Your True Voice',
    description: 'We learn your tone and beliefs so you never sound like a generic AI bot.',
  },
  {
    icon: Radio,
    title: 'Fix It Fast',
    description: 'Use our editor to "Make It Punchy" or "Make It Raw" in one click.',
  },
  {
    icon: Mail,
    title: 'Zero Cringe',
    description: 'We block "guru" words and corporate jargon so you never look foolish.',
  },
];

const FeaturesGrid = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" ref={ref} className="py-20 px-6 bg-white/50">
      
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#F0F4FF] text-[#4A7CFF] px-6 py-2 rounded-full font-semibold text-sm mb-6"
          >
            <Quote size={16} />
            Features
            <Quote size={16} className="rotate-180" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-[#1A1F36] mb-4"
          >
            Turn your messy thoughts into a system.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-[#6B7280] max-w-2xl mx-auto"
          >
            The first AI tool built for founders who hate "marketing fluff."
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-[#4A7CFF] rounded-full w-12 h-12 flex items-center justify-center mb-4"
              >
                <feature.icon size={24} className="text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-[#1A1F36] mb-3">{feature.title}</h3>
              <p className="text-[#6B7280] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
