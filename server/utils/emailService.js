const RESEND_API_KEY = process.env.RESEND_API_KEY;

function welcomeEmailHtml(name) {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  return `
    <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
      <h1 style="color: #16a34a; margin-bottom: 4px;">🌾 Welcome to AgriConnect, ${name}!</h1>
      <p style="color: #444; font-size: 15px;">Your account is ready. Here's what you can do right away:</p>
      <ul style="color: #444; font-size: 15px; line-height: 1.8;">
        <li>Get crop & fertilizer recommendations for your soil and season</li>
        <li>Check live weather and smart irrigation advice</li>
        <li>Track farm income and expenses</li>
        <li>Talk to agriculture experts by chat or video</li>
        <li>See daily market prices and government schemes</li>
      </ul>
      <a href="${clientUrl}/dashboard" style="display:inline-block; background:#16a34a; color:white; padding:10px 22px; border-radius:24px; text-decoration:none; font-weight:600; margin-top:8px;">
        Go to Dashboard
      </a>
      <p style="color: #999; font-size: 12px; margin-top: 24px;">AgriConnect — Smart Agriculture Platform</p>
    </div>
  `;
}

async function sendWelcomeEmail(to, name) {
  if (!RESEND_API_KEY || !to) return;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AgriConnect <onboarding@resend.dev>',
        to,
        subject: '🌾 Welcome to AgriConnect!',
        html: welcomeEmailHtml(name),
      }),
    });

    if (!res.ok) {
      console.error('Welcome email failed:', await res.text());
    }
  } catch (err) {
    console.error('Welcome email failed:', err.message);
  }
}

module.exports = { sendWelcomeEmail };
