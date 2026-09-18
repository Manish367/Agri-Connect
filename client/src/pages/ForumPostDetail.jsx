import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import AnimatedPage from '../components/AnimatedPage';
import Card from '../components/Card';
import Button from '../components/Button';

export default function ForumPostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [posting, setPosting] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await api.get(`/forum/${id}`);
    setPost(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggleLike = async () => {
    await api.post(`/forum/${id}/like`);
    load();
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setPosting(true);
    try {
      await api.post(`/forum/${id}/comments`, { text: comment });
      setComment('');
      load();
    } finally {
      setPosting(false);
    }
  };

  if (loading || !post) {
    return (
      <AnimatedPage>
        <div className="flex h-40 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-leaf-200 border-t-leaf-600" />
        </div>
      </AnimatedPage>
    );
  }

  const liked = user && post.likes.includes(user._id);

  return (
    <AnimatedPage className="max-w-3xl">
      <Link to="/forum" className="mb-4 inline-block text-sm text-leaf-700 hover:underline">
        ← Back to forum
      </Link>

      <Card hover={false}>
        {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mb-4 max-h-96 w-full rounded-xl object-cover" />}
        <h1 className="font-display text-2xl font-bold text-earth-900">{post.title}</h1>
        <p className="mt-1 text-sm text-earth-500">by {post.author?.name}</p>
        <p className="mt-4 whitespace-pre-line text-earth-700">{post.description}</p>

        <button
          onClick={toggleLike}
          className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${
            liked ? 'bg-rose-100 text-rose-600' : 'bg-leaf-100 text-leaf-700 hover:bg-leaf-200'
          }`}
        >
          {liked ? '❤️' : '🤍'} {post.likes.length} likes
        </button>
      </Card>

      <Card hover={false} className="mt-6">
        <h2 className="font-display mb-4 font-semibold text-earth-900">Comments ({post.comments.length})</h2>
        <form onSubmit={handleComment} className="mb-6 flex gap-2">
          <input
            className="flex-1 rounded-xl border border-leaf-200 bg-white px-4 py-2.5 text-earth-900 outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="submit" disabled={posting}>
            Post
          </Button>
        </form>

        <div className="space-y-3">
          {post.comments.map((c, i) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-xl bg-leaf-50/60 p-3"
            >
              <p className="text-sm font-semibold text-earth-800">{c.author?.name || 'Unknown'}</p>
              <p className="text-sm text-earth-700">{c.text}</p>
            </motion.div>
          ))}
          {post.comments.length === 0 && <p className="text-sm text-earth-500">No comments yet.</p>}
        </div>
      </Card>
    </AnimatedPage>
  );
}
