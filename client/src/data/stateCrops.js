// Major crops grown per state, per season — general agronomic reference data.
// States without a specific entry fall back to FALLBACK_CROPS.
export const STATE_CROPS = {
  Bihar: { Kharif: ['Rice', 'Maize', 'Sugarcane', 'Jute'], Rabi: ['Wheat', 'Mustard', 'Gram', 'Lentil'], Zaid: ['Moong', 'Watermelon', 'Cucumber'] },
  'Uttar Pradesh': { Kharif: ['Rice', 'Sugarcane', 'Maize', 'Bajra'], Rabi: ['Wheat', 'Mustard', 'Gram', 'Barley'], Zaid: ['Moong', 'Watermelon', 'Cucumber'] },
  Punjab: { Kharif: ['Rice', 'Cotton', 'Maize', 'Sugarcane'], Rabi: ['Wheat', 'Mustard', 'Gram'], Zaid: ['Moong', 'Watermelon'] },
  Maharashtra: { Kharif: ['Cotton', 'Soybean', 'Jowar', 'Sugarcane'], Rabi: ['Wheat', 'Gram', 'Jowar'], Zaid: ['Groundnut', 'Watermelon'] },
  'Tamil Nadu': { Kharif: ['Rice', 'Cotton', 'Groundnut', 'Sugarcane'], Rabi: ['Rice', 'Gram', 'Mustard'], Zaid: ['Groundnut', 'Cucumber', 'Bottle Gourd'] },
  Rajasthan: { Kharif: ['Bajra', 'Jowar', 'Groundnut', 'Cotton'], Rabi: ['Wheat', 'Mustard', 'Gram'], Zaid: ['Moong', 'Watermelon'] },
  'West Bengal': { Kharif: ['Rice', 'Jute', 'Maize'], Rabi: ['Wheat', 'Mustard', 'Potato'], Zaid: ['Moong', 'Cucumber', 'Bottle Gourd'] },
  Gujarat: { Kharif: ['Cotton', 'Groundnut', 'Bajra', 'Sugarcane'], Rabi: ['Wheat', 'Mustard', 'Gram'], Zaid: ['Groundnut', 'Watermelon'] },
  Karnataka: { Kharif: ['Rice', 'Maize', 'Cotton', 'Groundnut'], Rabi: ['Jowar', 'Gram', 'Sugarcane'], Zaid: ['Groundnut', 'Cucumber'] },
  'Madhya Pradesh': { Kharif: ['Soybean', 'Cotton', 'Maize', 'Rice'], Rabi: ['Wheat', 'Gram', 'Mustard'], Zaid: ['Moong', 'Watermelon'] },
  Kerala: { Kharif: ['Rice', 'Coconut'], Rabi: ['Rice', 'Pulses'], Zaid: ['Rice', 'Cucumber', 'Okra'] },
  Assam: { Kharif: ['Rice', 'Jute', 'Maize'], Rabi: ['Wheat', 'Mustard', 'Rice (Boro)'], Zaid: ['Cucumber', 'Bottle Gourd'] },
  'Arunachal Pradesh': { Kharif: ['Rice', 'Maize'], Rabi: ['Wheat', 'Mustard'], Zaid: ['Millets', 'Cucumber'] },
  Manipur: { Kharif: ['Rice'], Rabi: ['Wheat', 'Pulses'], Zaid: ['Cucumber', 'Bottle Gourd'] },
  Meghalaya: { Kharif: ['Rice', 'Maize'], Rabi: ['Mustard', 'Potato'], Zaid: ['Cucumber', 'Bottle Gourd'] },
  Mizoram: { Kharif: ['Rice', 'Maize'], Rabi: ['Pulses', 'Mustard'], Zaid: ['Cucumber', 'Bottle Gourd'] },
  Nagaland: { Kharif: ['Rice', 'Maize'], Rabi: ['Mustard', 'Pulses'], Zaid: ['Cucumber', 'Bottle Gourd'] },
  Tripura: { Kharif: ['Rice', 'Jute'], Rabi: ['Wheat', 'Mustard', 'Pulses'], Zaid: ['Cucumber', 'Bottle Gourd'] },
  'Andhra Pradesh': { Kharif: ['Rice', 'Cotton', 'Groundnut'], Rabi: ['Rice', 'Gram', 'Mustard'], Zaid: ['Groundnut', 'Okra'] },
  Chhattisgarh: { Kharif: ['Rice', 'Maize'], Rabi: ['Wheat', 'Gram', 'Mustard'], Zaid: ['Moong', 'Cucumber'] },
  Goa: { Kharif: ['Rice', 'Coconut'], Rabi: ['Pulses', 'Cauliflower'], Zaid: ['Cucumber', 'Okra'] },
  Haryana: { Kharif: ['Rice', 'Cotton', 'Bajra', 'Sugarcane'], Rabi: ['Wheat', 'Mustard', 'Gram'], Zaid: ['Moong', 'Watermelon'] },
  'Himachal Pradesh': { Kharif: ['Maize', 'Rice'], Rabi: ['Wheat', 'Barley'], Zaid: ['Peas', 'Capsicum'] },
  Jharkhand: { Kharif: ['Rice', 'Maize'], Rabi: ['Wheat', 'Mustard', 'Gram'], Zaid: ['Cucumber', 'Bottle Gourd'] },
  Odisha: { Kharif: ['Rice', 'Jute'], Rabi: ['Rice', 'Pulses'], Zaid: ['Groundnut', 'Okra'] },
  Sikkim: { Kharif: ['Maize', 'Rice'], Rabi: ['Wheat', 'Mustard'], Zaid: ['Peas', 'Beans'] },
  Telangana: { Kharif: ['Rice', 'Cotton', 'Maize'], Rabi: ['Jowar', 'Gram'], Zaid: ['Groundnut', 'Okra'] },
  Uttarakhand: { Kharif: ['Rice', 'Maize'], Rabi: ['Wheat', 'Mustard'], Zaid: ['Peas', 'Cauliflower'] },
  'Andaman and Nicobar Islands': { Kharif: ['Rice', 'Coconut'], Rabi: ['Cauliflower', 'Pulses'], Zaid: ['Cucumber', 'Okra'] },
  Chandigarh: { Kharif: ['Rice', 'Maize'], Rabi: ['Wheat', 'Cauliflower'], Zaid: ['Cucumber'] },
  'Dadra and Nagar Haveli and Daman and Diu': { Kharif: ['Rice'], Rabi: ['Wheat', 'Pulses'], Zaid: ['Cucumber', 'Okra'] },
  Delhi: { Kharif: ['Rice', 'Bajra'], Rabi: ['Wheat', 'Mustard'], Zaid: ['Cucumber', 'Bottle Gourd'] },
  'Jammu and Kashmir': { Kharif: ['Rice', 'Maize'], Rabi: ['Wheat', 'Mustard'], Zaid: ['Cucumber', 'Tomato'] },
  Ladakh: { Kharif: ['Barley', 'Wheat', 'Peas'], Rabi: ['Cauliflower'], Zaid: ['Cabbage', 'Turnip'] },
  Lakshadweep: { Kharif: ['Coconut'], Rabi: ['Okra'], Zaid: ['Cucumber'] },
  Puducherry: { Kharif: ['Rice', 'Sugarcane'], Rabi: ['Pulses', 'Cauliflower'], Zaid: ['Cucumber', 'Okra'] },
};

export const FALLBACK_CROPS = {
  Kharif: ['Rice', 'Maize', 'Cotton'],
  Rabi: ['Wheat', 'Mustard', 'Gram'],
  Zaid: ['Moong', 'Cucumber'],
};

export const SEASON_MONTHS = {
  Kharif: 'June – October',
  Rabi: 'November – March',
  Zaid: 'March – June',
};
