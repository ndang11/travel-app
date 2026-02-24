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
function getDayName(date) {
  const d = new Date(date * 1000);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

// Short date format
function getShortDate(date) {
  return new Date(date * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function ForecastWidget({ lat, lon }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!lat || !lon) return;

    async function fetchForecast() {
      setLoading(true);
      setError("");
      try {
        const data = await getForecast(lat, lon);
        setForecast(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load forecast");
      } finally {
        setLoading(false);
      }
    }

    fetchForecast();
  }, [lat, lon]);

  if (!lat || !lon) {
    return (
      <div className="text-center py-8 text-slate-500">
        <span className="text-2xl">📍</span>
        <p className="mt-2">No location data available</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-7 gap-2">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="text-center p-3">
            <div className="h-4 w-10 bg-slate-200 rounded animate-pulse mx-auto mb-2" />
            <div className="h-8 w-8 bg-slate-200 rounded-full animate-pulse mx-auto mb-2" />
            <div className="h-5 w-12 bg-slate-200 rounded animate-pulse mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center gap-3 py-8 text-red-500">
        <span className="text-2xl">⚠️</span>
        <p>{error}</p>
      </div>
    );
  }

  const dailyForecast = forecast.daily?.slice(0, 7) || [];

  return (
    <div className="overflow-x-auto -mx-2 px-2">
      <div className="flex gap-2 min-w-max">
        {dailyForecast.map((day, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center p-3 rounded-xl transition-all hover:scale-105 ${
              idx === 0
                ? "bg-white/20 text-white"
                : "bg-white/10 text-white/90 hover:bg-white/20"
            }`}
          >
            {/* Day Name */}
            <p className="text-xs font-medium mb-1">
              {getDayName(day.dt)}
            </p>
            <p className="text-[10px] opacity-70 mb-2">
              {getShortDate(day.dt)}
            </p>

            {/* Weather Icon */}
            <div className="text-3xl mb-2 filter drop-shadow-md">
              {getWeatherIcon(day.weather?.[0]?.main)}
            </div>

            {/* Temperature */}
            <div className="text-center">
              <p className="text-lg font-bold">{Math.round(day.temp.day)}°</p>
              <div className="flex items-center justify-center gap-1 text-xs opacity-80">
                <span>↑{Math.round(day.temp.max)}°</span>
                <span>↓{Math.round(day.temp.min)}°</span>
              </div>
            </div>

            {/* Additional Info */}
            {day.humidity && (
              <div className="mt-2 text-[10px] opacity-70 flex items-center gap-1">
                <span>💧</span>
                <span>{day.humidity}%</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      {forecast.daily && forecast.daily[0] && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm text-white/80 text-center">
            {forecast.daily[0].weather?.[0]?.description
              ? `Today: ${forecast.daily[0].weather[0].description.charAt(0).toUpperCase() + forecast.daily[0].weather[0].description.slice(1)}`
              : "7-day forecast loaded"}
          </p>
        </div>
      )}
    </div>
  );
}
