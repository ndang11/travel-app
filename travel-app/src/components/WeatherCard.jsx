import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export default function WeatherCard({ lat, lon }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    async function fetchWeather() {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        if (!res.ok) throw new Error("Failed to fetch weather");

        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [lat, lon]);

  // ✅ SAFETY GUARDS
  if (loading) return <p>Loading weather...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!weather || !weather.weather || !weather.weather.length) {
    return <p>Weather data unavailable.</p>;
  }

  return (
    <div className="bg-blue-50 border rounded-lg p-4 shadow-sm w-full max-w-md">
      <h3 className="font-semibold text-lg mb-2">
        Current Weather
      </h3>

      <div className="flex items-center gap-4">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />

        <div>
          <p className="text-xl font-bold">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="capitalize text-gray-600">
            {weather.weather[0].description}
          </p>
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
}
