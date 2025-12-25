import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Quote } from 'lucide-react';

const faqs = [
 {
    question: "Why shouldn't I just use ChatGPT?",
    answer: "ChatGPT gives you text. Calyn gives you a Strategy. ChatGPT doesn't know you need to balance your \"Agency\" role (to pay bills) with your \"SaaS\" role (to build equity). We handle the math and the balance; ChatGPT just writes words."
  },
  {
    question: "I hate 'personal branding' and 'influencers.' Is this for me?",
    answer: "Yes. In fact, we built this for you. Calyn isn't about chasing likes or doing \"engagement farming.\" It's about documenting your work. We help you turn your product updates and engineering struggles into content that attracts investors and talent, not just random followers."
  },
  {
    question: "I have an agency AND a side project. Can I talk about both?",
    answer: "100%. That's actually why we built this. Most tools force you to be one \"niche.\" We let you set up multiple roles like \"Employee\" and \"Indie Hacker\") and we balance them for you so you don't confuse your network."
  },
  {
    question: "Can't I just hire a ghostwriter?",
    answer: "You could pay $2,000/month for a writer who doesn't really understand your code or your business. Or you can use Calyn for free (in beta) to build a \"Voice Profile\" that actually sounds like you because it's trained on your beliefs."
  },
  {
    question: "How does the \"Weighting\" thing actually work?",
    answer: "It's just simple math. If you tell us your Startup is \"High Importance\" and your Consulting gig is \"Low Importance,\" we automatically make sure your Startup shows up in 60-70% of your posts. You don't have to count the days manually."
  },
  {
    id: 6,
    question: "Can I edit the posts?",
    answer: "Absolutely. Our editor is built for speed. If a post feels too long, just click \"Shorten.\" If it feels too boring, click \"Make it Punchy.\" It's much faster than rewriting it from scratch."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="faq" ref={ref} className="py-20 px-6 bg-white/50">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#F0F4FF] text-[#4A7CFF] px-6 py-2 rounded-full font-semibold text-sm mb-6"
          >
            <Quote size={16} />
            FAQ
            <Quote size={16} className="rotate-180" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-[#1A1F36] mb-4"
          >
            Common Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-[#6B7280]"
          >
            Everything you need to know before you start.
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-[#1A1F36] pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <Plus size={24} className="text-[#4A7CFF]" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-[#6B7280] leading-relaxed">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#4A7CFF] to-[#6B8FFF] text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
