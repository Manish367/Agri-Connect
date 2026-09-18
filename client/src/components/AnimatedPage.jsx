import { motion } from 'framer-motion';

export default function AnimatedPage({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
