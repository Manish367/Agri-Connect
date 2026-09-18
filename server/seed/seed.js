require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const MarketPrice = require('../models/MarketPrice');
const Scheme = require('../models/Scheme');

const crops = ['Rice', 'Wheat', 'Potato', 'Onion', 'Tomato', 'Maize', 'Cotton', 'Soybean', 'Sugarcane', 'Mustard'];
const marketsByState = {
  'Uttar Pradesh': 'Lucknow Mandi',
  Punjab: 'Ludhiana Mandi',
  Maharashtra: 'Pune Mandi',
  'Madhya Pradesh': 'Indore Mandi',
  'West Bengal': 'Kolkata Mandi',
  Karnataka: 'Bengaluru Mandi',
  Gujarat: 'Ahmedabad Mandi',
  'Tamil Nadu': 'Chennai Mandi',
  Bihar: 'Patna Mandi',
  Rajasthan: 'Jaipur Mandi',
  Haryana: 'Karnal Mandi',
  Telangana: 'Hyderabad Mandi',
  Assam: 'Guwahati Mandi',
};

const basePrices = {
  Rice: 2100,
  Wheat: 2275,
  Potato: 1200,
  Onion: 1800,
  Tomato: 1500,
  Maize: 1950,
  Cotton: 6800,
  Soybean: 4300,
  Sugarcane: 340,
  Mustard: 5450,
};

function buildMarketPrices() {
  const rows = [];
  Object.entries(marketsByState).forEach(([state, market]) => {
    crops.forEach((crop) => {
      const jitter = Math.round((Math.random() - 0.5) * basePrices[crop] * 0.15);
      rows.push({
        crop,
        market,
        state,
        pricePerQuintal: Math.max(100, basePrices[crop] + jitter),
        date: new Date(),
      });
    });
  });
  return rows;
}

const schemes = [
  {
    title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    category: 'Income Support',
    description: 'Income support scheme providing direct cash transfers to landholding farmer families.',
    benefits: '₹6,000 per year in three equal installments paid directly to bank accounts.',
    eligibility: 'All landholding farmer families, subject to exclusion criteria for higher-income categories.',
    states: ['All India'],
    applyLink: 'https://pmkisan.gov.in',
  },
  {
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    category: 'Insurance',
    description: 'Crop insurance scheme protecting farmers against crop loss due to natural calamities, pests and diseases.',
    benefits: 'Low premium rates (2% Kharif, 1.5% Rabi, 5% commercial/horticulture) with full sum insured coverage.',
    eligibility: 'All farmers, including sharecroppers and tenant farmers, growing notified crops in notified areas.',
    states: ['All India'],
    applyLink: 'https://pmfby.gov.in',
  },
  {
    title: 'Kisan Credit Card (KCC)',
    category: 'Loan',
    description: 'Provides farmers with timely access to credit for cultivation and other needs at low interest rates.',
    benefits: 'Short-term credit up to ₹3 lakh at 4% effective interest rate (with timely repayment subsidy).',
    eligibility: 'Farmers, tenant farmers, sharecroppers, and self-help groups engaged in agriculture.',
    states: ['All India'],
    applyLink: 'https://www.myscheme.gov.in/schemes/kcc',
  },
  {
    title: 'Soil Health Card Scheme',
    category: 'Subsidy',
    description: 'Provides farmers with soil nutrient status and recommendations on appropriate dosage of nutrients.',
    benefits: 'Free soil testing every 2 years with crop-wise fertilizer and nutrient recommendations.',
    eligibility: 'All farmers with cultivable land.',
    states: ['All India'],
    applyLink: 'https://soilhealth.dac.gov.in',
  },
  {
    title: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    category: 'Equipment',
    description: 'Promotes farm mechanization by subsidizing purchase of agricultural machinery and equipment.',
    benefits: 'Subsidy of 25-50% on tractors, power tillers, harvesters and other farm equipment.',
    eligibility: 'Individual farmers, farmer groups, and cooperatives; higher subsidy for SC/ST/women farmers.',
    states: ['All India'],
    applyLink: 'https://agrimachinery.nic.in',
  },
  {
    title: 'Rashtriya Krishi Vikas Yojana (RKVY)',
    category: 'Subsidy',
    description: 'State-driven scheme to promote holistic growth of agriculture and allied sectors.',
    benefits: 'Funding for state-specific agricultural infrastructure, value chains, and farmer-focused projects.',
    eligibility: 'Farmers and farmer producer organizations under state government implementation.',
    states: ['Uttar Pradesh', 'Punjab', 'Maharashtra', 'Madhya Pradesh'],
    applyLink: 'https://rkvy.nic.in',
  },
  {
    title: 'Paramparagat Krishi Vikas Yojana (PKVY)',
    category: 'Subsidy',
    description: 'Promotes organic farming through cluster-based approach and certification support.',
    benefits: '₹50,000 per hectare over 3 years for organic inputs, certification and marketing support.',
    eligibility: 'Farmer clusters willing to adopt organic farming practices.',
    states: ['All India'],
    applyLink: 'https://pgsindia-ncof.gov.in',
  },
];

async function seed() {
  await connectDB();

  await MarketPrice.deleteMany({});
  await Scheme.deleteMany({});

  const marketRows = buildMarketPrices();
  await MarketPrice.insertMany(marketRows);
  await Scheme.insertMany(schemes);

  console.log(`Seeded ${marketRows.length} market price rows and ${schemes.length} schemes.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
