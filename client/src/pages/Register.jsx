import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import SelectWithOther from '../components/SelectWithOther';
import { INDIAN_STATES } from '../constants/indianStates';

export default function Register() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', state: '', role: 'farmer' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
          <span className="text-4xl">🌱</span>
          <h1 className="font-display mt-2 text-2xl font-bold text-earth-900">{t('auth.registerTitle')}</h1>
          <p className="mt-1 text-sm text-earth-600">{t('auth.registerSubtitle')}</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('auth.fullName')}
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ramesh Kumar"
          />
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
            minLength={6}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="At least 6 characters"
          />
          <Input
            label={t('auth.phone')}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="98765 43210"
          />
          <SelectWithOther
            label={t('auth.state')}
            value={form.state}
            onChange={(v) => setForm({ ...form, state: v })}
            options={INDIAN_STATES}
            allLabel="Select a state"
            otherPlaceholder="Type your state..."
          />
          <div>
            <span className="mb-1 block text-sm font-medium text-earth-700">I am registering as</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: 'farmer' })}
                className={`rounded-xl border-2 px-4 py-2 text-sm font-semibold transition ${
                  form.role === 'farmer' ? 'border-leaf-600 bg-leaf-50 text-leaf-700' : 'border-leaf-100 text-earth-500'
                }`}
              >
                🌾 Farmer
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, role: 'expert' })}
                className={`rounded-xl border-2 px-4 py-2 text-sm font-semibold transition ${
                  form.role === 'expert' ? 'border-leaf-600 bg-leaf-50 text-leaf-700' : 'border-leaf-100 text-earth-500'
                }`}
              >
                🎓 Agriculture Expert
              </button>
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? t('common.loading') : t('auth.registerButton')}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-earth-600">
          {t('auth.haveAccount')}{' '}
          <Link to="/login" className="font-semibold text-leaf-700 hover:underline">
            {t('auth.loginButton')}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
