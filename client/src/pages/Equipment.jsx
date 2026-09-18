import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import AnimatedPage from '../components/AnimatedPage';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';

const TYPES = ['Tractor', 'Seeder', 'Harvester', 'Sprayer', 'Plough', 'Rotavator', 'Other'];

export default function Equipment() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [equipment, setEquipment] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bookingFor, setBookingFor] = useState(null);
  const [bookingForm, setBookingForm] = useState({ startDate: '', endDate: '', message: '' });
  const [form, setForm] = useState({
    machineName: '',
    type: 'Tractor',
    description: '',
    rentPerDay: '',
    location: '',
    contactPhone: '',
  });

  const load = async () => {
    setLoading(true);
    const [eqRes, bookingsRes] = await Promise.all([api.get('/equipment'), api.get('/bookings')]);
    setEquipment(eqRes.data);
    setMyBookings(bookingsRes.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/equipment', { ...form, rentPerDay: Number(form.rentPerDay) });
      setForm({ machineName: '', type: 'Tractor', description: '', rentPerDay: '', location: '', contactPhone: '' });
      setShowForm(false);
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this listing?')) return;
    await api.delete(`/equipment/${id}`);
    load();
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/bookings', { equipment: bookingFor._id, ...bookingForm });
      setBookingFor(null);
      setBookingForm({ startDate: '', endDate: '', message: '' });
      load();
    } finally {
      setSaving(false);
    }
  };

  const bookingStatusFor = (equipmentId) =>
    myBookings.find((b) => b.equipment?._id === equipmentId)?.status;

  return (
    <AnimatedPage>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <PageHeader icon="🚜" title={t('pages.equipment.title')} subtitle={t('pages.equipment.subtitle')} />
        <Button onClick={() => setShowForm((s) => !s)}>{showForm ? t('common.cancel') : t('fields.listEquipment')}</Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-8 overflow-hidden">
            <Card hover={false}>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label={t('fields.machineName')}
                  required
                  value={form.machineName}
                  onChange={(e) => setForm({ ...form, machineName: e.target.value })}
                  placeholder="Mahindra 575 DI Tractor"
                />
                <Select label={t('fields.type')} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  {TYPES.map((ty) => (
                    <option key={ty} value={ty}>
                      {ty}
                    </option>
                  ))}
                </Select>
                <Input
                  label={t('fields.rentPerDay')}
                  type="number"
                  min="0"
                  required
                  value={form.rentPerDay}
                  onChange={(e) => setForm({ ...form, rentPerDay: e.target.value })}
                  placeholder="1500"
                />
                <Input
                  label={t('fields.location')}
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Amritsar, Punjab"
                />
                <Input
                  label={t('fields.contactPhone')}
                  value={form.contactPhone}
                  onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                  placeholder="98765 43210"
                />
                <div className="sm:col-span-2">
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-earth-700">{t('fields.description')}</span>
                    <textarea
                      rows={2}
                      className="w-full rounded-xl border border-leaf-200 bg-white px-4 py-2.5 outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                    {saving ? t('common.saving') : t('fields.listEquipment')}
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
      ) : equipment.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/50 p-10 text-center text-earth-600">
          No equipment listed yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((eq, i) => {
            const isMine = eq.owner?._id === user?._id;
            const status = bookingStatusFor(eq._id);
            return (
              <Card key={eq._id} delay={Math.min(i * 0.05, 0.4)}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-earth-900">{eq.machineName}</h3>
                    <span className="mt-1 inline-block rounded-full bg-leaf-100 px-2.5 py-0.5 text-xs font-semibold text-leaf-700">
                      {eq.type}
                    </span>
                  </div>
                  {isMine && (
                    <button onClick={() => handleDelete(eq._id)} className="text-rose-500 hover:text-rose-700" title="Remove">
                      🗑️
                    </button>
                  )}
                </div>
                {eq.description && <p className="mt-2 text-sm text-earth-600">{eq.description}</p>}
                <div className="mt-3 space-y-1 text-sm text-earth-700">
                  {eq.location && <p>📍 {eq.location}</p>}
                  <p>👤 {eq.owner?.name}</p>
                </div>
                <p className="mt-3 font-display text-xl font-bold text-leaf-600">
                  ₹{eq.rentPerDay.toLocaleString('en-IN')}
                  <span className="text-sm font-normal text-earth-500"> / day</span>
                </p>
                {!isMine && (
                  <Button
                    className="mt-3 w-full"
                    disabled={!!status}
                    onClick={() => setBookingFor(eq)}
                  >
                    {status ? `Booking: ${status}` : 'Request to Book'}
                  </Button>
                )}
              </Card>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {bookingFor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
            onClick={() => setBookingFor(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <h3 className="font-display mb-4 font-semibold text-earth-900">
                Book {bookingFor.machineName}
              </h3>
              <form onSubmit={handleBook} className="space-y-4">
                <Input
                  label="Start date"
                  type="date"
                  required
                  value={bookingForm.startDate}
                  onChange={(e) => setBookingForm({ ...bookingForm, startDate: e.target.value })}
                />
                <Input
                  label="End date"
                  type="date"
                  required
                  value={bookingForm.endDate}
                  onChange={(e) => setBookingForm({ ...bookingForm, endDate: e.target.value })}
                />
                <Input
                  label="Message to owner (optional)"
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                  placeholder="Need it for 5 acres of wheat sowing"
                />
                <Button type="submit" disabled={saving} className="w-full">
                  {saving ? 'Sending...' : 'Send Booking Request'}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {myBookings.length > 0 && (
        <Card hover={false} className="mt-8">
          <h3 className="font-display mb-4 font-semibold text-earth-900">My Bookings</h3>
          <div className="space-y-2">
            {myBookings.map((b) => (
              <div key={b._id} className="flex items-center justify-between rounded-xl bg-earth-50 px-4 py-3 text-sm">
                <span>
                  {b.equipment?.machineName} — {new Date(b.startDate).toLocaleDateString('en-IN')} to{' '}
                  {new Date(b.endDate).toLocaleDateString('en-IN')}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    b.status === 'confirmed'
                      ? 'bg-leaf-100 text-leaf-700'
                      : b.status === 'cancelled'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </AnimatedPage>
  );
}
