// Rule-based fertilizer recommendation. Standard N-P-K (kg/acre) requirements per crop,
// adjusted for soil type's nutrient retention, and optionally reduced by the farmer's own
// soil test values. Converts the resulting N-P-K gap into common fertilizer bag quantities
// (Urea 46% N, DAP 18-46-0, MOP 60% K2O) — approximate figures for guidance, not lab-grade.

const FERTILIZER_DB = {
  Rice: { n: 120, p: 60, k: 40, instructions: 'Apply DAP and MOP as a basal dose before transplanting. Split Urea into 3 doses: basal, active tillering (~25 days), and panicle initiation (~50 days).' },
  Wheat: { n: 120, p: 60, k: 40, instructions: 'Apply full DAP and MOP at sowing. Split Urea into 2 doses: half at sowing, half at first irrigation (~21 days).' },
  Maize: { n: 120, p: 60, k: 40, instructions: 'Apply DAP and MOP as basal dose. Split Urea into 2-3 doses at knee-high and tasseling stages.' },
  Sugarcane: { n: 280, p: 92, k: 120, instructions: 'Heavy feeder — apply in 3 splits (planting, 45 days, 90 days). Earth up after each Urea application.' },
  Cotton: { n: 80, p: 40, k: 40, instructions: 'Apply DAP and MOP as basal dose. Split Urea into 2 doses at squaring and flowering stages.' },
  Soybean: { n: 20, p: 60, k: 40, instructions: 'Being a legume, Soybean fixes its own nitrogen — only a small starter dose of Urea is needed. Apply full DAP and MOP as basal dose.' },
  Groundnut: { n: 20, p: 40, k: 40, instructions: 'Legume crop — low nitrogen requirement. Apply full dose as basal at sowing along with gypsum for pod development.' },
  'Bajra (Pearl Millet)': { n: 80, p: 40, k: 0, instructions: 'Apply DAP as basal dose. Split Urea into 2 doses at sowing and 30 days after sowing.' },
  'Jowar (Sorghum)': { n: 80, p: 40, k: 0, instructions: 'Apply DAP as basal dose. Split Urea between sowing and 30 days after sowing.' },
  Mustard: { n: 80, p: 40, k: 40, instructions: 'Apply full DAP and MOP as basal dose. Split Urea into 2 doses at sowing and first irrigation.' },
  'Gram (Chickpea)': { n: 20, p: 40, k: 20, instructions: 'Legume crop — minimal nitrogen needed. Apply full dose as basal at sowing.' },
  Potato: { n: 120, p: 80, k: 100, instructions: 'Potato needs high potassium for tuber development. Apply full basal dose at planting; top-dress Urea at earthing-up (~30 days).' },
  Onion: { n: 100, p: 50, k: 50, instructions: 'Apply DAP and MOP as basal dose. Split Urea into 3 doses through the vegetative stage.' },
  Tomato: { n: 100, p: 50, k: 50, instructions: 'Apply DAP and MOP as basal dose. Split Urea into 3 doses through flowering and fruiting.' },
  Tea: { n: 120, p: 40, k: 40, instructions: 'Perennial crop — apply in 3-4 split doses through the growing season, avoiding application right before heavy rain.' },
  Cashew: { n: 50, p: 25, k: 25, instructions: 'Apply in 2 split doses — start and end of monsoon — around the tree canopy drip line.' },
  Coconut: { n: 50, p: 32, k: 120, instructions: 'High potassium requirement. Apply in 2 split doses per year in circular trenches around the palm base.' },
  Watermelon: { n: 80, p: 40, k: 40, instructions: 'Apply DAP and MOP as basal dose. Split Urea into 2 doses at vine development and flowering.' },
  Cucumber: { n: 60, p: 40, k: 40, instructions: 'Apply DAP and MOP as basal dose. Split Urea into 2 doses at vine development and flowering.' },
  'Moong (Green Gram)': { n: 20, p: 40, k: 20, instructions: 'Legume crop — minimal nitrogen needed. Apply full dose as basal at sowing.' },
};

const SOIL_ADJUSTMENT = {
  Sandy: 1.15,
  Laterite: 1.1,
  Clay: 0.9,
  Alluvial: 1,
  Black: 1,
  Red: 1,
  Loamy: 1,
};

function recommendFertilizer({ crop, soilType, n, p, k }) {
  const base = FERTILIZER_DB[crop];
  if (!base) return null;

  const factor = SOIL_ADJUSTMENT[soilType] ?? 1;
  const targetN = base.n * factor;
  const targetP = base.p * factor;
  const targetK = base.k * factor;

  const haveN = n !== undefined && n !== null && n !== '' ? Number(n) : null;
  const haveP = p !== undefined && p !== null && p !== '' ? Number(p) : null;
  const haveK = k !== undefined && k !== null && k !== '' ? Number(k) : null;

  const neededN = Math.max(0, targetN - (haveN ?? 0));
  const neededP = Math.max(0, targetP - (haveP ?? 0));
  const neededK = Math.max(0, targetK - (haveK ?? 0));

  const ureaKg = Math.round(neededN / 0.46);
  const dapKg = Math.round(neededP / 0.46);
  const mopKg = Math.round(neededK / 0.6);

  return {
    crop,
    recommendedNPK: { n: Math.round(targetN), p: Math.round(targetP), k: Math.round(targetK) },
    fertilizers: [
      { name: 'Urea (46% N)', quantityKgPerAcre: Math.max(0, ureaKg) },
      { name: 'DAP (18-46-0)', quantityKgPerAcre: Math.max(0, dapKg) },
      { name: 'MOP (60% K2O)', quantityKgPerAcre: Math.max(0, mopKg) },
    ],
    instructions: base.instructions,
    usedSoilTest: haveN !== null || haveP !== null || haveK !== null,
  };
}

module.exports = { FERTILIZER_DB, recommendFertilizer };
