import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import AnimatedPage from '../components/AnimatedPage';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import SelectWithOther from '../components/SelectWithOther';
import { INDIAN_STATES } from '../constants/indianStates';

export default function MarketPrices() {
  const { t } = useTranslation();
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [crop, setCrop] = useState('');
  const [state, setState] = useState('');
  const [cropOptions, setCropOptions] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/crops/options');
      setCropOptions(data.crops || []);
    })();
  }, []);

  const load = async () => {
    setLoading(true);
    const { data } = await api.get('/market-prices', { params: { crop, state } });
    setPrices(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(load, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crop, state]);

  return (
    <AnimatedPage>
      <PageHeader icon="📈" title={t('pages.market.title')} subtitle={t('pages.market.subtitle')} />

      <Card hover={false} className="mb-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectWithOther
            label="Filter by crop"
            value={crop}
            onChange={setCrop}
            options={cropOptions}
            allLabel="All crops"
            otherPlaceholder="Type a crop name..."
          />
          <SelectWithOther
            label="Filter by state"
            value={state}
            onChange={setState}
            options={INDIAN_STATES}
            allLabel="All states"
            otherPlaceholder="Type a state name..."
          />
        </div>
      </Card>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-leaf-200 border-t-leaf-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {prices.map((p, i) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.4) }}
              className="card-hover rounded-2xl border border-leaf-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-earth-900">{p.crop}</h3>
                <span className="text-2xl">🌾</span>
              </div>
              <p className="mt-1 text-sm text-earth-500">
                {p.market}, {p.state}
              </p>
              <p className="mt-3 font-display text-2xl font-bold text-leaf-600">
                ₹{p.pricePerQuintal.toLocaleString('en-IN')}
                <span className="ml-1 text-sm font-normal text-earth-500">/ {p.unit}</span>
              </p>
            </motion.div>
          ))}
          {prices.length === 0 && (
            <div className="col-span-full rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/50 p-10 text-center text-earth-600">
              No prices match your filters.
            </div>
          )}
        </div>
      )}
    </AnimatedPage>
  );
}
