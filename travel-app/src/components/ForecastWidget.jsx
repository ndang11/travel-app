import React, { useEffect, useState } from "react";
import { getForecast } from "../services/weatherService";

const getDayName = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

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

export default function ForecastWidget({ lat, lon }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    async function fetchForecast() {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getForecast(lat, lon);
        setForecast(data);
      } catch (err) {
        setError("Unable to load forecast");
      } finally {
        setLoading(false);
      }
    }

    fetchForecast();
  }, [lat, lon]);

  if (!lat || !lon) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 text-center">
        <span className="text-4xl block mb-2">📅</span>
        <p className="text-gray-500">No location data available</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 animate-pulse">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 rounded-2xl" />
        ))}
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

  const daily = forecast?.daily?.slice(0, 7) || [];

  if (daily.length === 0) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 text-center">
        <span className="text-4xl block mb-2">📅</span>
        <p className="text-gray-500">No forecast data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📅</span>
          <span className="font-semibold text-gray-900">7-Day Forecast</span>
        </div>
        <button className="text-rose-500 text-sm font-medium hover:underline">
          View hourly →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {daily.map((day, idx) => {
          const temp = Math.round(day.temp?.day || 0);
          const min = Math.round(day.temp?.min || 0);
          const max = Math.round(day.temp?.max || 0);
          const condition = day.weather?.[0]?.description || "";
          const icon = getWeatherIcon(condition);
          const isToday = idx === 0;

          return (
            <div
              key={idx}
              className={`rounded-2xl p-4 text-center transition-all hover:shadow-lg ${
                isToday
                  ? "bg-gradient-to-b from-rose-100 to-amber-100"
                  : "bg-white shadow-md hover:shadow-xl"
              }`}
            >
              <p className={`text-sm font-medium ${isToday ? "text-rose-600" : "text-gray-500"}`}>
                {idx === 0 ? "Today" : getDayName(day.dt)}
              </p>
              <span className="text-3xl my-3 block">{icon}</span>
              <p className="text-xl font-bold text-gray-900">{temp}°</p>
              <div className="mt-2 flex justify-center gap-1">
                <span className="text-xs text-gray-400">{min}°</span>
                <div className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-400 rounded-full"
                    style={{
                      width: `${Math.max(10, Math.min(100, ((max - min) / 40) * 100))}%`,
                      marginLeft: `${Math.min(90, (min / 45) * 100)}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-gray-400">{max}°</span>
              </div>
              <p className="text-xs text-gray-500 mt-2 capitalize truncate">
                {condition}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
        {daily[0]?.wind_speed && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
            <span>💨</span>
            <span className="text-sm text-gray-600">Wind: {daily[0].wind_speed} m/s</span>
          </div>
        )}
        {daily[0]?.humidity && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
            <span>💧</span>
            <span className="text-sm text-gray-600">Humidity: {daily[0].humidity}%</span>
          </div>
        )}
        {daily[0]?.sunrise && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
            <span>🌅</span>
            <span className="text-sm text-gray-600">
              Sunrise: {new Date(daily[0].sunrise * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        )}
        {daily[0]?.sunset && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
            <span>🌇</span>
            <span className="text-sm text-gray-600">
              Sunset: {new Date(daily[0].sunset * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}