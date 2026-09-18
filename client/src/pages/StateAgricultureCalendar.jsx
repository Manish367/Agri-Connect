import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import Select from '../components/Select';
import { INDIAN_STATES } from '../constants/indianStates';
import { STATE_MONUMENTS, hiRes } from '../data/stateMonuments';
import { STATE_CROPS, FALLBACK_CROPS, SEASON_MONTHS } from '../data/stateCrops';
import { getSeasonImages } from '../data/farmActivityImages';
import { CROP_PRACTICES, DEFAULT_PRACTICE } from '../data/cropPractices';

const SEASONS = ['Kharif', 'Rabi', 'Zaid'];
const seasonTheme = {
  Kharif: { gradient: 'from-leaf-600 to-leaf-800', icon: '🌧️', label: 'Kharif (Monsoon)' },
  Rabi: { gradient: 'from-sky-600 to-sky-800', icon: '❄️', label: 'Rabi (Winter)' },
  Zaid: { gradient: 'from-amber-500 to-amber-700', icon: '☀️', label: 'Zaid (Summer)' },
};

function MonumentHero({ state }) {
  const monuments = STATE_MONUMENTS[state];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [state]);

  useEffect(() => {
    if (!monuments) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % monuments.length), 4000);
    return () => clearInterval(timer);
  }, [monuments]);

  if (!monuments) {
    return (
      <div className="relative flex h-[380px] w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-leaf-600 via-sky-600 to-earth-600 sm:h-[460px]">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative text-center text-white">
          <h2 className="font-display text-4xl font-extrabold sm:text-5xl">{state}</h2>
          <p className="mt-3 text-white/80">Monument gallery coming soon for this state.</p>
        </div>
      </div>
    );
  }

  const current = monuments[index];

  return (
    <div className="relative h-[380px] w-full overflow-hidden rounded-3xl shadow-2xl sm:h-[460px]">
      <motion.img
        key={`${state}-${index}-img`}
        src={hiRes(current.image)}
        alt={current.name}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

      <div className="absolute left-0 right-0 top-6 text-center">
        <h2 className="font-display text-4xl font-extrabold text-white drop-shadow-lg sm:text-5xl">{state}</h2>
        <p className="mt-1 text-sm font-medium text-white/80">Agriculture through the seasons</p>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <motion.div
          key={`${state}-${index}-caption`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display text-2xl font-bold text-white">{current.name}</p>
          <p className="text-sm text-white/80">📍 {current.city}</p>
        </motion.div>

        <div className="mt-4 flex gap-2">
          {monuments.map((m, i) => (
            <button
              key={m.name}
              onClick={() => setIndex(i)}
              className={`h-1.5 flex-1 rounded-full transition-all ${i === index ? 'bg-white' : 'bg-white/30'}`}
              aria-label={`Show ${m.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CropInfoModal({ crop, onClose }) {
  const practice = CROP_PRACTICES[crop] || DEFAULT_PRACTICE;
  const rows = [
    ['🌱 Sowing', practice.sowing],
    ['💧 Water', practice.water],
    ['🧑‍🌾 Care', practice.care],
    ['🌾 Harvest', practice.harvest],
  ];

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
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-earth-900">🌾 {crop}</h3>
          <button onClick={onClose} className="text-earth-500 hover:text-earth-800">
            ✕
          </button>
        </div>
        <div className="space-y-3">
          {rows.map(([label, text]) => (
            <div key={label} className="rounded-xl bg-leaf-50 p-3">
              <p className="text-xs font-semibold uppercase text-leaf-700">{label}</p>
              <p className="mt-1 text-sm text-earth-700">{text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function SeasonSection({ season, index, crops, onCropClick }) {
  const theme = seasonTheme[season];
  const images = getSeasonImages(index);

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="mb-12"
    >
      <motion.div variants={fadeUp} className={`rounded-2xl bg-gradient-to-r ${theme.gradient} px-6 py-4 text-white shadow-lg`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display flex items-center gap-2 text-2xl font-bold">
            <span>{theme.icon}</span> {theme.label}
          </h3>
          <span className="text-sm font-medium text-white/80">{SEASON_MONTHS[season]}</span>
        </div>
      </motion.div>

      <motion.p variants={fadeUp} className="mt-3 text-sm text-earth-500">
        Tap a crop to see how it's typically sown, watered, cared for and harvested.
      </motion.p>

      <motion.div variants={fadeUp} className="mt-2 flex flex-wrap gap-2">
        {crops.map((crop) => (
          <button
            key={crop}
            onClick={() => onCropClick(crop)}
            className="rounded-full border border-leaf-200 bg-leaf-50 px-4 py-1.5 text-sm font-semibold text-leaf-700 transition hover:-translate-y-0.5 hover:bg-leaf-100 hover:shadow-sm"
          >
            🌾 {crop}
          </button>
        ))}
      </motion.div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.map((src, i) => (
          <motion.img
            key={src + i}
            variants={fadeUp}
            src={src}
            alt={`${season} agriculture activity`}
            loading="lazy"
            className="h-32 w-full rounded-xl object-cover shadow-sm sm:h-40"
          />
        ))}
      </div>
    </motion.section>
  );
}

export default function StateAgricultureCalendar() {
  const [state, setState] = useState('Bihar');
  const [activeCrop, setActiveCrop] = useState(null);
  const crops = STATE_CROPS[state] || FALLBACK_CROPS;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <PageHeader
          icon="🗓️"
          title="State Agriculture Calendar"
          subtitle="Explore each state's landmarks and its farming year, season by season."
        />
        <div className="w-full sm:w-64">
          <Select label="Select a state" value={state} onChange={(e) => setState(e.target.value)}>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <MonumentHero state={state} />
      </motion.div>

      <div className="mt-12">
        {SEASONS.map((season, i) => (
          <SeasonSection
            key={`${state}-${season}`}
            season={season}
            index={i}
            crops={crops[season]}
            onCropClick={setActiveCrop}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeCrop && <CropInfoModal crop={activeCrop} onClose={() => setActiveCrop(null)} />}
      </AnimatePresence>
    </div>
  );
}
