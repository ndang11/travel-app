const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

if (!API_KEY) {
  console.warn("OpenWeather API key is missing. Set VITE_OPENWEATHER_API_KEY in .env file");
}

/**
 * Fetch current weather by city name
 * @param {string} city - City name
 * @returns {Promise<Object>} Weather data
 */
export async function getWeatherByCity(city) {
  if (!city) throw new Error("City name is required");
  
  if (!API_KEY) {
    throw new Error("OpenWeather API key is missing");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getWeatherByCity error:", error);
    throw error;
  }
}

/**
 * Fetch current weather by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather data
 */
export async function getWeatherByCoords(lat, lon) {
  if (lat === undefined || lon === undefined) {
    throw new Error("Latitude and longitude are required");
  }
  
  if (!API_KEY) {
    throw new Error("OpenWeather API key is missing");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getWeatherByCoords error:", error);
    throw error;
  }
}

/**
 * Fetch 5-day forecast (free tier API - returns data in 3-hour blocks)
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Forecast data
 */
export async function getForecast(lat, lon) {
  if (lat === undefined || lon === undefined) {
    throw new Error("Latitude and longitude are required");
  }
  
  if (!API_KEY) {
    throw new Error("OpenWeather API key is missing");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Forecast API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform 3-hour forecast to daily forecast
    const dailyData = transformToDailyForecast(data.list);
    
    return {
      daily: dailyData,
      city: data.city,
    };
  } catch (error) {
    console.error("getForecast error:", error);
    throw error;
  }
}

/**
 * Transform 3-hour forecast data to daily data
 */
function transformToDailyForecast(forecastList) {
  if (!forecastList || !Array.isArray(forecastList)) return [];
  
  const dailyMap = new Map();
  
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        dt: item.dt,
        temp: { day: item.main.temp, min: item.main.temp, max: item.main.temp },
        weather: item.weather,
        humidity: item.main.humidity,
        wind: item.wind.speed,
      });
    } else {
      const existing = dailyMap.get(date);
      existing.temp.min = Math.min(existing.temp.min, item.main.temp);
      existing.temp.max = Math.max(existing.temp.max, item.main.temp);
      existing.temp.day = (existing.temp.day + item.main.temp) / 2;
    }
  });
  
  return Array.from(dailyMap.values()).slice(0, 7);
}
