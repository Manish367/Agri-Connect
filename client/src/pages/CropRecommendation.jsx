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

export default function CropRecommendation() {
  const { t } = useTranslation();
  const [options, setOptions] = useState({ seasons: [], soilTypes: [] });
  const [form, setForm] = useState({ soilType: '', season: '', temperature: '', rainfall: '' });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/crops/options');
      setOptions(data);
      setForm((f) => ({ ...f, soilType: data.soilTypes[0], season: data.seasons[0] }));
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setResults(null);
    try {
      const { data } = await api.post('/crops/recommend', {
        ...form,
        temperature: Number(form.temperature),
        rainfall: Number(form.rainfall),
      });
      setResults(data.recommendations);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get recommendation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <PageHeader
        icon="🌱"
        title={t('pages.crops.title')}
        subtitle={t('pages.crops.subtitle')}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card hover={false} className="lg:col-span-2">
          {error && <div className="mb-4 rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select
              label={t('fields.soilType')}
              value={form.soilType}
              onChange={(e) => setForm({ ...form, soilType: e.target.value })}
            >
              {options.soilTypes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
            <Select label={t('fields.season')} value={form.season} onChange={(e) => setForm({ ...form, season: e.target.value })}>
              {options.seasons.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
            <Input
              label={t('fields.temperature')}
              type="number"
              required
              value={form.temperature}
              onChange={(e) => setForm({ ...form, temperature: e.target.value })}
              placeholder="28"
            />
            <Input
              label={t('fields.rainfall')}
              type="number"
              required
              value={form.rainfall}
              onChange={(e) => setForm({ ...form, rainfall: e.target.value })}
              placeholder="900"
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Analyzing...' : 'Get Recommendation'}
            </Button>
          </form>
        </Card>

        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {results ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {results.map((r, i) => (
                  <motion.div
                    key={r.crop}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="card-hover flex items-center gap-4 rounded-2xl border border-leaf-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-leaf-100 text-2xl font-bold text-leaf-700">
                      #{i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-earth-900">{r.crop}</h3>
                      <div className="mt-1 flex flex-wrap gap-x-6 gap-y-1 text-sm text-earth-600">
                        <span>📦 Yield: {r.expectedYield}</span>
                        <span>💧 Water: {r.waterRequirement}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium text-earth-500">Match Score</div>
                      <div className="font-display text-xl font-bold text-leaf-600">{r.matchScore}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/40 p-8 text-center text-earth-500">
                <span className="mb-3 text-5xl">🌾</span>
                Fill in the form to see crop recommendations.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimatedPage>
  );
}
