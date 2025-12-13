const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getWeather(lat, lon) {
  try {
    if (!API_KEY) {
      throw new Error("Missing OpenWeather API key");
    }

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!res.ok) throw new Error("Weather fetch failed");

    const data = await res.json();

    return {
      temp: data.main.temp,
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
      city: data.name,
    };
  } catch (err) {
    console.error("Weather error:", err);
    return null;
  }
}
