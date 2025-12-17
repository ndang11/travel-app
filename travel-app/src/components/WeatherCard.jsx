import React, { useEffect, useState } from "react";
import { getWeatherByCity, getWeatherByCoords } from "../services/weatherService";

export default function WeatherCard({ city, coords }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError("");
      try {
        let data;
        if (city) {
          data = await getWeatherByCity(city);
        } else if (coords) {
          const { lat, lon } = coords;
          data = await getWeatherByCoords(lat, lon);
        } else {
          throw new Error("No city or coordinates provided");
        }
        setWeather(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch weather");
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city, coords]);

  if (loading) return <div>Loading weather...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div className="weather-card">
      <h3>{weather.name}</h3>
      <p>{weather.weather[0].description}</p>
      <p>{Math.round(weather.main.temp)}°C</p>
    </div>
  );
}
