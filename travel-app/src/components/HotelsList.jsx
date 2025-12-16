import React, { useEffect, useState } from "react";
import { getHotels } from "../services/hotelService";

export default function HotelsList({ cityCode }) {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cityCode) return;

    getHotels(cityCode)
      .then(setHotels)
      .catch(() => setError("Failed to load hotels"));
  }, [cityCode]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {hotels.map(h => (
        <div key={h.hotelId} className="border rounded p-4">
          <h3 className="font-semibold">{h.name}</h3>
        </div>
      ))}
    </div>
  );
}