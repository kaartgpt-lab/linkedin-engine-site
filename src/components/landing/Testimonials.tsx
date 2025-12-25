import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Henki',
    role: 'customers',
    quote: 'Streamlined our workflow instantly. Highly recommend!',
    image: 'https://framerusercontent.com/images/7ckekOZAa0J28C2T3IfYTvNDv5U.jpg?scale-down-to=1024&width=3744&height=5616',
  },
  {
    name: 'Wedly',
    role: 'CEO Founder',
    quote: 'Expert guidance, exceptional results. They delivered.',
    image: 'https://framerusercontent.com/images/ATdqAfiJi00GYDOvVfF7D1LTm0Y.jpg?width=319&height=479',
  },
  {
    name: 'Biesa',
    role: 'Designer',
    quote: 'Saved us time and money. Worth every penny.',
    image: 'https://framerusercontent.com/images/bzl9vAWsj1kC8ho9yBMW8p4Y8.jpg?scale-down-to=1024&width=4516&height=5622',
  },
  {
    name: 'Leopas',
    role: 'UI Designer',
    quote: 'Smart seamless integration and top-notch support.',
    image: 'https://framerusercontent.com/images/2Lfz0Sx0xA6ucClIiedtMk0KLE.jpg?scale-down-to=1024&width=3932&height=5898',
  },
  {
    name: 'Bineme',
    role: 'Marketing',
    quote: 'Transformed our processes. Incredibly efficient.',
    image: 'https://framerusercontent.com/images/XAXky8viJ2RPAMkOQhRPSp2YMw.jpg?scale-down-to=512&width=6000&height=4000',
  },
  {
    name: 'Luxuise',
    role: 'Developer',
    quote: 'Best User-friendly and powerful. A game-changer.',
    image: 'https://framerusercontent.com/images/vdGdCVp2nFk5Ql6kIBIap18DVyM.jpg?scale-down-to=1024&width=2016&height=3024',
  },
];

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="testimonials" ref={ref} className="py-20 px-6">
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
            Testimonials
            <Quote size={16} className="rotate-180" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-[#1A1F36] mb-4"
          >
            Hear from Our Users
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-[#6B7280] max-w-2xl mx-auto"
          >
            Read how our users have achieved success and improved their skills with Butun courses.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)' }}
              className="bg-white rounded-2xl p-8 shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4 ">
                {testimonial.image.startsWith('http') ? (
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover "
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4A7CFF] to-[#6B8FFF] rounded-full flex items-center justify-center text-3xl">
                    {testimonial.image}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-[#1A1F36] text-lg">{testimonial.name}</h4>
                  <p className="text-[#6B7280] text-sm">{testimonial.role}</p>
                </div>
              </div>

              <p className="text-[#6B7280] mb-4 leading-relaxed">"{testimonial.quote}"</p>

              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    animate={{
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <Star size={20} className="text-orange-400 fill-orange-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
