const twilioClient = require('../config/twilio');

function toE164(phone) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  if (!digits) return null;
  if (phone.trim().startsWith('+')) return `+${digits}`;
  // Assume Indian numbers when no country code is given.
  return digits.length === 10 ? `+91${digits}` : `+${digits}`;
}

async function sendWelcomeSms(phone, name) {
  if (!twilioClient || !phone) return;
  const to = toE164(phone);
  if (!to || !/^\+[1-9]\d{7,14}$/.test(to)) return;

  try {
    await twilioClient.messages.create({
      to,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      body: `🌾 Welcome to AgriConnect, ${name}! Your account is ready — log in for crop advice, weather alerts, market prices and more.`,
    });
  } catch (err) {
    console.error('Welcome SMS failed:', err.message);
  }
}

module.exports = { sendWelcomeSms };
