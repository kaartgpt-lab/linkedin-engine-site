import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-6"
      >
        <div
          className={`max-w-[900px] w-full transition-all duration-300 rounded-full px-8 py-2 ${
            scrolled
              ? 'bg-white/90 backdrop-blur-lg shadow-lg'
              : 'bg-white/80 backdrop-blur-md shadow-md'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="text-2xl text-[#1A1F36]">CALYN</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('features')}
                className="text-[#1A1F36] hover:text-[#4A7CFF] transition-colors font-medium px-4 py-2 rounded-full hover:bg-[#F0F4FF]"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-[#1A1F36] hover:text-[#4A7CFF] transition-colors font-medium px-4 py-2 rounded-full hover:bg-[#F0F4FF]"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-[#1A1F36] hover:text-[#4A7CFF] transition-colors font-medium px-4 py-2 rounded-full hover:bg-[#F0F4FF]"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-[#1A1F36] hover:text-[#4A7CFF] transition-colors font-medium px-4 py-2 rounded-full hover:bg-[#F0F4FF]"
              >
                FAQ
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              className="hidden md:block bg-gradient-to-r from-[#4A7CFF] to-[#6B8FFF] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Build My Plan
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden text-[#1A1F36] z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-gradient-to-br from-[#E8F0FF] to-[#F5F9FF] z-40 md:hidden"
        >
          <div className="flex flex-col items-center justify-center h-full px-8">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex flex-col items-center gap-8 w-full max-w-md"
            >
              {/* Menu Items */}
              {[
                { label: 'Features', id: 'features' },
                { label: 'Pricing', id: 'pricing' },
                { label: 'Testimonials', id: 'testimonials' },
                { label: 'FAQ', id: 'faq' },
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-3xl font-bold text-[#1A1F36] hover:text-[#4A7CFF] transition-colors w-full text-center py-3"
                >
                  {item.label}
                </motion.button>
              ))}

              {/* CTA Button */}
              <motion.button
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/register');
                }}
                className="mt-8 bg-gradient-to-r from-[#4A7CFF] to-[#6B8FFF] text-white px-12 py-4 rounded-full font-bold text-xl shadow-2xl w-full"
              >
                Build My Plan
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
