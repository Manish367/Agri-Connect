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

export default function FertilizerRecommendation() {
  const { t } = useTranslation();
  const [options, setOptions] = useState({ crops: [], soilTypes: [] });
  const [form, setForm] = useState({ crop: '', soilType: '', n: '', p: '', k: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/fertilizer/options');
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
      const { data } = await api.post('/fertilizer/recommend', form);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get recommendation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <PageHeader
        icon="🧪"
        title={t('pages.fertilizer.title')}
        subtitle={t('pages.fertilizer.subtitle')}
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

            <div className="rounded-xl bg-leaf-50 p-3">
              <p className="mb-2 text-xs font-semibold uppercase text-leaf-700">
                Soil test N-P-K (kg/acre) — optional
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  label="N"
                  type="number"
                  min="0"
                  value={form.n}
                  onChange={(e) => setForm({ ...form, n: e.target.value })}
                  placeholder="0"
                />
                <Input
                  label="P"
                  type="number"
                  min="0"
                  value={form.p}
                  onChange={(e) => setForm({ ...form, p: e.target.value })}
                  placeholder="0"
                />
                <Input
                  label="K"
                  type="number"
                  min="0"
                  value={form.k}
                  onChange={(e) => setForm({ ...form, k: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Calculating...' : 'Get Recommendation'}
            </Button>
          </form>
        </Card>

        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key={result.crop}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-sm">
                  <h3 className="font-display font-semibold text-earth-900">Target N-P-K for {result.crop}</h3>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {[
                      ['N', result.recommendedNPK.n, 'leaf'],
                      ['P', result.recommendedNPK.p, 'sky'],
                      ['K', result.recommendedNPK.k, 'amber'],
                    ].map(([label, val]) => (
                      <div key={label} className="rounded-xl bg-leaf-50 p-3 text-center">
                        <p className="text-xs font-semibold uppercase text-earth-500">{label}</p>
                        <p className="font-display text-xl font-bold text-leaf-700">{val}</p>
                        <p className="text-xs text-earth-400">kg/acre</p>
                      </div>
                    ))}
                  </div>
                  {result.usedSoilTest && (
                    <p className="mt-2 text-xs text-earth-500">✓ Adjusted using your soil test values</p>
                  )}
                </div>

                <div className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-sm">
                  <h3 className="font-display mb-3 font-semibold text-earth-900">Recommended Fertilizers</h3>
                  <div className="space-y-2">
                    {result.fertilizers.map((f) => (
                      <div key={f.name} className="flex items-center justify-between rounded-xl bg-earth-50 px-4 py-3">
                        <span className="text-sm font-medium text-earth-800">{f.name}</span>
                        <span className="font-display font-bold text-leaf-700">{f.quantityKgPerAcre} kg/acre</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-leaf-600 to-sky-500 p-5 text-white">
                  <h3 className="font-display mb-2 font-semibold">📋 Usage Instructions</h3>
                  <p className="text-sm text-leaf-50">{result.instructions}</p>
                </div>
              </motion.div>
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/40 p-8 text-center text-earth-500">
                <span className="mb-3 text-5xl">🧪</span>
                Fill in the form to see fertilizer recommendations.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimatedPage>
  );
}
