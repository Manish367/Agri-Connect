const asyncHandler = require('../utils/asyncHandler');
const webpush = require('../config/webPush');
const PushSubscription = require('../models/PushSubscription');

const getPublicKey = asyncHandler(async (req, res) => {
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY || '' });
});

const subscribe = asyncHandler(async (req, res) => {
  const { endpoint, keys } = req.body;
  if (!endpoint || !keys?.p256dh || !keys?.auth) {
    res.status(400);
    throw new Error('A valid push subscription (endpoint, keys) is required');
  }

  await PushSubscription.findOneAndUpdate(
    { endpoint },
    { user: req.user._id, endpoint, keys },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(201).json({ message: 'Subscribed to push notifications' });
});

const unsubscribe = asyncHandler(async (req, res) => {
  const { endpoint } = req.body;
  await PushSubscription.deleteOne({ endpoint, user: req.user._id });
  res.json({ message: 'Unsubscribed' });
});

const sendTest = asyncHandler(async (req, res) => {
  const subs = await PushSubscription.find({ user: req.user._id });
  if (subs.length === 0) {
    res.status(404);
    throw new Error('No push subscription found for this account — enable notifications first');
  }

  const payload = JSON.stringify({
    title: '🌾 AgriConnect Alert',
    body: req.body.message || 'This is a test notification from AgriConnect.',
  });

  const results = await Promise.allSettled(
    subs.map((sub) =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: sub.keys },
        payload
      )
    )
  );

  const failed = results.filter((r) => r.status === 'rejected');
  // Clean up subscriptions the push service says are gone (410/404)
  await Promise.all(
    results.map((r, i) =>
      r.status === 'rejected' && [404, 410].includes(r.reason?.statusCode)
        ? PushSubscription.deleteOne({ _id: subs[i]._id })
        : Promise.resolve()
    )
  );

  res.json({ sent: results.length - failed.length, failed: failed.length });
});

module.exports = { getPublicKey, subscribe, unsubscribe, sendTest };
