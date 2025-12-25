import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Play, Quote } from 'lucide-react';
import InfiniteCarousel from './InfiniteCarousel';

const steps = [
  {
    number: 'Step 1',
    title: 'Dump your brain',
    description: 'Answer a few questions about your roles, your goals, and what you don\'t want to sound like. We build your "Voice Profile" instantly.',
    features: [
      'No templates',
      'Learns your voice',
      'Anti-Cringe',
      'No generic templates',
    ],
    imageType: 'video',
  },
  {
    number: 'Step 2',
    title: 'Set your strategy',
    description: 'Choose your focus. Want to prioritize your "Founder" role over your "Agency" role this month? Just adjust the slider.',
    features: [
      'Set Priorities',
      'No generic templates',
      'Learns your voice',
      '1-Click Strategy',
    ],
    imageType: 'certificate',
  },
  {
    number: 'Step 3',
    title: 'Generate & Launch',
    description: 'Click once to get a full 30-day plan. Tweak any post with our editor, then approve it for publishing.',
    features: [
      'One Click',
      'No generic templates',
      'Learns your voice',
      '1-Click Strategy',
    ],
    imageType: 'video',
  },
];

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const carouselItems = [
    'Learns your voice',
    '1-Click Strategy',
    'Define Roles',
    'Anti-Cringe',
    'Tone Voice',
    'No generic templates',
    'Set Priorities',
    'One Click',
    'Smart Balance',
  ];

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#F0F4FF] text-[#4A7CFF] px-6 py-2 rounded-full font-semibold text-sm mb-6"
          >
            <Quote size={16} />
            How It Works
            <Quote size={16} className="rotate-180" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-[#1A1F36] mb-4"
          >
            From chaos to calendar in 3 steps
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-[#6B7280] mb-8"
          >
            Stop overthinking. Let the system do the heavy lifting.
          </motion.p>

          {/* Infinite Carousel */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <InfiniteCarousel items={carouselItems} />
          </motion.div> */}
        </div>

        {/* Steps */}
        <div className="space-y-32">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-12 items-center`}
            >
              {/* Image/Demo */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
                className="flex-1"
              >
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-[#F0F4FF] text-[#4A7CFF] px-4 py-2 rounded-full font-semibold text-sm">
                      {step.imageType === 'video' ? 'Online Workshops' : 'Creatification'}
                    </div>
                    <div className="bg-black text-white px-4 py-2 rounded-full font-semibold text-sm">
                      AI
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-[#E8F0FF] to-[#F5F9FF] rounded-2xl aspect-video flex items-center justify-center">
                    {step.imageType === 'video' ? (
                      <div className="text-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="bg-[#4A7CFF] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 cursor-pointer"
                        >
                          <Play size={32} className="text-white ml-1" fill="white" />
                        </motion.div>
                        <div className="w-64 h-2 bg-white rounded-full mx-auto">
                          <div className="w-1/3 h-full bg-[#4A7CFF] rounded-full"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-8">
                        <div className="bg-[#4A7CFF] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Check size={32} className="text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-[#1A1F36] mb-2">Creatification Of Completion</h4>
                        <p className="text-[#6B7280] mb-4">This Certifies That</p>
                        <p className="text-lg font-semibold text-[#1A1F36]">Your Name</p>
                        <p className="text-sm text-[#6B7280]">Has Passed Getun Figma Design Creatification</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
                className="flex-1"
              >
                <div className="text-sm text-[#4A7CFF] font-semibold mb-2">{step.number}</div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#1A1F36] mb-4">{step.title}</h3>
                <p className="text-lg text-[#6B7280] mb-6 leading-relaxed">{step.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {step.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.2 + 0.6 + idx * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="bg-[#4A7CFF] rounded-full p-1 flex-shrink-0">
                        <Check size={14} className="text-white" />
                      </div>
                      <span className="text-[#1A1F36] text-sm font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
