// Daily.co room provisioning. Used as the preferred video provider because,
// unlike meet.jit.si's free public server, Daily rooms don't require either
// participant to authenticate as a "moderator" before the call opens.
// Falls back to null (caller then uses Jitsi) when no API key is configured.
const DAILY_API_KEY = process.env.DAILY_API_KEY;
const DAILY_BASE = 'https://api.daily.co/v1';

async function getOrCreateDailyRoom(roomName) {
  if (!DAILY_API_KEY) return null;

  const headers = {
    Authorization: `Bearer ${DAILY_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const existing = await fetch(`${DAILY_BASE}/rooms/${roomName}`, { headers });
  if (existing.ok) {
    const data = await existing.json();
    return data.url;
  }

  const created = await fetch(`${DAILY_BASE}/rooms`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: roomName,
      privacy: 'public',
      properties: {
        enable_chat: true,
        enable_screenshare: true,
        exp: Math.round(Date.now() / 1000) + 60 * 60 * 4, // room usable for 4 hours
      },
    }),
  });

  if (!created.ok) {
    const errText = await created.text();
    throw new Error(`Daily.co room creation failed (${created.status}): ${errText}`);
  }

  const data = await created.json();
  return data.url;
}

module.exports = { getOrCreateDailyRoom, isDailyConfigured: !!DAILY_API_KEY };
