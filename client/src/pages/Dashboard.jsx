import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import AnimatedPage from '../components/AnimatedPage';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import NotificationSettings from '../components/NotificationSettings';
import SmsAlerts from '../components/SmsAlerts';
import ExpertDashboard from './ExpertDashboard';

const quickLinks = [
  { to: '/farms', icon: '🚜', label: 'Manage Farms' },
  { to: '/crop-recommendation', icon: '🌱', label: 'Recommend Crops' },
  { to: '/fertilizer-recommendation', icon: '🧪', label: 'Fertilizer Guide' },
  { to: '/weather', icon: '⛅', label: 'Check Weather' },
  { to: '/smart-irrigation', icon: '💧', label: 'Smart Irrigation' },
  { to: '/crop-calendar', icon: '📅', label: 'Crop Calendar' },
  { to: '/expenses', icon: '💰', label: 'Track Expenses' },
  { to: '/equipment', icon: '🚚', label: 'Equipment Rental' },
  { to: '/market-prices', icon: '📈', label: 'Market Prices' },
  { to: '/schemes', icon: '🏛️', label: 'Govt Schemes' },
  { to: '/expert-consultation', icon: '👨‍🌾', label: 'Expert Consultation' },
  { to: '/state-agriculture-calendar', icon: '🗓️', label: 'State Agri Calendar' },
  { to: '/disease-detection', icon: '🔬', label: 'Disease Detection' },
  { to: '/forum', icon: '💬', label: 'Community Forum' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [farms, setFarms] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const isExpert = user?.role === 'expert';

  useEffect(() => {
    if (isExpert) return;
    (async () => {
      try {
        const [farmsRes, summaryRes] = await Promise.all([
          api.get('/farms'),
          api.get('/expenses/summary'),
        ]);
        setFarms(farmsRes.data);
        setSummary(summaryRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalArea = farms.reduce((sum, f) => sum + f.area, 0);

  if (isExpert) return <ExpertDashboard />;

  return (
    <AnimatedPage>
      <PageHeader
        icon="👋"
        title={`${t('dashboard.welcome')}, ${user?.name?.split(' ')[0]}`}
        subtitle={t('dashboard.subtitle')}
      />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon="🚜" label={t('dashboard.totalFarms')} value={loading ? '—' : farms.length} color="leaf" delay={0} />
        <StatCard icon="📐" label={t('dashboard.totalArea')} value={loading ? '—' : totalArea.toFixed(1)} color="sky" delay={0.05} />
        <StatCard
          icon="💵"
          label={t('dashboard.totalIncome')}
          value={loading ? '—' : `₹${(summary?.totalIncome || 0).toLocaleString('en-IN')}`}
          color="amber"
          delay={0.1}
        />
        <StatCard
          icon="📉"
          label={t('dashboard.netProfit')}
          value={loading ? '—' : `₹${(summary?.netProfit || 0).toLocaleString('en-IN')}`}
          color={summary?.netProfit >= 0 ? 'leaf' : 'rose'}
          delay={0.15}
        />
      </div>

      <Card>
        <h2 className="font-display mb-4 text-lg font-semibold text-earth-900">{t('dashboard.quickActions')}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {quickLinks.map((q) => (
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
      <SmsAlerts />

      {!loading && farms.length === 0 && (
        <div className="mt-6 rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/50 p-8 text-center">
          <p className="text-earth-700">{t('dashboard.noFarms')}</p>
          <Link to="/farms" className="mt-3 inline-block font-semibold text-leaf-700 hover:underline">
            {t('dashboard.addFirstFarm')}
          </Link>
        </div>
      )}
    </AnimatedPage>
  );
}
