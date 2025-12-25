import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    { text: '30-Day Strategy Engine', enabled: true },
    { text: 'Deep Context Brain', enabled: true },
    { text: 'Smart Role Weighting', enabled: true },
    { text: 'Anti-Cringe Protection', enabled: true },
    { text: 'LinkedIn Auto-Scheduling', enabled: false },
  ];

  return (
    <section id="pricing" ref={ref} className="py-20 px-6 bg-white/50">
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
            Pricing
            <Quote size={16} className="rotate-180" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-[#1A1F36] mb-4"
          >
            Simple pricing for builders.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-[#6B7280] max-w-2xl mx-auto"
          >
            We are currently in private beta. Get full access for free while we refine the engine.
          </motion.p>
        </div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
          className="max-w-md mx-auto"
        >
          <motion.div
            whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
            className="bg-white rounded-3xl p-10 shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#1A1F36]">Founder Edition</h3>
              <div className="bg-[#F0F4FF] text-[#4A7CFF] px-4 py-1 rounded-full text-sm font-semibold">
                Beta Access
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold text-[#1A1F36]">$0</span>
                <span className="text-[#6B7280]">*billed monthly</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/register')}
              className="w-full bg-gradient-to-r from-[#4A7CFF] to-[#6B8FFF] text-white py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all mb-8"
            >
              Request Access
            </motion.button>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`rounded-full p-1 flex-shrink-0 ${
                      feature.enabled ? 'bg-[#4A7CFF]' : 'bg-gray-300'
                    }`}
                  >
                    {feature.enabled ? (
                      <Check size={16} className="text-white" />
                    ) : (
                      <X size={16} className="text-white" />
                    )}
                  </div>
                  <span
                    className={`${
                      feature.enabled ? 'text-[#1A1F36]' : 'text-[#6B7280] line-through'
                    } font-medium`}
                  >
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
