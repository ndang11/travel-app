import React, { useEffect, useState } from "react";
import { getAirportsByCountry } from "../services/airportService";
import { getPixabayImage } from "../services/pixabayService";

// Airport Card Component
function AirportCard({ airport }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
            ✈
          </div>
          <div>
            <div className="flex gap-2">
              {airport.iata_code && (
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                  {airport.iata_code}
                </span>
              )}
              {airport.icao_code && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded">
                  {airport.icao_code}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <h4 className="font-semibold text-gray-900 mt-3">{airport.airport_name}</h4>
      <p className="text-sm text-gray-500 mt-1">{airport.city || "Unknown city"}</p>
    </div>
  );
}

export default function AirportInfo({ countryName }) {
  const [airports, setAirports] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!countryName) return;

      setLoading(true);
      setError("");

      try {
        // Fetch both in parallel
        const [airportData, img] = await Promise.all([
          getAirportsByCountry(countryName),
          getPixabayImage(`${countryName} airport`).catch(() => null)
        ]);

        setAirports(airportData || []);
        setImage(img);
      } catch (err) {
        console.error("Airport data fetch error:", err);
        setError("Failed to load airport data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [countryName]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl p-4 animate-pulse">
              <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
              <div className="h-5 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Hero Image */}
      {image && (
        <div className="h-40 rounded-xl overflow-hidden">
          <img src={image} alt={`${countryName} airports`} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-blue-600">{airports.length}</p>
          <p className="text-xs text-blue-700">Total</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-indigo-600">{airports.filter(a => a.iata_code).length}</p>
          <p className="text-xs text-indigo-700">International</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-green-600">{airports.filter(a => a.city).length}</p>
          <p className="text-xs text-green-700">Cities</p>
        </div>
      </div>

      {/* Airport List */}
      {airports.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {airports.slice(0, 6).map((airport, idx) => (
            <AirportCard key={airport.iata_code || airport.icao_code || idx} airport={airport} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">No airports found</p>
      )}
    </div>
  );
}
