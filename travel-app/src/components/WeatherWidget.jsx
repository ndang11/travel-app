import { useEffect, useState } from "react";
import { getWeatherByCity } from "../services/weatherService";

export default function WeatherWidget({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!city) return;

    async function loadWeather() {
      const data = await getWeatherByCity(city);
      setWeather(data);
    }

    loadWeather();
  }, [city]);

  if (!weather) {
    return (
      <div className="px-3 py-1 rounded-full bg-gray-200 text-xs">
        Weather unavailable
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
      <span>{weather.name}</span>
      <span className="font-semibold">
        {Math.round(weather.main.temp)}°C
      </span>
    </div>
  );
}