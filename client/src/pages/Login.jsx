import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-leaf-50 via-white to-sky-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl border border-leaf-100 bg-white p-8 shadow-xl"
      >
        <div className="mb-6 text-center">
          <span className="text-4xl">🌾</span>
          <h1 className="font-display mt-2 text-2xl font-bold text-earth-900">{t('auth.loginTitle')}</h1>
          <p className="mt-1 text-sm text-earth-600">{t('auth.loginSubtitle')}</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('auth.email')}
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
          />
          <Input
            label={t('auth.password')}
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? t('common.loading') : t('auth.loginButton')}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-earth-600">
          {t('auth.noAccount')}{' '}
          <Link to="/register" className="font-semibold text-leaf-700 hover:underline">
            {t('auth.register')}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
