import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={ref} className="bg-white py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="text-2xl font-bold text-[#1A1F36] mb-4">CALYN</div>
            <p className="text-[#6B7280] leading-relaxed">
              Built for founders who have a product to build, not just a feed to fill. Stop writing random posts.
              Start architecting your reputation.
            </p>
          </motion.div>

          {/* Column 2 - Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-bold text-[#1A1F36] mb-4">Pages</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-[#6B7280] hover:text-[#4A7CFF] transition-colors hover:underline"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-[#6B7280] hover:text-[#4A7CFF] transition-colors hover:underline"
                >
                  Pricing
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Column 3 - Resources & Utility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-bold text-[#1A1F36] mb-4">Resources</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#4A7CFF] transition-colors hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#4A7CFF] transition-colors hover:underline">
                  Blog
                </a>
              </li>
            </ul>
            <h4 className="font-bold text-[#1A1F36] mb-4">Utility Pages</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#4A7CFF] transition-colors hover:underline">
                  Privacy Policy
                </a>
              </li>
              
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-gray-200 text-center"
        >
          <p className="text-[#6B7280] text-sm">© 2024 Calyn. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
