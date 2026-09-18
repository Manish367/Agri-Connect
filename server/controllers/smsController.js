const asyncHandler = require('../utils/asyncHandler');
const twilioClient = require('../config/twilio');

const sendTestSms = asyncHandler(async (req, res) => {
  const { to, message } = req.body;

  if (!twilioClient) {
    res.status(503);
    throw new Error('SMS is not configured on the server');
  }

  if (!to || !/^\+[1-9]\d{7,14}$/.test(to)) {
    res.status(400);
    throw new Error('A valid phone number in international format (e.g. +919876543210) is required');
  }

  try {
    const sent = await twilioClient.messages.create({
      to,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      body: message || '🌾 AgriConnect: This is a test weather/farm alert.',
    });
    res.json({ sid: sent.sid, status: sent.status });
  } catch (err) {
    res.status(400);
    throw new Error(err.message || 'Failed to send SMS');
  }
});

module.exports = { sendTestSms };
