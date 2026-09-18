import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import AnimatedPage from '../components/AnimatedPage';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

const statusColor = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-leaf-100 text-leaf-700',
  completed: 'bg-sky-100 text-sky-700',
  cancelled: 'bg-rose-100 text-rose-700',
};

export default function ExpertConsultation() {
  const { user } = useAuth();
  const isExpert = user?.role === 'expert';
  const [experts, setExperts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingFor, setBookingFor] = useState(null);
  const [form, setForm] = useState({ scheduledAt: '', reason: '' });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const requests = [api.get('/appointments')];
    if (!isExpert) requests.push(api.get('/experts'));
    const results = await Promise.all(requests);
    setAppointments(results[0].data);
    if (!isExpert) setExperts(results[1].data);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBook = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/appointments', { expert: bookingFor._id, ...form });
      setBookingFor(null);
      setForm({ scheduledAt: '', reason: '' });
      load();
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (id, status) => {
    await api.put(`/appointments/${id}/status`, { status });
    load();
  };

  return (
    <AnimatedPage>
      <PageHeader
        icon="👨‍🌾"
        title="Expert Consultation"
        subtitle={isExpert ? 'Manage appointment requests from farmers.' : 'Book a chat or video call with an agriculture expert.'}
      />

      {!isExpert && (
        <>
          <h2 className="font-display mb-4 text-lg font-semibold text-earth-900">Available Experts</h2>
          {loading ? (
            <div className="flex h-32 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-leaf-200 border-t-leaf-600" />
            </div>
          ) : experts.length === 0 ? (
            <div className="mb-8 rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/50 p-6 text-center text-earth-600">
              No experts have registered yet. Ask someone to register with the "Agriculture Expert" role.
            </div>
          ) : (
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {experts.map((exp) => (
                <Card key={exp._id}>
                  <h3 className="font-display font-semibold text-earth-900">🎓 {exp.name}</h3>
                  {exp.state && <p className="mt-1 text-sm text-earth-500">📍 {exp.state}</p>}
                  <Button className="mt-3 w-full" onClick={() => setBookingFor(exp)}>
                    Book Consultation
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      <h2 className="font-display mb-4 text-lg font-semibold text-earth-900">
        {isExpert ? 'Appointment Requests' : 'My Appointments'}
      </h2>
      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-leaf-200 border-t-leaf-600" />
        </div>
      ) : appointments.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/50 p-6 text-center text-earth-600">
          No appointments yet.
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((a) => (
            <Card key={a._id} hover={false}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-earth-900">
                    {isExpert ? a.farmer?.name : `Dr. ${a.expert?.name}`}
                  </p>
                  <p className="text-sm text-earth-500">
                    📅 {new Date(a.scheduledAt).toLocaleString('en-IN')}
                    {a.reason && ` — ${a.reason}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[a.status]}`}>
                    {a.status}
                  </span>
                  {isExpert && a.status === 'pending' && (
                    <>
                      <Button className="!px-3 !py-1 !text-xs" onClick={() => updateStatus(a._id, 'confirmed')}>
                        Confirm
                      </Button>
                      <Button variant="danger" className="!px-3 !py-1 !text-xs" onClick={() => updateStatus(a._id, 'cancelled')}>
                        Decline
                      </Button>
                    </>
                  )}
                  {a.status === 'confirmed' && (
                    <Link to={`/expert-consultation/${a._id}`}>
                      <Button variant="secondary" className="!px-3 !py-1 !text-xs">
                        💬 Chat / 📹 Call
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          ))}
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
              <h3 className="font-display mb-4 font-semibold text-earth-900">Book with {bookingFor.name}</h3>
              <form onSubmit={handleBook} className="space-y-4">
                <Input
                  label="Date & time"
                  type="datetime-local"
                  required
                  value={form.scheduledAt}
                  onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
                />
                <Input
                  label="Reason (optional)"
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  placeholder="Pest issue in cotton crop"
                />
                <Button type="submit" disabled={saving} className="w-full">
                  {saving ? 'Booking...' : 'Send Request'}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedPage>
  );
}
