import { useEffect, useState } from 'react';
import { getPushSubscriptionStatus, subscribeToPush, sendTestNotification } from '../services/push';
import Card from './Card';
import Button from './Button';

export default function NotificationSettings() {
  const [status, setStatus] = useState('checking');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getPushSubscriptionStatus().then(setStatus);
  }, []);

  const handleEnable = async () => {
    setBusy(true);
    setMessage('');
    try {
      if (Notification.permission === 'denied') {
        setMessage('Notifications are blocked in your browser settings — enable them there first.');
        return;
      }
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setMessage('Permission not granted.');
        return;
      }
      await subscribeToPush();
      setStatus('subscribed');
      setMessage('Notifications enabled!');
    } catch (err) {
      setMessage(err.message || 'Could not enable notifications.');
    } finally {
      setBusy(false);
    }
  };

  const handleTest = async () => {
    setBusy(true);
    setMessage('');
    try {
      const result = await sendTestNotification('Rain expected tomorrow — hold off on irrigation.');
      setMessage(result.sent > 0 ? 'Test notification sent — check your notifications!' : 'No active subscription found.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send test notification.');
    } finally {
      setBusy(false);
    }
  };

  if (status === 'unsupported') return null;

  return (
    <Card hover={false} className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-semibold text-earth-900">🔔 Push Notifications</h3>
          <p className="text-sm text-earth-600">
            {status === 'subscribed'
              ? 'Notifications are enabled on this device.'
              : 'Get weather and farm alerts even when the app is closed.'}
          </p>
        </div>
        <div className="flex gap-2">
          {status !== 'subscribed' && (
            <Button onClick={handleEnable} disabled={busy}>
              {busy ? 'Enabling...' : 'Enable Notifications'}
            </Button>
          )}
          {status === 'subscribed' && (
            <Button variant="outline" onClick={handleTest} disabled={busy}>
              {busy ? 'Sending...' : 'Send Test Alert'}
            </Button>
          )}
        </div>
      </div>
      {message && <p className="mt-3 text-sm text-leaf-700">{message}</p>}
    </Card>
  );
}
