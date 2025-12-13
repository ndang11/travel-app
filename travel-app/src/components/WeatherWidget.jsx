import React, { useEffect, useState } from "react";
import { getCurrentWeather } from "../services/weatherService";

export default function WeatherWidget({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      const data = await getCurrentWeather(city);
      setWeather(data);
    };

    fetchWeather();
  }, [city]);

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div className="border rounded p-4 mb-4">
      <h3 className="font-bold text-lg">{weather.name}</h3>
      <p>{weather.weather[0].description}</p>
      <p>{weather.main.temp}°C</p>
    </div>
  );
}
