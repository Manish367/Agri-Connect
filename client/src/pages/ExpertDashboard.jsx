import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import AnimatedPage from '../components/AnimatedPage';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import NotificationSettings from '../components/NotificationSettings';

const expertQuickLinks = [
  { to: '/expert-consultation', icon: '👨‍🌾', label: 'Appointment Requests' },
  { to: '/forum', icon: '💬', label: 'Community Forum' },
  { to: '/disease-detection', icon: '🔬', label: 'Disease Detection Aid' },
  { to: '/weather', icon: '⛅', label: 'Weather Reference' },
  { to: '/market-prices', icon: '📈', label: 'Market Prices' },
  { to: '/schemes', icon: '🏛️', label: 'Govt Schemes' },
  { to: '/state-agriculture-calendar', icon: '🗓️', label: 'State Agri Calendar' },
];

export default function ExpertDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/appointments');
        setAppointments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const pending = appointments.filter((a) => a.status === 'pending').length;
  const confirmedUpcoming = appointments.filter(
    (a) => a.status === 'confirmed' && new Date(a.scheduledAt) >= new Date()
  ).length;
  const completed = appointments.filter((a) => a.status === 'completed').length;
  const farmersHelped = new Set(appointments.map((a) => a.farmer?._id).filter(Boolean)).size;

  const upcoming = appointments
    .filter((a) => a.status === 'confirmed' && new Date(a.scheduledAt) >= new Date())
    .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))
    .slice(0, 5);

  return (
    <AnimatedPage>
      <PageHeader
        icon="🎓"
        title={`Welcome, Dr. ${user?.name?.split(' ')[0]}`}
        subtitle="Manage consultation requests and advise farmers with reference tools."
      />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon="⏳" label="Pending Requests" value={loading ? '—' : pending} color="amber" delay={0} />
        <StatCard icon="📅" label="Upcoming Confirmed" value={loading ? '—' : confirmedUpcoming} color="sky" delay={0.05} />
        <StatCard icon="✅" label="Completed" value={loading ? '—' : completed} color="leaf" delay={0.1} />
        <StatCard icon="🧑‍🌾" label="Farmers Helped" value={loading ? '—' : farmersHelped} color="rose" delay={0.15} />
      </div>

      <Card>
        <h2 className="font-display mb-4 text-lg font-semibold text-earth-900">Quick actions</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {expertQuickLinks.map((q) => (
            <Link
              key={q.to}
              to={q.to}
              className="flex flex-col items-center gap-2 rounded-xl border border-leaf-100 bg-leaf-50/60 p-4 text-center transition hover:-translate-y-1 hover:bg-leaf-100"
            >
              <span className="text-2xl">{q.icon}</span>
              <span className="text-sm font-medium text-earth-800">{q.label}</span>
            </Link>
          ))}
        </div>
      </Card>

      <NotificationSettings />

      <Card hover={false} className="mt-6">
        <h2 className="font-display mb-4 text-lg font-semibold text-earth-900">Upcoming Consultations</h2>
        {loading ? (
          <div className="flex h-24 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-leaf-200 border-t-leaf-600" />
          </div>
        ) : upcoming.length === 0 ? (
          <p className="py-4 text-center text-earth-500">No upcoming confirmed consultations.</p>
        ) : (
          <div className="space-y-2">
            {upcoming.map((a) => (
              <Link
                key={a._id}
                to={`/expert-consultation/${a._id}`}
                className="flex items-center justify-between rounded-xl bg-leaf-50/60 px-4 py-3 transition hover:bg-leaf-100"
              >
                <div>
                  <p className="font-semibold text-earth-900">{a.farmer?.name}</p>
                  <p className="text-sm text-earth-500">{a.reason || 'General consultation'}</p>
                </div>
                <span className="text-sm font-medium text-leaf-700">
                  {new Date(a.scheduledAt).toLocaleString('en-IN')}
                </span>
              </Link>
            ))}
          </div>
        )}
      </Card>

      {!loading && pending === 0 && appointments.length === 0 && (
        <div className="mt-6 rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/50 p-8 text-center">
          <p className="text-earth-700">No consultation requests yet.</p>
          <p className="mt-1 text-sm text-earth-500">Farmers will find you under Expert Consultation once they search for experts in your state.</p>
        </div>
      )}
    </AnimatedPage>
  );
}
