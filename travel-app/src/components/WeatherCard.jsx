import React, { useEffect, useState } from "react";
import { getWeatherByCity, getWeatherByCoords } from "../services/weatherService";

export default function WeatherCard({ city, lat, lon }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      if (!city && (!lat || !lon)) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        let data;
        if (city) {
          data = await getWeatherByCity(city);
        } else if (lat && lon) {
          data = await getWeatherByCoords(lat, lon);
        }
        setWeather(data);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city, lat, lon]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-sm">Unable to load weather</p>
        <p className="text-xs text-gray-400 mt-1">{error}</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-sm">No weather data available</p>
      </div>
    );
  }

  return (
    <div className="text-center py-4">
      <h3 className="text-2xl font-bold text-gray-900">{weather.name}, {weather.sys?.country}</h3>
      <p className="text-gray-600 capitalize mt-1">{weather.weather?.[0]?.description}</p>
      <p className="text-5xl font-bold text-indigo-600 mt-2">{Math.round(weather.main?.temp)}°C</p>
      <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
        <span>Humidity: {weather.main?.humidity}%</span>
        <span>Wind: {weather.wind?.speed} m/s</span>
      </div>
    </div>
  );
}
