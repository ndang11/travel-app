import React, { useEffect, useState } from "react";
import { getHotels } from "../services/hotelService";

export default function HotelsList({ cityCode }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cityCode) return;

    async function loadHotels() {
      try {
        setLoading(true);
        const data = await getHotels(cityCode);
        setHotels(data);
      } catch (err) {
        setError("Failed to load hotels");
      } finally {
        setLoading(false);
      }
    }

    loadHotels();
  }, [cityCode]);

  if (loading) {
    return <p className="text-gray-500">Loading hotels...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!hotels.length) {
    return <p className="text-gray-500">No hotels found.</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <div
          key={hotel.hotelId}
          className="bg-white rounded-lg shadow border p-4"
        >
          <h3 className="font-semibold text-lg">
            {hotel.name || "Unnamed Hotel"}
          </h3>
          <p className="text-sm text-gray-600">
            {hotel.address?.countryCode}
          </p>
        </div>
      ))}
    </div>
  );
}
