import { motion } from 'framer-motion';

export default function StatCard({ icon, label, value, color = 'leaf', delay = 0 }) {
  const colors = {
    leaf: 'from-leaf-500 to-leaf-600',
    sky: 'from-sky-400 to-sky-600',
    earth: 'from-earth-400 to-earth-600',
    amber: 'from-amber-400 to-amber-600',
    rose: 'from-rose-400 to-rose-600',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay }}
      className={`card-hover rounded-2xl bg-gradient-to-br ${colors[color]} p-5 text-white shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{label}</p>
          <p className="font-display mt-1 text-2xl font-bold">{value}</p>
        </div>
        <span className="text-3xl opacity-90">{icon}</span>
      </div>
    </motion.div>
  );
}
