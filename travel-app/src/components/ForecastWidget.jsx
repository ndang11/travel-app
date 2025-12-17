import { useEffect, useState } from "react";
import { getForecast } from "../services/weatherService";

export default function ForecastWidget({ lat, lon }) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;
    getForecast(lat, lon).then(setForecast);
  }, [lat, lon]);

  if (!forecast) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {forecast.daily.slice(0, 7).map((day, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow p-3 text-center"
        >
          <p className="text-sm font-semibold">
            {new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}
          </p>
          <img
            className="mx-auto"
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
          />
          <p className="text-sm text-gray-600">
            {Math.round(day.temp.min)}° / {Math.round(day.temp.max)}°
          </p>
        </div>
      ))}
    </div>
  );
}
