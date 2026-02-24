import React, { useEffect, useState } from "react";
import { getForecast } from "../services/weatherService";

// Weather icon mapping
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

// Get day name from date
function getDayName(dt) {
  if (!dt) return "";
  const d = new Date(dt * 1000);
  const today = new Date();
  const diff = Math.round((d - today) / (1000 * 60 * 60 * 24));
  
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

// Short date format
function getShortDate(dt) {
  if (!dt) return "";
  const d = new Date(dt * 1000);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ForecastWidget({ lat, lon }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) {
      setLoading(false);
      return;
    }

    async function fetchForecast() {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getForecast(lat, lon);
        setForecast(data);
      } catch (err) {
        console.error("Forecast fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchForecast();
  }, [lat, lon]);

  if (!lat || !lon) {
    return (
      <div className="text-center py-4 text-gray-500">
        <p>No location data</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-7 gap-2">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="text-center p-2">
            <div className="h-3 w-8 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
            <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse mx-auto mb-2" />
            <div className="h-4 w-10 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-gray-500">
        <p>Unable to load forecast</p>
        <p className="text-xs text-gray-400 mt-1">{error}</p>
      </div>
    );
  }

  if (!forecast || !forecast.daily || forecast.daily.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        <p>No forecast data available</p>
      </div>
    );
  }

  const dailyForecast = forecast.daily.slice(0, 7);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-2 min-w-max">
        {dailyForecast.map((day, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center p-2 rounded-lg min-w-[60px] ${
              idx === 0 ? "bg-white/30" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <p className="text-xs font-medium">{getDayName(day.dt)}</p>
            <p className="text-[10px] opacity-70">{getShortDate(day.dt)}</p>
            <span className="text-2xl my-1">{getWeatherIcon(day.weather?.[0]?.main)}</span>
            <p className="text-sm font-bold">{Math.round(day.temp?.day || 0)}°</p>
            <p className="text-[10px] opacity-70">↓{Math.round(day.temp?.min || 0)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
