import React, { useEffect, useState } from "react";
import { getAirports } from "../services/airportService";
import { getPixabayImage } from "../services/pixabayService";

export default function AirportInfo({ countryName }) {
  const [airports, setAirports] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    async function loadAirports() {
      const data = await getAirports(countryName);
      setAirports(data.slice(0, 6));

      const imgs = {};
      for (const airport of data.slice(0, 6)) {
        const img = await getPixabayImage(`${airport.name} airport`);
        imgs[airport.iata] = img;
      }
      setImages(imgs);
    }

    loadAirports();
  }, [countryName]);

  if (!airports.length)
    return <p className="text-gray-500">No airports found.</p>;

  function handleClick(airport) {
    alert(`You clicked on ${airport.name} (${airport.iata})`);
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {airports.map((airport) => (
        <div
          key={airport.iata}
          onClick={() => handleClick(airport)}
          className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden cursor-pointer transform transition-transform hover:-translate-y-2 hover:shadow-lg duration-300"
        >
          {images[airport.iata] && (
            <img
              src={images[airport.iata]}
              alt={airport.name}
              className="w-full h-40 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="font-semibold text-lg">{airport.name}</h3>
            <p className="text-sm text-gray-600">
              {airport.city || "Unknown city"} — {airport.iata || "N/A"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
