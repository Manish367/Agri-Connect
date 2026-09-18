import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import AnimatedPage from '../components/AnimatedPage';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';

export default function SmartIrrigation() {
  const { t } = useTranslation();
  const [options, setOptions] = useState({ crops: [], soilTypes: [] });
  const [form, setForm] = useState({ crop: '', soilType: '', location: 'New Delhi' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/irrigation/options');
      setOptions(data);
      setForm((f) => ({ ...f, crop: data.crops[0], soilType: data.soilTypes[0] }));
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post('/irrigation/recommend', form);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get irrigation advice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <PageHeader
        icon="💧"
        title={t('pages.irrigation.title')}
        subtitle={t('pages.irrigation.subtitle')}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card hover={false} className="lg:col-span-2">
          {error && <div className="mb-4 rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select label={t('fields.crop')} value={form.crop} onChange={(e) => setForm({ ...form, crop: e.target.value })}>
              {options.crops.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            <Select label={t('fields.soilType')} value={form.soilType} onChange={(e) => setForm({ ...form, soilType: e.target.value })}>
              {options.soilTypes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
            <Input
              label="Farm location"
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Pune"
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Checking...' : 'Get Irrigation Advice'}
            </Button>
          </form>
        </Card>

        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key={result.crop + result.soilType}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div
                  className={`rounded-3xl p-8 text-white shadow-xl ${
                    result.irrigateToday
                      ? 'bg-gradient-to-br from-sky-500 to-leaf-600'
                      : 'bg-gradient-to-br from-earth-500 to-earth-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80">Today's recommendation</p>
                      <h2 className="font-display text-3xl font-bold">
                        {result.irrigateToday ? '💧 Irrigate Today' : '⏸️ Hold Off'}
                      </h2>
                    </div>
                    <span className="text-5xl">{result.irrigateToday ? '💧' : '🌤️'}</span>
                  </div>
                  <p className="mt-4 text-white/90">{result.reason}</p>
                  {result.irrigateToday && (
                    <div className="mt-5 rounded-2xl bg-white/15 p-4 backdrop-blur">
                      <p className="text-xs font-semibold uppercase text-white/70">Recommended amount</p>
                      <p className="font-display text-2xl font-bold">
                        {result.recommendedLitersPerAcre.toLocaleString('en-IN')} L/acre
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-leaf-100 bg-white p-4">
                    <p className="text-xs font-semibold uppercase text-earth-500">Crop Water Need</p>
                    <p className="font-display mt-1 text-lg font-bold text-leaf-700">{result.waterNeedLevel}</p>
                  </div>
                  <div className="rounded-2xl border border-leaf-100 bg-white p-4">
                    <p className="text-xs font-semibold uppercase text-earth-500">Weather</p>
                    <p className="mt-1 text-sm text-earth-700">
                      {Math.round(result.weather.temperature)}°C, {Math.round(result.weather.humidity)}% humidity,{' '}
                      {Math.round(result.weather.rainChancePercent)}% rain chance
                      {result.weather.source === 'mock' && ' (sample data)'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/40 p-8 text-center text-earth-500">
                <span className="mb-3 text-5xl">💧</span>
                Fill in the form to get today's irrigation advice.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimatedPage>
  );
}
