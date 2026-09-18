import { motion } from 'framer-motion';

export default function PageHeader({ icon, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h1 className="font-display flex items-center gap-3 text-3xl font-bold text-earth-900 sm:text-4xl">
        <span>{icon}</span>
        <span className="gradient-text">{title}</span>
      </h1>
      {subtitle && <p className="mt-2 max-w-2xl text-earth-600">{subtitle}</p>}
    </motion.div>
  );
}
