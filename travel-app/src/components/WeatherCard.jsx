import { useEffect, useState } from "react";
import {
  getWeatherByCity,
  getWeatherByCoords,
} from "../services/weatherService";

export default function WeatherCard({ city, lat, lon }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      let data = null;

      if (lat && lon) {
        data = await getWeatherByCoords(lat, lon);
      } else if (city) {
        data = await getWeatherByCity(city);
      }

      setWeather(data);
    }

    fetchWeather();
  }, [city, lat, lon]);

  if (!weather) {
    return <div className="text-sm text-gray-500">Weather unavailable</div>;
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-lg font-semibold">{weather.name}</p>
        <p className="text-sm text-gray-600 capitalize">
          {weather.weather[0].description}
        </p>
      </div>

      <div className="text-3xl font-bold">
        {Math.round(weather.main.temp)}°C
      </div>
    </div>
  );
}
