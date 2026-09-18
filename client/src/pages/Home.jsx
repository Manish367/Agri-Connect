import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import FarmImageMarquee from '../components/FarmImageMarquee';
import { useAuth } from '../context/AuthContext';

const features = [
  { icon: '🚜', title: 'Farm Dashboard', desc: 'Register your farms with soil type, area and location, all in one place.' },
  { icon: '🌱', title: 'Crop Recommendation', desc: 'Get the best crops for your soil, season, temperature and rainfall.' },
  { icon: '⛅', title: 'Weather Forecast', desc: 'Live conditions and irrigation advisories for your location.' },
  { icon: '💰', title: 'Expense Tracker', desc: 'Track income and expenses with visual monthly breakdowns.' },
  { icon: '📈', title: 'Market Prices', desc: 'Daily mandi prices for major crops across states.' },
  { icon: '🏛️', title: 'Govt. Schemes', desc: 'Discover subsidies, insurance and loan schemes you qualify for.' },
  { icon: '💬', title: 'Community Forum', desc: 'Ask questions, share photos, and learn from fellow farmers.' },
  { icon: '🔬', title: 'More coming soon', desc: 'Disease detection, equipment rental, expert consultation & smart irrigation.' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden">
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-leaf-100 via-sky-50 to-earth-50" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block rounded-full bg-leaf-100 px-4 py-1 text-sm font-semibold text-leaf-700">
              🌾 {t('home.badge')}
            </span>
            <h1 className="font-display mt-4 text-4xl font-extrabold leading-tight text-earth-900 sm:text-5xl lg:text-6xl">
              {t('home.heading1')}{' '}
              <span className="gradient-text bg-300% animate-gradient-x">AgriConnect</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-earth-700">{t('home.subtitle')}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={user ? '/dashboard' : '/register'}
                className="rounded-full bg-leaf-600 px-7 py-3 font-semibold text-white shadow-lg shadow-leaf-600/30 transition hover:-translate-y-0.5 hover:bg-leaf-700 hover:shadow-xl"
              >
                {user ? t('home.ctaDashboard') : t('home.ctaPrimary')}
              </Link>
              <Link
                to="/market-prices"
                className="rounded-full border-2 border-leaf-600 px-7 py-3 font-semibold text-leaf-700 transition hover:-translate-y-0.5 hover:bg-leaf-50"
              >
                {t('home.ctaSecondary')}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
          >
            <FarmImageMarquee />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-earth-900">{t('home.featuresTitle')}</h2>
          <p className="mt-2 text-earth-600">{t('home.featuresSubtitle')}</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              className="card-hover rounded-2xl border border-leaf-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 text-4xl">{f.icon}</div>
              <h3 className="font-display font-semibold text-earth-900">{f.title}</h3>
              <p className="mt-1 text-sm text-earth-600">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gradient-to-r from-leaf-600 to-sky-500 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold"
          >
            {t('home.bottomCtaTitle')}
          </motion.h2>
          <p className="mt-3 text-leaf-50">{t('home.bottomCtaSubtitle')}</p>
          <Link
            to={user ? '/dashboard' : '/register'}
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-semibold text-leaf-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            {user ? t('home.bottomCtaButtonLoggedIn') : t('home.bottomCtaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}
