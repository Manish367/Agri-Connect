import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import AnimatedPage from '../components/AnimatedPage';
import PageHeader from '../components/PageHeader';
import Select from '../components/Select';
import SelectWithOther from '../components/SelectWithOther';
import { INDIAN_STATES } from '../constants/indianStates';

const CATEGORIES = ['Income Support', 'Insurance', 'Subsidy', 'Loan', 'Equipment'];
const categoryIcon = {
  'Income Support': '💵',
  Insurance: '🛡️',
  Subsidy: '🌿',
  Loan: '🏦',
  Equipment: '🚜',
};

export default function Schemes() {
  const { t } = useTranslation();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState('');
  const [category, setCategory] = useState('');

  const load = async () => {
    setLoading(true);
    const { data } = await api.get('/schemes', { params: { state, category } });
    setSchemes(data);
    setLoading(false);
  };

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, category]);

  return (
    <AnimatedPage>
      <PageHeader icon="🏛️" title={t('pages.schemes.title')} subtitle={t('pages.schemes.subtitle')} />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectWithOther
          label="Filter by state"
          value={state}
          onChange={setState}
          options={INDIAN_STATES}
          allLabel="All states"
          otherPlaceholder="Type a state name..."
        />
        <Select label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-leaf-200 border-t-leaf-600" />
        </div>
      ) : (
        <div className="space-y-4">
          {schemes.map((s, i) => (
            <motion.div
              key={s._id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.06, 0.4) }}
              className="card-hover rounded-2xl border border-leaf-100 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{categoryIcon[s.category] || '📋'}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-earth-900">{s.title}</h3>
                    <span className="mt-1 inline-block rounded-full bg-leaf-100 px-2.5 py-0.5 text-xs font-semibold text-leaf-700">
                      {s.category}
                    </span>
                  </div>
                </div>
                {s.applyLink && (
                  <a
                    href={s.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border-2 border-leaf-600 px-4 py-1.5 text-sm font-semibold text-leaf-700 transition hover:bg-leaf-50"
                  >
                    Official site ↗
                  </a>
                )}
              </div>
              <p className="mt-3 text-earth-700">{s.description}</p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-leaf-50 p-3">
                  <p className="text-xs font-semibold uppercase text-leaf-700">Benefits</p>
                  <p className="mt-1 text-sm text-earth-700">{s.benefits}</p>
                </div>
                <div className="rounded-xl bg-sky-50 p-3">
                  <p className="text-xs font-semibold uppercase text-sky-700">Eligibility</p>
                  <p className="mt-1 text-sm text-earth-700">{s.eligibility}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-earth-400">Applicable in: {s.states.join(', ')}</p>
            </motion.div>
          ))}
          {schemes.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/50 p-10 text-center text-earth-600">
              No schemes match your filters.
            </div>
          )}
        </div>
      )}
    </AnimatedPage>
  );
}
