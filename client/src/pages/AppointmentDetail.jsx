import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import AnimatedPage from '../components/AnimatedPage';
import Card from '../components/Card';
import Button from '../components/Button';

export default function AppointmentDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [videoRoom, setVideoRoom] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);

  const load = async () => {
    const { data } = await api.get(`/appointments/${id}`);
    setAppointment(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    try {
      await api.post(`/appointments/${id}/messages`, { text: message });
      setMessage('');
      load();
    } finally {
      setSending(false);
    }
  };

  const toggleVideo = async () => {
    if (videoRoom) {
      setVideoRoom(null);
      return;
    }
    setVideoLoading(true);
    try {
      const { data } = await api.get(`/appointments/${id}/video-room`);
      setVideoRoom(data);
    } finally {
      setVideoLoading(false);
    }
  };

  if (loading || !appointment) {
    return (
      <AnimatedPage>
        <div className="flex h-40 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-leaf-200 border-t-leaf-600" />
        </div>
      </AnimatedPage>
    );
  }

  const otherParty = user?.role === 'expert' ? appointment.farmer : appointment.expert;

  return (
    <AnimatedPage className="max-w-3xl">
      <Link to="/expert-consultation" className="mb-4 inline-block text-sm text-leaf-700 hover:underline">
        ← Back to appointments
      </Link>

      <Card hover={false} className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl font-bold text-earth-900">Consultation with {otherParty?.name}</h1>
            <p className="text-sm text-earth-500">📅 {new Date(appointment.scheduledAt).toLocaleString('en-IN')}</p>
          </div>
          <Button onClick={toggleVideo} disabled={videoLoading}>
            {videoLoading ? 'Connecting...' : videoRoom ? 'Hide Video Call' : '📹 Start Video Call'}
          </Button>
        </div>
      </Card>

      {videoRoom && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 500 }}
          className="mb-6 overflow-hidden rounded-2xl border border-leaf-100 shadow-lg"
        >
          {videoRoom.provider === 'jitsi' && (
            <div className="bg-amber-50 px-4 py-2 text-xs text-amber-700">
              📡 Using Jitsi — whoever joins first may need to log in with a Google account to start the room.
            </div>
          )}
          <iframe
            src={videoRoom.url}
            allow="camera; microphone; fullscreen; display-capture; autoplay"
            className="h-full w-full"
            title="Video consultation"
          />
        </motion.div>
      )}

      <Card hover={false}>
        <h2 className="font-display mb-4 font-semibold text-earth-900">💬 Chat</h2>
        <div className="mb-4 max-h-80 space-y-3 overflow-y-auto">
          {appointment.messages.length === 0 && (
            <p className="text-sm text-earth-500">No messages yet — say hello!</p>
          )}
          {appointment.messages.map((m) => {
            const isMine = m.sender?._id === user?._id;
            return (
              <div key={m._id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                    isMine ? 'bg-leaf-600 text-white' : 'bg-leaf-50 text-earth-800'
                  }`}
                >
                  {!isMine && <p className="text-xs font-semibold opacity-70">{m.sender?.name}</p>}
                  <p>{m.text}</p>
                </div>
              </div>
            );
          })}
        </div>
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            className="flex-1 rounded-xl border border-leaf-200 bg-white px-4 py-2.5 text-earth-900 outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" disabled={sending}>
            Send
          </Button>
        </form>
      </Card>
    </AnimatedPage>
  );
}
