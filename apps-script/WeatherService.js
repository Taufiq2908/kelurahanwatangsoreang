/**
 * WeatherService.js
 * Fetches weather data from WeatherAPI, caches it, and normalizes it to match the existing Open-Meteo format.
 */

function getWeather() {
  const LAT = -3.995;
  const LNG = 119.632;
  const CACHE_KEY = `weather_${LAT}_${LNG}`;
  const CACHE_TTL = 600; // 10 minutes

  const cache = CacheService.getScriptCache();
  const cachedData = cache.get(CACHE_KEY);
  
  if (cachedData) {
    try {
      return JSON.parse(cachedData);
    } catch (e) {
      // Ignored, proceed to fetch
    }
  }

  const apiKey = PropertiesService.getScriptProperties().getProperty('WEATHER_API_KEY');
  if (!apiKey) {
    throw new Error('WEATHER_API_KEY is not set in Script Properties.');
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${LAT},${LNG}&days=3&aqi=yes&alerts=yes`;
  
  let responseText = null;
  let success = false;
  let errorMsg = '';

  for (let i = 0; i < 2; i++) {
    try {
      const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
      if (response.getResponseCode() === 200) {
        responseText = response.getContentText();
        success = true;
        break;
      } else {
        errorMsg = `HTTP ${response.getResponseCode()}: ${response.getContentText()}`;
      }
    } catch (e) {
      errorMsg = e.message;
    }
    // Simple backoff
    Utilities.sleep(1000);
  }

  if (!success || !responseText) {
    throw new Error(`Gagal mengambil data cuaca dari WeatherAPI: ${errorMsg}`);
  }

  const raw = JSON.parse(responseText);
  const normalized = normalizeWeather(raw);

  cache.put(CACHE_KEY, JSON.stringify(normalized), CACHE_TTL);
  return normalized;
}

function normalizeWeather(raw) {
  const current = raw.current;
  const forecastDays = raw.forecast.forecastday;
  const todayForecast = forecastDays[0].day;

  // Map current
  const currentData = {
    temperature: Math.round(current.temp_c),
    feelsLike: Math.round(current.feelslike_c),
    humidity: current.humidity,
    windSpeed: Math.round(current.wind_kph),
    windDirection: current.wind_dir,
    precipitation: current.precip_mm,
    weatherCode: mapWeatherApiToWMO(current.condition.code),
    uv: current.uv,
    conditionText: translateCondition(current.condition.text),
    conditionIcon: current.condition.icon,
    chance_of_rain: todayForecast.daily_chance_of_rain
  };

  // Map hourly (next 24 hours starting from current hour)
  const hourlyData = [];
  const now = new Date();
  const nowHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()).getTime();

  for (const day of forecastDays) {
    for (const hour of day.hour) {
      const hourTime = new Date(hour.time).getTime();
      if (hourTime >= nowHour && hourlyData.length < 24) {
        hourlyData.push({
          time: hour.time, // Format: YYYY-MM-DD HH:mm
          temperature: Math.round(hour.temp_c),
          weatherCode: mapWeatherApiToWMO(hour.condition.code),
          precipProbability: hour.chance_of_rain,
          windSpeed: Math.round(hour.wind_kph)
        });
      }
    }
  }

  // Map daily (3 days)
  const dailyData = forecastDays.map(day => {
    return {
      date: day.date,
      weatherCode: mapWeatherApiToWMO(day.day.condition.code),
      tempMax: Math.round(day.day.maxtemp_c),
      tempMin: Math.round(day.day.mintemp_c),
      precipSum: day.day.totalprecip_mm,
      precipProbMax: day.day.daily_chance_of_rain,
      windMax: Math.round(day.day.maxwind_kph)
    };
  });

  return {
    current: currentData,
    hourly: hourlyData,
    daily: dailyData,
    fetchedAt: new Date().toISOString(),
    last_updated: current.last_updated,
    source: 'WeatherAPI',
    location: 'Kelurahan Watang Soreang'
  };
}

// Maps WeatherAPI condition codes to Open-Meteo WMO codes for backward compatibility
function mapWeatherApiToWMO(code) {
  const map = {
    1000: 0,
    1003: 1,
    1006: 3,
    1009: 3,
    1030: 45,
    1063: 51,
    1066: 71,
    1069: 71,
    1072: 51,
    1087: 95,
    1114: 71,
    1117: 75,
    1135: 45,
    1148: 48,
    1150: 51,
    1153: 53,
    1168: 53,
    1171: 55,
    1180: 61,
    1183: 61,
    1186: 63,
    1189: 63,
    1192: 65,
    1195: 65,
    1198: 61,
    1201: 65,
    1204: 71,
    1207: 75,
    1210: 71,
    1213: 71,
    1216: 73,
    1219: 73,
    1222: 75,
    1225: 75,
    1237: 77,
    1240: 80,
    1243: 81,
    1246: 82,
    1249: 71,
    1252: 75,
    1255: 71,
    1258: 75,
    1261: 77,
    1264: 77,
    1273: 95,
    1276: 96,
    1279: 95,
    1282: 96
  };
  return map[code] || 0;
}

function translateCondition(text) {
  const t = text.toLowerCase();
  if (t.includes('sunny') || t.includes('clear')) return 'Cerah';
  if (t.includes('partly cloudy')) return 'Cerah Berawan';
  if (t.includes('overcast')) return 'Mendung';
  if (t.includes('cloudy')) return 'Berawan';
  if (t.includes('mist') || t.includes('fog')) return 'Berkabut';
  if (t.includes('patchy rain') || t.includes('light rain') || t.includes('drizzle')) return 'Hujan Ringan';
  if (t.includes('moderate rain')) return 'Hujan Sedang';
  if (t.includes('heavy rain') || t.includes('torrential')) return 'Hujan Lebat';
  if (t.includes('thunder')) return 'Badai Petir';
  if (t.includes('snow') || t.includes('blizzard') || t.includes('sleet') || t.includes('ice')) return 'Bersalju';
  return text;
}
