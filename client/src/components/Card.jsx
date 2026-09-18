import { motion } from 'framer-motion';

export default function Card({ children, className = '', delay = 0, hover = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-2xl border border-leaf-100 bg-white/90 p-5 shadow-sm ${
        hover ? 'card-hover' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
