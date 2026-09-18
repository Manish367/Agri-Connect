const twilio = require('twilio');

let client = null;

// Prefer the simple Account SID + Auth Token auth — API Key auth needs specific
// scoped permissions on the key itself and is easy to misconfigure (seen as
// "Authorization Error: actor doesn't have any assertions" if the key lacks
// the right grants).
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
} else if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_API_KEY_SID && process.env.TWILIO_API_KEY_SECRET) {
  client = twilio(process.env.TWILIO_API_KEY_SID, process.env.TWILIO_API_KEY_SECRET, {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
  });
}

module.exports = client;
