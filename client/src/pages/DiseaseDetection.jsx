import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import AnimatedPage from '../components/AnimatedPage';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Button from '../components/Button';

export default function DiseaseDetection() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResults(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError('');
    setResults(null);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const { data } = await api.post('/disease/detect', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResults(data.predictions);
    } catch (err) {
      setError(err.response?.data?.message || 'Detection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <PageHeader
        icon="🔬"
        title="Disease Detection"
        subtitle="Upload a photo of a leaf to identify possible plant diseases using AI — a helper, not a substitute for expert diagnosis."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card hover={false} className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-earth-700">Leaf photo</span>
              <input type="file" accept="image/*" onChange={handleFileChange} required />
            </label>

            {preview && (
              <img src={preview} alt="Selected leaf" className="h-56 w-full rounded-xl object-cover" />
            )}

            <Button type="submit" disabled={loading || !file} className="w-full">
              {loading ? 'Analyzing...' : 'Detect Disease'}
            </Button>
          </form>
          {error && <div className="mt-4 rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">{error}</div>}
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
                    key={r.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-semibold text-earth-900">
                        {i === 0 ? '🔬 ' : ''}
                        {r.label}
                      </h3>
                      <span className="font-display text-lg font-bold text-leaf-600">{r.confidencePercent}%</span>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-leaf-50 p-3">
                        <p className="text-xs font-semibold uppercase text-leaf-700">Treatment</p>
                        <p className="mt-1 text-sm text-earth-700">{r.treatment}</p>
                      </div>
                      <div className="rounded-xl bg-sky-50 p-3">
                        <p className="text-xs font-semibold uppercase text-sky-700">Prevention</p>
                        <p className="mt-1 text-sm text-earth-700">{r.prevention}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/40 p-8 text-center text-earth-500">
                <span className="mb-3 text-5xl">🔬</span>
                Upload a leaf photo to check for disease.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimatedPage>
  );
}
