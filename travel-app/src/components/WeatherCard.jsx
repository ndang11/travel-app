import React, { useEffect, useState } from "react";
import { getWeather } from "../services/weatherService";

export default function WeatherCard({ lat, lon }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    async function fetchWeather() {
      const data = await getWeather(lat, lon);
      setWeather(data);
    }

    fetchWeather();
  }, [lat, lon]);

  if (!weather) {
    return (
      <div className="border rounded p-4">
        <p>Loading weather...</p>
      </div>
    );
  }

  return (
    <div className="border rounded p-4">
      <h3 className="font-semibold text-lg">
        {weather.name} Weather
      </h3>

      <p className="text-gray-600 capitalize">
        {weather.weather[0].description}
      </p>

      <p className="text-2xl font-bold">
        {Math.round(weather.main.temp)}°C
      </p>
    </div>
  );
}
