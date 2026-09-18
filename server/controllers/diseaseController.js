const asyncHandler = require('../utils/asyncHandler');
const { formatLabel, getGuidance } = require('../utils/diseaseInfo');

const HF_MODEL = 'linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification';

const detectDisease = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('An image file is required');
  }

  const token = process.env.HUGGINGFACE_API_TOKEN;
  if (!token) {
    res.status(503);
    throw new Error('Disease detection is not configured on the server');
  }

  const response = await fetch(`https://router.huggingface.co/hf-inference/models/${HF_MODEL}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': req.file.mimetype,
    },
    body: req.file.buffer,
  });

  const data = await response.json();

  if (!response.ok) {
    res.status(response.status === 503 ? 503 : 400);
    throw new Error(
      data?.error
        ? `Model error: ${data.error}${data.estimated_time ? ` (retry in ~${Math.ceil(data.estimated_time)}s, the model is loading)` : ''}`
        : 'Disease detection failed'
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    res.status(502);
    throw new Error('Unexpected response from the disease detection model');
  }

  const results = data
    .slice(0, 3)
    .map((r) => ({
      label: formatLabel(r.label),
      confidencePercent: Math.round(r.score * 100),
      ...getGuidance(r.label),
    }));

  res.json({ predictions: results });
});

module.exports = { detectDisease };
