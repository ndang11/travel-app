import React, { useEffect, useState } from "react";
import { getAirportsByCountry } from "../services/airportService";
import { getPixabayImage } from "../services/pixabayService";

export default function AirportInfo({ countryName }) {
  const [airports, setAirports] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const airportData = await getAirportsByCountry(countryName);
      setAirports(airportData);

      const img = await getPixabayImage(`${countryName} airport`);
      setImage(img);

      setLoading(false);
    }

    if (countryName) loadData();
  }, [countryName]);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-56 bg-gray-300 rounded-lg" />
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-300 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {image && (
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <img
            src={image}
            alt={`${countryName} airport`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end p-4">
            <h3 className="text-white text-2xl font-bold">
              Airports in {countryName}
            </h3>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {airports.map((a) => (
          <div
            key={a.iata_code || a.icao_code}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition"
          >
            <h4 className="font-semibold text-lg text-gray-900">
              {a.airport_name}
            </h4>

            <p className="text-sm text-gray-600">
              {a.city || "Unknown city"} • {a.country_name}
            </p>

            <div className="flex gap-4 mt-3 text-sm text-gray-700">
              {a.iata_code && (
                <span className="px-2 py-1 bg-gray-100 rounded">
                  IATA: {a.iata_code}
                </span>
              )}
              {a.icao_code && (
                <span className="px-2 py-1 bg-gray-100 rounded">
                  ICAO: {a.icao_code}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {!airports.length && (
        <p className="text-gray-500">No airport data available.</p>
      )}
    </section>
  );
}
