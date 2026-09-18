import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import AnimatedPage from '../components/AnimatedPage';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import StatCard from '../components/StatCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const CATEGORIES = ['Seeds', 'Fertilizer', 'Labour', 'Fuel', 'Equipment', 'Irrigation', 'Sale', 'Other'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Expenses() {
  const { t } = useTranslation();
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    type: 'expense',
    category: 'Seeds',
    amount: '',
    note: '',
    date: new Date().toISOString().slice(0, 10),
  });

  const loadData = async () => {
    setLoading(true);
    const [expRes, sumRes] = await Promise.all([api.get('/expenses'), api.get('/expenses/summary')]);
    setExpenses(expRes.data);
    setSummary(sumRes.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/expenses', { ...form, amount: Number(form.amount) });
      setForm({ type: 'expense', category: 'Seeds', amount: '', note: '', date: new Date().toISOString().slice(0, 10) });
      setShowForm(false);
      loadData();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/expenses/${id}`);
    loadData();
  };

  const monthlyLabels = [...new Set((summary?.monthly || []).map((m) => `${MONTH_NAMES[m._id.month - 1]} ${m._id.year}`))];
  const incomeByMonth = monthlyLabels.map((label) => {
    const [monName, year] = label.split(' ');
    const monthIdx = MONTH_NAMES.indexOf(monName) + 1;
    return summary?.monthly.find((m) => m._id.month === monthIdx && m._id.year === Number(year) && m._id.type === 'income')?.total || 0;
  });
  const expenseByMonth = monthlyLabels.map((label) => {
    const [monName, year] = label.split(' ');
    const monthIdx = MONTH_NAMES.indexOf(monName) + 1;
    return summary?.monthly.find((m) => m._id.month === monthIdx && m._id.year === Number(year) && m._id.type === 'expense')?.total || 0;
  });

  const barData = {
    labels: monthlyLabels,
    datasets: [
      { label: 'Income', data: incomeByMonth, backgroundColor: '#22c55e', borderRadius: 6 },
      { label: 'Expense', data: expenseByMonth, backgroundColor: '#f87171', borderRadius: 6 },
    ],
  };

  const doughnutData = {
    labels: (summary?.byCategory || []).map((c) => c._id),
    datasets: [
      {
        data: (summary?.byCategory || []).map((c) => c.total),
        backgroundColor: ['#16a34a', '#0ea5e9', '#f59e0b', '#f472b6', '#a78bfa', '#f87171', '#22d3ee', '#a3a3a3'],
      },
    ],
  };

  return (
    <AnimatedPage>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <PageHeader icon="💰" title={t('pages.expenses.title')} subtitle={t('pages.expenses.subtitle')} />
        <Button onClick={() => setShowForm((s) => !s)}>{showForm ? t('common.cancel') : t('fields.addEntry')}</Button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon="💵" label={t('dashboard.totalIncome')} value={`₹${(summary?.totalIncome || 0).toLocaleString('en-IN')}`} color="leaf" />
        <StatCard icon="🧾" label="Total Expense" value={`₹${(summary?.totalExpense || 0).toLocaleString('en-IN')}`} color="rose" delay={0.05} />
        <StatCard
          icon="📊"
          label={t('dashboard.netProfit')}
          value={`₹${(summary?.netProfit || 0).toLocaleString('en-IN')}`}
          color={summary?.netProfit >= 0 ? 'sky' : 'rose'}
          delay={0.1}
        />
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-8 overflow-hidden">
            <Card hover={false}>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Select label={t('fields.type')} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </Select>
                <Select label={t('fields.category')} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
                <Input
                  label={t('fields.amount')}
                  type="number"
                  min="0"
                  required
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />
                <Input label={t('fields.date')} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                <div className="sm:col-span-2 lg:col-span-3">
                  <Input label={t('fields.note')} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
                </div>
                <div className="flex items-end">
                  <Button type="submit" disabled={saving} className="w-full">
                    {saving ? t('common.saving') : t('common.save')}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && expenses.length > 0 && (
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Card hover={false} className="lg:col-span-3">
            <h3 className="font-display mb-4 font-semibold text-earth-900">Monthly Income vs Expense</h3>
            <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
          </Card>
          <Card hover={false} className="lg:col-span-2">
            <h3 className="font-display mb-4 font-semibold text-earth-900">Expense by Category</h3>
            <Doughnut data={doughnutData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
          </Card>
        </div>
      )}

      <Card hover={false}>
        <h3 className="font-display mb-4 font-semibold text-earth-900">Recent Entries</h3>
        {loading ? (
          <div className="flex h-24 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-leaf-200 border-t-leaf-600" />
          </div>
        ) : expenses.length === 0 ? (
          <p className="py-6 text-center text-earth-500">No entries yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-leaf-100 text-left text-earth-500">
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Note</th>
                  <th className="py-2 pr-4 text-right">Amount</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp) => (
                  <tr key={exp._id} className="border-b border-leaf-50 hover:bg-leaf-50/50">
                    <td className="py-2 pr-4">{new Date(exp.date).toLocaleDateString('en-IN')}</td>
                    <td className="py-2 pr-4">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          exp.type === 'income' ? 'bg-leaf-100 text-leaf-700' : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {exp.type}
                      </span>
                    </td>
                    <td className="py-2 pr-4">{exp.category}</td>
                    <td className="py-2 pr-4 text-earth-500">{exp.note || '—'}</td>
                    <td className="py-2 pr-4 text-right font-semibold">₹{exp.amount.toLocaleString('en-IN')}</td>
                    <td className="py-2 text-right">
                      <button onClick={() => handleDelete(exp._id)} className="text-rose-500 hover:text-rose-700">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </AnimatedPage>
  );
}
