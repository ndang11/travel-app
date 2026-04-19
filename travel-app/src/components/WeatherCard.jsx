import React, { useEffect, useState } from "react";
import { getWeatherByCity, getWeatherByCoords } from "../services/weatherService";

const getWeatherIcon = (condition) => {
  if (!condition) return "🌤️";
  const c = condition.toLowerCase();
  if (c.includes("rain")) return "🌧️";
  if (c.includes("cloud")) return "☁️";
  if (c.includes("clear")) return "☀️";
  if (c.includes("snow")) return "❄️";
  if (c.includes("thunder")) return "⛈️";
  if (c.includes("fog") || c.includes("mist")) return "🌫️";
  return "🌤️";
};

const getBgGradient = (condition) => {
  if (!condition) return "from-amber-100 to-orange-100";
  const c = condition.toLowerCase();
  if (c.includes("rain")) return "from-blue-100 to-slate-200";
  if (c.includes("cloud")) return "from-gray-100 to-slate-200";
  if (c.includes("clear")) return "from-amber-100 to-orange-100";
  if (c.includes("snow")) return "from-blue-50 to-white";
  return "from-amber-100 to-orange-100";
};

export default function WeatherCard({ city, coords, lat, lon }) {
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
        } else {
          throw new Error("No city or coordinates provided");
        }
        setWeather(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load weather");
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city, coords, lat, lon]);

  if (loading) {
    return (
      <div className="bg-gray-100 rounded-2xl p-6 animate-pulse">
        <div className="h-6 bg-gray-300 w-1/3 rounded mb-4" />
        <div className="h-16 bg-gray-300 w-1/2 rounded" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 text-center">
        <span className="text-4xl block mb-2">🌡️</span>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  const condition = weather?.weather?.[0]?.description || "";
  const temp = Math.round(weather?.main?.temp || 0);
  const feelsLike = Math.round(weather?.main?.feels_like || 0);
  const humidity = weather?.main?.humidity || 0;
  const windSpeed = weather?.wind?.speed || 0;
  const icon = getWeatherIcon(condition);
  const gradient = getBgGradient(condition);

  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6`}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-gray-500 text-sm font-medium">Current Weather</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{weather?.name}</h3>
        </div>
        <span className="text-6xl">{icon}</span>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl font-extrabold text-gray-900">{temp}°</span>
        <div>
          <p className="text-gray-600 font-medium capitalize">{condition}</p>
          <p className="text-gray-500 text-sm">Feels like {feelsLike}°</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200/50">
        <div className="text-center">
          <div className="text-2xl mb-1">💧</div>
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="font-bold text-gray-900">{humidity}%</p>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">💨</div>
          <p className="text-sm text-gray-500">Wind</p>
          <p className="font-bold text-gray-900">{windSpeed} m/s</p>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">🌡️</div>
          <p className="text-sm text-gray-500">Pressure</p>
          <p className="font-bold text-gray-900">{weather?.main?.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
}