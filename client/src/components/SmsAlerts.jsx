import { useState } from 'react';
import api from '../services/api';
import Card from './Card';
import Button from './Button';
import Input from './Input';

export default function SmsAlerts() {
  const [phone, setPhone] = useState('+91');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    setMessage('');
    try {
      const { data } = await api.post('/sms/test', {
        to: phone,
        message: '🌾 AgriConnect: Rain expected tomorrow — hold off on irrigation.',
      });
      setMessage(`Sent! Status: ${data.status}`);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send SMS');
    } finally {
      setSending(false);
    }
  };

  return (
    <Card hover={false} className="mt-6">
      <h3 className="font-display font-semibold text-earth-900">📱 SMS Weather Alerts</h3>
      <p className="mt-1 text-sm text-earth-600">
        Get farm and weather alerts by SMS. On a Twilio trial account, the recipient number must be
        verified in the Twilio console first.
      </p>
      <form onSubmit={handleSend} className="mt-3 flex flex-wrap items-end gap-3">
        <div className="w-48">
          <Input
            label="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+919876543210"
          />
        </div>
        <Button type="submit" disabled={sending}>
          {sending ? 'Sending...' : 'Send Test SMS'}
        </Button>
      </form>
      {message && <p className="mt-3 text-sm text-leaf-700">{message}</p>}
    </Card>
  );
}
