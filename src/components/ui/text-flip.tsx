import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TextFlipProps {
  words: string[];
  duration?: number;
  className?: string;
}

export const TextFlip = ({ words, duration = 3000, className = '' }: TextFlipProps) => {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  // Find the longest word to set consistent width
  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b));

  return (
    <span className="relative inline-block text-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 20, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, rotateX: -90 }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
          }}
          className={`block ${className}`}
        >
          {words[currentWord]}
        </motion.span>
      </AnimatePresence>
      {/* Invisible placeholder to maintain consistent width */}
      <span className="invisible block" aria-hidden="true">
        {longestWord}
      </span>
    </span>
  );
};
