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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6"
    >
      <div
        className={`max-w-[900px] w-full transition-all duration-300 rounded-full px-12 py-2 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-lg'
            : 'bg-white/80 backdrop-blur-md shadow-md'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-[#1A1F36]">CALYN</div>

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
          <button
            className="md:hidden text-[#1A1F36]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 flex flex-col gap-4"
          >
            <button
              onClick={() => scrollToSection('features')}
              className="text-[#1A1F36] hover:text-[#4A7CFF] transition-colors text-left"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-[#1A1F36] hover:text-[#4A7CFF] transition-colors text-left"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-[#1A1F36] hover:text-[#4A7CFF] transition-colors text-left"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-[#1A1F36] hover:text-[#4A7CFF] transition-colors text-left"
            >
              FAQ
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-[#4A7CFF] to-[#6B8FFF] text-white px-6 py-3 rounded-full font-semibold"
            >
              Build My Plan
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
