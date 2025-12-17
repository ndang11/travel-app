import { useEffect, useState } from "react";
import { getWeatherByCity } from "../services/weatherService";

export default function WeatherBadge({ city }) {
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    if (!city) return;
    getWeatherByCity(city)
      .then(d => setTemp(Math.round(d.main.temp)))
      .catch(() => setTemp(null));
  }, [city]);

  if (temp === null) return null;

  return (
    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-semibold">
      🌦 {temp}°C
    </span>
  );
}