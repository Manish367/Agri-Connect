// Generic treatment/prevention guidance keyed by keywords commonly found in
// plant-disease classifier labels (e.g. PlantVillage-style "Tomato___Late_blight").
// This is general guidance, not a substitute for expert diagnosis — the UI says so.

const GUIDANCE = [
  {
    keywords: ['healthy'],
    treatment: 'No treatment needed — the plant appears healthy.',
    prevention: 'Continue regular watering, balanced fertilization, and routine pest monitoring.',
  },
  {
    keywords: ['blight'],
    treatment: 'Remove and destroy infected leaves. Apply a copper-based or mancozeb fungicide as per label instructions.',
    prevention: 'Avoid overhead watering, ensure good air circulation, and rotate crops each season.',
  },
  {
    keywords: ['rust'],
    treatment: 'Apply a sulfur or triazole-based fungicide. Remove heavily infected leaves.',
    prevention: 'Plant rust-resistant varieties and avoid wetting foliage during irrigation.',
  },
  {
    keywords: ['mildew'],
    treatment: 'Apply a sulfur-based or potassium bicarbonate fungicide spray.',
    prevention: 'Improve air circulation, avoid overcrowding plants, and water at the base.',
  },
  {
    keywords: ['mold', 'mould'],
    treatment: 'Remove affected plant parts and apply a suitable fungicide.',
    prevention: 'Reduce humidity around plants and avoid excess nitrogen fertilizer.',
  },
  {
    keywords: ['spot'],
    treatment: 'Remove infected leaves and apply a copper-based fungicide.',
    prevention: 'Avoid overhead watering and maintain adequate plant spacing for airflow.',
  },
  {
    keywords: ['scab'],
    treatment: 'Apply a fungicide labeled for scab control at early symptom onset.',
    prevention: 'Prune for airflow and remove fallen leaves/fruit that can harbor spores.',
  },
  {
    keywords: ['virus', 'mosaic', 'curl'],
    treatment: 'No chemical cure exists — remove and destroy infected plants to prevent spread.',
    prevention: 'Control insect vectors (aphids, whiteflies) and use virus-free planting material.',
  },
  {
    keywords: ['bacterial'],
    treatment: 'Apply a copper-based bactericide. Remove severely infected plant material.',
    prevention: 'Avoid working in wet fields and disinfect tools between plants.',
  },
];

const DEFAULT_GUIDANCE = {
  treatment: 'Isolate the affected plant and consult a local agriculture extension office for confirmation.',
  prevention: 'Practice crop rotation, use disease-resistant seed varieties, and monitor plants regularly.',
};

function formatLabel(rawLabel) {
  const parts = rawLabel.split('___');
  const cleaned = parts.map((p) =>
    p
      .replace(/_/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
  return cleaned.join(' — ');
}

function getGuidance(rawLabel) {
  const lower = rawLabel.toLowerCase();
  const match = GUIDANCE.find((g) => g.keywords.some((k) => lower.includes(k)));
  return match || DEFAULT_GUIDANCE;
}

module.exports = { formatLabel, getGuidance };
