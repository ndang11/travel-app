import { useEffect, useState } from "react";
import { getWeatherByCity } from "../services/weatherService";

// Weather icon mapping based on condition
function getWeatherIcon(condition) {
  if (!condition) return "🌤️";
  const lower = condition.toLowerCase();
  if (lower.includes("rain")) return "🌧️";
  if (lower.includes("cloud")) return "☁️";
  if (lower.includes("clear") || lower.includes("sun")) return "☀️";
  if (lower.includes("thunder") || lower.includes("storm")) return "⛈️";
  if (lower.includes("snow")) return "❄️";
  if (lower.includes("mist") || lower.includes("fog")) return "🌫️";
  return "🌤️";
}

export default function WeatherBadge({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!city) return;
    getWeatherByCity(city)
      .then((d) => {
        setWeather({
          temp: Math.round(d.main.temp),
          condition: d.weather[0]?.main,
          humidity: d.main.humidity,
        });
      })
      .catch(() => setWeather(null));
  }, [city]);

  if (!weather) return null;

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 text-sky-700 font-medium text-xs border border-sky-200 shadow-sm hover:shadow-md transition-shadow">
      <span className="text-base">{getWeatherIcon(weather.condition)}</span>
      <span>{weather.temp}°C</span>
      <span className="text-sky-500/70">•</span>
      <span className="text-sky-600/80">{weather.humidity}%</span>
    </div>
  );
}
