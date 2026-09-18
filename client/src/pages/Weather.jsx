import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import AnimatedPage from '../components/AnimatedPage';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Weather() {
  const { t } = useTranslation();
  const [location, setLocation] = useState('New Delhi');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.get('/weather', { params: { location } });
      setWeather(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <PageHeader icon="⛅" title={t('pages.weather.title')} subtitle={t('pages.weather.subtitle')} />

      <Card hover={false} className="mb-6">
        <form onSubmit={fetchWeather} className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Pune" />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Fetching...' : 'Get Weather'}
          </Button>
        </form>
      </Card>

      {error && <div className="mb-4 rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">{error}</div>}

      <AnimatePresence mode="wait">
        {weather && (
          <motion.div
            key={weather.location}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-hidden rounded-3xl bg-gradient-to-br from-sky-400 to-leaf-600 p-8 text-white shadow-xl"
          >
            {weather.source === 'mock' && (
              <div className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                📡 Sample data
                {weather.fallbackReason
                  ? ` — live lookup failed (${weather.fallbackReason})`
                  : ' — add OPENWEATHER_API_KEY in server/.env for live weather'}
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <h2 className="font-display text-2xl font-bold">{weather.location}</h2>
                <p className="mt-1 text-white/80">{weather.condition}</p>
              </div>
              <div className="font-display text-6xl font-bold">{Math.round(weather.temperature)}°C</div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur">
                <div className="text-2xl">💧</div>
                <div className="mt-1 text-lg font-semibold">{Math.round(weather.humidity)}%</div>
                <div className="text-xs text-white/80">Humidity</div>
              </div>
              <div className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur">
                <div className="text-2xl">🌧️</div>
                <div className="mt-1 text-lg font-semibold">{Math.round(weather.rainChancePercent)}%</div>
                <div className="text-xs text-white/80">Rain Chance</div>
              </div>
              <div className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur">
                <div className="text-2xl">💨</div>
                <div className="mt-1 text-lg font-semibold">{Math.round(weather.windSpeed)} km/h</div>
                <div className="text-xs text-white/80">Wind</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white/15 p-4 backdrop-blur">
              <p className="text-sm font-medium">🌾 Advisory: {weather.advisory}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedPage>
  );
}
