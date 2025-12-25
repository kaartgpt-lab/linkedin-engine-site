import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface FloatingDockProps {
  items: Array<{
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
  }>;
}

export const FloatingDock = ({ items }: FloatingDockProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-end gap-4 rounded-full bg-white/80 backdrop-blur-lg px-4 py-3 shadow-lg border border-gray-200/50"
    >
      {items.map((item, idx) => (
        <DockIcon key={idx} mouseX={mouseX} {...item} />
      ))}
    </motion.div>
  );
};

function DockIcon({
  mouseX,
  title,
  icon,
  onClick,
}: {
  mouseX: any;
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.button
      ref={ref}
      style={{ width }}
      onClick={onClick}
      className="aspect-square rounded-full bg-gradient-to-br from-[#4A7CFF] to-[#6B8FFF] flex items-center justify-center text-white hover:shadow-lg transition-shadow relative group"
    >
      {icon}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {title}
      </span>
    </motion.button>
  );
}
