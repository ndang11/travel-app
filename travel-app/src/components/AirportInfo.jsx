import React, { useEffect, useState } from "react";
import { getAirportsByCountry } from "../services/airportService";
import { getPixabayImage } from "../services/pixabayService";

// Airport Card Component
function AirportCard({ airport, isHovered, onHover }) {
  return (
    <div
      className={`group relative bg-white rounded-2xl p-5 shadow-md border border-slate-200 transition-all duration-300 cursor-pointer ${
        isHovered ? 'shadow-xl border-indigo-200' : ''
      }`}
      onMouseEnter={() => onHover(airport.icao_code)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Airport Icon & Code */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-xl shadow-lg">
            ✈️
          </div>
          <div>
            <div className="flex gap-2">
              {airport.iata_code && (
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-lg">
                  {airport.iata_code}
                </span>
              )}
              {airport.icao_code && (
                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-sm font-bold rounded-lg">
                  {airport.icao_code}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Type Badge */}
        <span className="px-2.5 py-1 bg-sky-50 text-sky-700 text-xs font-medium rounded-full">
          International
        </span>
      </div>

      {/* Airport Name */}
      <h4 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">
        {airport.airport_name}
      </h4>

      {/* Location */}
      <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{airport.city || "Unknown city"}, {airport.country_name}</span>
      </div>

      {/* Quick Info */}
      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          <span>Operational</span>
        </div>
        <div className="flex-1"></div>
        <button className="text-indigo-600 text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          <span>Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function AirportInfo({ countryName }) {
  const [airports, setAirports] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredAirport, setHoveredAirport] = useState(null);

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
      <div className="space-y-6">
        {/* Hero Skeleton */}
        <div className="relative h-56 rounded-2xl overflow-hidden">
          <div className="h-full bg-slate-200 animate-pulse" />
        </div>
        
        {/* Cards Skeleton */}
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-md border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-200 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-5 w-20 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Hero Section */}
      <div className="relative h-56 md:h-64 rounded-2xl overflow-hidden shadow-lg">
        {image ? (
          <>
            <img
              src={image}
              alt={`${countryName} airport`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center">
            <span className="text-6xl">✈️</span>
          </div>
        )}

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
              🛫
            </div>
            <div>
              <h3 className="text-white text-2xl md:text-3xl font-bold">
                Airports in {countryName}
              </h3>
              <p className="text-white/80 text-sm">
                {airports.length} airport{airports.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-sky-600">{airports.length}</p>
          <p className="text-xs text-sky-700">Total Airports</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-indigo-600">
            {airports.filter(a => a.iata_code).length}
          </p>
          <p className="text-xs text-indigo-700">International</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {airports.filter(a => a.city).length}
          </p>
          <p className="text-xs text-green-700">Cities Served</p>
        </div>
      </div>

      {/* Airport Cards Grid */}
      {airports.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {airports.map((airport) => (
            <AirportCard
              key={airport.iata_code || airport.icao_code}
              airport={airport}
              isHovered={hoveredAirport === airport.icao_code}
              onHover={setHoveredAirport}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-2xl">
          <span className="text-4xl">🛬</span>
          <p className="mt-3 text-slate-600 font-medium">No airport data available</p>
          <p className="text-sm text-slate-500">We couldn't find any airports for this country</p>
        </div>
      )}

      {/* Info Note */}
      {airports.length > 0 && (
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 pt-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Click on an airport to view flight details and schedules</span>
        </div>
      )}
    </section>
  );
}
