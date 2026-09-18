import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import AnimatedPage from '../components/AnimatedPage';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import VoiceInputButton from '../components/VoiceInputButton';

export default function Forum() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [image, setImage] = useState(null);

  const loadPosts = async () => {
    setLoading(true);
    const { data } = await api.get('/forum');
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('description', form.description);
      if (image) fd.append('image', image);
      await api.post('/forum', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm({ title: '', description: '' });
      setImage(null);
      setShowForm(false);
      loadPosts();
    } finally {
      setSaving(false);
    }
  };

  const toggleLike = async (id) => {
    await api.post(`/forum/${id}/like`);
    loadPosts();
  };

  return (
    <AnimatedPage>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <PageHeader icon="💬" title={t('pages.forumTitle.title')} subtitle={t('pages.forumTitle.subtitle')} />
        <Button onClick={() => setShowForm((s) => !s)}>{showForm ? t('common.cancel') : t('fields.newPost')}</Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-8 overflow-hidden">
            <Card hover={false}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="block text-sm font-medium text-earth-700">{t('fields.title')}</span>
                    <VoiceInputButton onResult={(text) => setForm((f) => ({ ...f, title: `${f.title}${f.title ? ' ' : ''}${text}` }))} />
                  </div>
                  <Input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="What's your question?"
                  />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="block text-sm font-medium text-earth-700">{t('fields.description')}</span>
                    <VoiceInputButton
                      onResult={(text) => setForm((f) => ({ ...f, description: `${f.description}${f.description ? ' ' : ''}${text}` }))}
                    />
                  </div>
                  <textarea
                    required
                    rows={4}
                    className="w-full rounded-xl border border-leaf-200 bg-white px-4 py-2.5 text-earth-900 outline-none transition focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Add more details... (tap 🎤 to speak in Hindi)"
                  />
                </div>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-earth-700">{t('fields.image')}</span>
                  <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                </label>
                <Button type="submit" disabled={saving}>
                  {saving ? t('common.saving') : t('fields.post')}
                </Button>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-leaf-200 border-t-leaf-600" />
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/50 p-10 text-center text-earth-600">
          No posts yet. Be the first to ask something!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => {
            const liked = user && post.likes.includes(user._id);
            return (
              <Card key={post._id} delay={Math.min(i * 0.05, 0.4)}>
                {post.imageUrl && (
                  <img src={post.imageUrl} alt={post.title} className="mb-3 h-40 w-full rounded-xl object-cover" />
                )}
                <Link to={`/forum/${post._id}`}>
                  <h3 className="font-display font-semibold text-earth-900 hover:text-leaf-700">{post.title}</h3>
                </Link>
                <p className="mt-1 line-clamp-2 text-sm text-earth-600">{post.description}</p>
                <div className="mt-3 flex items-center justify-between text-sm text-earth-500">
                  <span>by {post.author?.name || 'Unknown'}</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleLike(post._id)} className={liked ? 'text-rose-500' : 'hover:text-rose-500'}>
                      {liked ? '❤️' : '🤍'} {post.likes.length}
                    </button>
                    <Link to={`/forum/${post._id}`} className="hover:text-leaf-600">
                      💬 {post.comments.length}
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </AnimatedPage>
  );
}
