const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeather(lat, lon) {
  try {
    const res = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!res.ok) {
      throw new Error("Weather fetch failed");
    }

    return await res.json();
  } catch (error) {
    console.error("getWeather error:", error);
    return null;
  }
}
