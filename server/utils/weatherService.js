function mockWeather(location) {
  // Deterministic-ish mock so the UI has something sensible to render without a key.
  const seed = [...location].reduce((a, c) => a + c.charCodeAt(0), 0);
  const temp = 22 + (seed % 12);
  const humidity = 40 + (seed % 40);
  const wind = 5 + (seed % 15);
  const rainChance = seed % 100;

  return {
    source: 'mock',
    location,
    temperature: temp,
    humidity,
    windSpeed: wind,
    rainChancePercent: rainChance,
    condition: rainChance > 60 ? 'Rain likely' : rainChance > 30 ? 'Partly cloudy' : 'Clear sky',
    advisory:
      rainChance > 60
        ? 'Rain expected — hold off on irrigation and any planned spraying.'
        : 'No significant rain expected — irrigate as per your crop schedule.',
  };
}

async function fetchWeather(location) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return mockWeather(location);
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      location
    )}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`OpenWeather responded with ${response.status}`);
    const data = await response.json();

    const rainChance = data.rain ? 80 : data.clouds?.all ?? 20;

    return {
      source: 'live',
      location: data.name || location,
      temperature: data.main?.temp,
      humidity: data.main?.humidity,
      windSpeed: data.wind?.speed,
      rainChancePercent: rainChance,
      condition: data.weather?.[0]?.description || 'Unknown',
      advisory:
        rainChance > 60
          ? 'Rain expected — hold off on irrigation and any planned spraying.'
          : 'No significant rain expected — irrigate as per your crop schedule.',
    };
  } catch (err) {
    return { ...mockWeather(location), fallbackReason: err.message };
  }
}

module.exports = { fetchWeather, mockWeather };
