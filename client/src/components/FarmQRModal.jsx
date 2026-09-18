import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';

export default function FarmQRModal({ farm, onClose }) {
  const record = [
    `Farm: ${farm.name}`,
    `Area: ${farm.area} acres`,
    `Soil: ${farm.soilType}`,
    `Location: ${[farm.location?.village, farm.location?.district, farm.location?.state].filter(Boolean).join(', ') || 'N/A'}`,
    `Farm ID: ${farm._id}`,
  ].join('\n');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display font-semibold text-earth-900">📱 Farm Record QR</h3>
          <button onClick={onClose} className="text-earth-500 hover:text-earth-800">
            ✕
          </button>
        </div>
        <div className="flex justify-center rounded-xl bg-leaf-50 p-5">
          <QRCodeSVG value={record} size={200} fgColor="#166534" bgColor="#f0fdf4" level="M" />
        </div>
        <p className="mt-4 text-sm text-earth-600">
          Scan to view <strong>{farm.name}</strong>&apos;s details — area, soil type and location — offline.
        </p>
      </motion.div>
    </motion.div>
  );
}
