import React, { useEffect, useState } from "react";
import { searchHotels } from "../services/hotelsService";

export default function HotelsList({ city, checkin, checkout }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city || !checkin || !checkout) return;

    const fetchHotels = async () => {
      setLoading(true);
      const data = await searchHotels({ city, checkin, checkout });
      setHotels(data);
      setLoading(false);
    };

    fetchHotels();
  }, [city, checkin, checkout]);

  if (loading) return <p>Loading hotels...</p>;
  if (!hotels.length) return <p>No hotels found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {hotels.map((hotel) => (
        <div key={hotel.id} className="border rounded p-4">
          <img
            src={hotel.image || "https://via.placeholder.com/150"}
            alt={hotel.name}
            className="w-full h-32 object-cover mb-2 rounded"
          />
          <h3 className="font-bold">{hotel.name}</h3>
          <p>{hotel.address}</p>
        </div>
      ))}
    </div>
  );
}
