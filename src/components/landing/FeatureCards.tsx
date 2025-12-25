import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Power, Wrench, Settings } from 'lucide-react';

const features = [
  {
    icon: Power,
    title: 'It learns your voice',
    description: 'We analyze your past posts and beliefs so the AI sounds like you, not a bot.',
  },
  {
    icon: Wrench,
    title: 'Perfect Balance',
    description: "Don't post randomly. We mix your product updates and personal stories perfectly.",
  },
  {
    icon: Settings,
    title: 'A Full Month, Done',
    description: 'Get 30 days of content ready to go. Hooks, drafts, and image ideas included.',
  },
];

const FeatureCards = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)' }}
              className="bg-white rounded-2xl p-10 shadow-lg transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-[#4A7CFF] rounded-full w-16 h-16 flex items-center justify-center mb-6"
              >
                <feature.icon size={32} className="text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#1A1F36] mb-4">{feature.title}</h3>
              <p className="text-[#6B7280] text-lg leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
