import React, { useEffect, useState } from "react";
import { getForecast } from "../services/weatherService";

export default function ForecastWidget({ coords }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!coords) return;

    async function fetchForecast() {
      setLoading(true);
      setError("");
      try {
        const data = await getForecast(coords.lat, coords.lon);
        setForecast(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch forecast");
      } finally {
        setLoading(false);
      }
    }

    fetchForecast();
  }, [coords]);

  if (!coords) return <div>No coordinates provided for forecast.</div>;
  if (loading) return <div>Loading forecast...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div className="forecast-widget">
      <h4>7-Day Forecast</h4>
      <div className="forecast-days">
        {forecast.daily.slice(0, 7).map((day, idx) => (
          <div key={idx} className="forecast-day">
            <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>{day.weather[0].description}</p>
            <p>{Math.round(day.temp.day)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}
