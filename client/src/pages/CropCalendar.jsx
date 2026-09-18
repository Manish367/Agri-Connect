import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import AnimatedPage from '../components/AnimatedPage';
import PageHeader from '../components/PageHeader';
import Select from '../components/Select';

const SEASONS = ['Kharif', 'Rabi', 'Zaid'];
const seasonColor = {
  Kharif: 'from-leaf-500 to-leaf-600',
  Rabi: 'from-sky-500 to-sky-600',
  Zaid: 'from-amber-500 to-amber-600',
};

export default function CropCalendar() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState([]);
  const [season, setSeason] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await api.get('/calendar', { params: { season } });
      setEntries(data);
      setLoading(false);
    })();
  }, [season]);

  return (
    <AnimatedPage>
      <PageHeader icon="📅" title={t('pages.calendar.title')} subtitle={t('pages.calendar.subtitle')} />

      <div className="mb-6 max-w-xs">
        <Select label="Filter by season" value={season} onChange={(e) => setSeason(e.target.value)}>
          <option value="">All seasons</option>
          {SEASONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-leaf-200 border-t-leaf-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((e, i) => (
            <motion.div
              key={`${e.crop}-${e.season}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.4) }}
              className="card-hover overflow-hidden rounded-2xl border border-leaf-100 bg-white shadow-sm"
            >
              <div className={`bg-gradient-to-r ${seasonColor[e.season]} px-4 py-2 text-sm font-semibold text-white`}>
                {e.season} Season
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold text-earth-900">{e.crop}</h3>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between rounded-lg bg-leaf-50 px-3 py-2">
                    <span className="text-earth-500">🌱 Sowing</span>
                    <span className="font-medium text-earth-800">{e.sowingWindow}</span>
                  </div>
                  <div className="flex justify-between rounded-lg bg-amber-50 px-3 py-2">
                    <span className="text-earth-500">🌾 Harvest</span>
                    <span className="font-medium text-earth-800">{e.harvestWindow}</span>
                  </div>
                  <div className="flex justify-between rounded-lg bg-sky-50 px-3 py-2">
                    <span className="text-earth-500">💧 Water</span>
                    <span className="font-medium text-earth-800">{e.waterRequirement}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatedPage>
  );
}
