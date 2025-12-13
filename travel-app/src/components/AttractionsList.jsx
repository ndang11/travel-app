import React, { useEffect, useState } from "react";
import { getAttractions } from "../services/attractionService";

export default function AttractionsList({ lat, lon }) {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAttractions() {
      setLoading(true);
      const data = await getAttractions(lat, lon);
      setAttractions(data);
      setLoading(false);
    }

    if (lat && lon) {
      fetchAttractions();
    }
  }, [lat, lon]);

  if (loading) return <p>Loading attractions...</p>;
  if (attractions.length === 0) return <p>No attractions found.</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {attractions.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1502920514313-52581002a659";
            }}
          />

          <div className="p-4">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
