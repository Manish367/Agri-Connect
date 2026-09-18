import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import AnimatedPage from '../components/AnimatedPage';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import SelectWithOther from '../components/SelectWithOther';
import FarmMap from '../components/FarmMap';
import FarmQRModal from '../components/FarmQRModal';
import { INDIAN_STATES } from '../constants/indianStates';

const SOIL_TYPES = ['Alluvial', 'Black', 'Red', 'Laterite', 'Sandy', 'Clay', 'Loamy'];

export default function Farms() {
  const { t } = useTranslation();
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [mapFarm, setMapFarm] = useState(null);
  const [qrFarm, setQrFarm] = useState(null);
  const [form, setForm] = useState({
    name: '',
    area: '',
    soilType: 'Alluvial',
    village: '',
    district: '',
    state: '',
  });

  const loadFarms = async () => {
    setLoading(true);
    const { data } = await api.get('/farms');
    setFarms(data);
    setLoading(false);
  };

  useEffect(() => {
    loadFarms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await api.post('/farms', {
        name: form.name,
        area: Number(form.area),
        soilType: form.soilType,
        location: { village: form.village, district: form.district, state: form.state },
      });
      setForm({ name: '', area: '', soilType: 'Alluvial', village: '', district: '', state: '' });
      setShowForm(false);
      loadFarms();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add farm');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this farm?')) return;
    await api.delete(`/farms/${id}`);
    loadFarms();
  };

  return (
    <AnimatedPage>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <PageHeader icon="🚜" title={t('pages.farms.title')} subtitle={t('pages.farms.subtitle')} />
        <Button onClick={() => setShowForm((s) => !s)}>{showForm ? t('common.cancel') : t('fields.addFarm')}</Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <Card hover={false}>
              {error && <div className="mb-4 rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">{error}</div>}
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label={t('fields.farmName')}
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Green Valley Farm"
                />
                <Input
                  label={t('fields.area')}
                  type="number"
                  step="0.1"
                  min="0"
                  required
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                  placeholder="5.5"
                />
                <Select label={t('fields.soilType')} value={form.soilType} onChange={(e) => setForm({ ...form, soilType: e.target.value })}>
                  {SOIL_TYPES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
                <Input
                  label={t('fields.village')}
                  value={form.village}
                  onChange={(e) => setForm({ ...form, village: e.target.value })}
                />
                <Input
                  label={t('fields.district')}
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                />
                <SelectWithOther
                  label={t('fields.state')}
                  value={form.state}
                  onChange={(v) => setForm({ ...form, state: v })}
                  options={INDIAN_STATES}
                  allLabel="Select a state"
                  otherPlaceholder="Type your state..."
                />
                <div className="sm:col-span-2">
                  <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                    {saving ? t('common.saving') : t('fields.saveFarm')}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-leaf-200 border-t-leaf-600" />
        </div>
      ) : farms.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/50 p-10 text-center text-earth-700">
          No farms yet. Add your first one above.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {farms.map((farm, i) => (
            <Card key={farm._id} delay={i * 0.05}>
              <div className="flex items-start justify-between">
                <h3 className="font-display text-lg font-semibold text-earth-900">{farm.name}</h3>
                <button
                  onClick={() => handleDelete(farm._id)}
                  className="text-rose-500 transition hover:text-rose-700"
                  title="Delete farm"
                >
                  🗑️
                </button>
              </div>
              <div className="mt-3 space-y-1.5 text-sm text-earth-700">
                <p>📐 {farm.area} acres</p>
                <p>🪨 {farm.soilType} soil</p>
                {(farm.location?.village || farm.location?.district || farm.location?.state) && (
                  <p>
                    📍{' '}
                    {[farm.location?.village, farm.location?.district, farm.location?.state]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setMapFarm(farm)}
                  className="flex-1 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
                >
                  🛰️ Satellite View
                </button>
                <button
                  onClick={() => setQrFarm(farm)}
                  className="flex-1 rounded-full border border-leaf-200 bg-leaf-50 px-3 py-1.5 text-xs font-semibold text-leaf-700 transition hover:bg-leaf-100"
                >
                  📱 QR Record
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AnimatePresence>
        {mapFarm && <FarmMap farm={mapFarm} onClose={() => setMapFarm(null)} />}
        {qrFarm && <FarmQRModal farm={qrFarm} onClose={() => setQrFarm(null)} />}
      </AnimatePresence>
    </AnimatedPage>
  );
}
