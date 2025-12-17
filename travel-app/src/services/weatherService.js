
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

if (!API_KEY) {
  console.error("OpenWeather API key is missing. Please set VITE_OPENWEATHER_API_KEY in your .env file");
}

/**
 * Fetch current weather by city name
 * @param {string} city
 * @returns {Promise<Object>}
 */
export async function getWeatherByCity(city) {
  if (!API_KEY) throw new Error("OpenWeather API key is missing");

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error(`City weather fetch failed: ${res.status} ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("City weather fetch failed");
  }
}

/**
 * Fetch current weather by latitude & longitude
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<Object>}
 */
export async function getWeatherByCoords(lat, lon) {
  if (!API_KEY) throw new Error("OpenWeather API key is missing");

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error(`Coords weather fetch failed: ${res.status} ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Coords weather fetch failed");
  }
}

/**
 * Fetch forecast by latitude & longitude
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<Object>}
 */
export async function getForecast(lat, lon) {
  if (!API_KEY) throw new Error("OpenWeather API key is missing");

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error(`Forecast fetch failed: ${res.status} ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Forecast fetch failed");
  }
}
