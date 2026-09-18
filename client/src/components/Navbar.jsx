import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

function useNavLinks(isExpert) {
  const { t } = useTranslation();

  if (isExpert) {
    const primaryLinks = [
      { to: '/dashboard', label: t('nav.dashboard') },
      { to: '/expert-consultation', label: 'Consultations' },
      { to: '/weather', label: t('nav.weather') },
      { to: '/forum', label: t('nav.forum') },
    ];
    const moreLinks = [
      { to: '/market-prices', label: t('nav.market'), icon: '📈' },
      { to: '/schemes', label: t('nav.schemes'), icon: '🏛️' },
      { to: '/state-agriculture-calendar', label: 'State Agri Calendar', icon: '🗓️' },
      { to: '/disease-detection', label: 'Disease Detection', icon: '🔬' },
    ];
    return { primaryLinks, moreLinks, allLinks: [...primaryLinks, ...moreLinks] };
  }

  const primaryLinks = [
    { to: '/dashboard', label: t('nav.dashboard') },
    { to: '/farms', label: t('nav.farms') },
    { to: '/crop-recommendation', label: t('nav.crops') },
    { to: '/weather', label: t('nav.weather') },
    { to: '/forum', label: t('nav.forum') },
  ];
  const moreLinks = [
    { to: '/fertilizer-recommendation', label: t('nav.fertilizer'), icon: '🧪' },
    { to: '/smart-irrigation', label: t('nav.irrigation'), icon: '💧' },
    { to: '/crop-calendar', label: t('nav.calendar'), icon: '📅' },
    { to: '/equipment', label: t('nav.equipment'), icon: '🚜' },
    { to: '/expenses', label: t('nav.expenses'), icon: '💰' },
    { to: '/market-prices', label: t('nav.market'), icon: '📈' },
    { to: '/schemes', label: t('nav.schemes'), icon: '🏛️' },
    { to: '/expert-consultation', label: 'Expert Consultation', icon: '👨‍🌾' },
    { to: '/state-agriculture-calendar', label: 'State Agri Calendar', icon: '🗓️' },
    { to: '/disease-detection', label: 'Disease Detection', icon: '🔬' },
  ];
  return { primaryLinks, moreLinks, allLinks: [...primaryLinks, ...moreLinks] };
}

function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const setLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('agriconnect_lang', lang);
  };

  return (
    <div className="flex overflow-hidden rounded-full border border-leaf-200 text-xs font-semibold">
      <button
        onClick={() => setLang('en')}
        className={`px-2.5 py-1 transition ${current === 'en' ? 'bg-leaf-600 text-white' : 'text-earth-700 hover:bg-leaf-50'}`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('hi')}
        className={`px-2.5 py-1 transition ${current === 'hi' ? 'bg-leaf-600 text-white' : 'text-earth-700 hover:bg-leaf-50'}`}
      >
        हिं
      </button>
    </div>
  );
}

export default function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const { primaryLinks, moreLinks, allLinks } = useNavLinks(user?.role === 'expert');

  useEffect(() => {
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 glass shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="text-2xl">🌾</span>
          <span className="gradient-text">AgriConnect</span>
        </Link>

        {user && (
          <nav className="hidden items-center gap-1 lg:flex">
            {primaryLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-leaf-600 text-white' : 'text-earth-800 hover:bg-leaf-100'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((o) => !o)}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-earth-800 transition-colors hover:bg-leaf-100"
              >
                {t('nav.more')} ▾
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-leaf-100 bg-white py-2 shadow-xl"
                  >
                    {moreLinks.map((l) => (
                      <NavLink
                        key={l.to}
                        to={l.to}
                        onClick={() => setMoreOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-4 py-2 text-sm font-medium ${
                            isActive ? 'bg-leaf-50 text-leaf-700' : 'text-earth-700 hover:bg-leaf-50'
                          }`
                        }
                      >
                        <span>{l.icon}</span>
                        {l.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        )}

        <div className="flex items-center gap-3">
          <LanguageToggle />
          {user ? (
            <>
              <span className="hidden text-sm text-earth-700 sm:inline">
                {t('nav.hi')}, {user.name.split(' ')[0]}
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="rounded-full bg-earth-700 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-earth-800"
              >
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-full px-4 py-1.5 text-sm font-semibold text-leaf-700 hover:bg-leaf-100">
                {t('nav.login')}
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-leaf-600 px-4 py-1.5 text-sm font-semibold text-white shadow-md shadow-leaf-600/30 transition hover:bg-leaf-700"
              >
                {t('nav.getStarted')}
              </Link>
            </>
          )}
          {user && (
            <button className="lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
              <div className="space-y-1.5">
                <span className="block h-0.5 w-6 bg-earth-800" />
                <span className="block h-0.5 w-6 bg-earth-800" />
                <span className="block h-0.5 w-6 bg-earth-800" />
              </div>
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {user && open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-leaf-100 lg:hidden"
          >
            <div className="flex flex-col gap-1 p-3">
              {allLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive ? 'bg-leaf-600 text-white' : 'text-earth-800 hover:bg-leaf-100'
                    }`
                  }
                >
                  {l.icon ? `${l.icon} ` : ''}
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
