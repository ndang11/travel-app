import React, { useEffect, useState } from "react";
import { getAirportsByCountry } from "../services/airportService";
import { getPixabayImage } from "../services/pixabayService";

const AIRPORTS_BY_COUNTRY = {
  "France": [
    { iata_code: "CDG", airport_name: "Charles de Gaulle Airport", city: "Paris", icao_code: "LFPG" },
    { iata_code: "ORY", airport_name: "Orly Airport", city: "Paris", icao_code: "LFPO" },
    { iata_code: "NCE", airport_name: "Nice Côte d'Azur Airport", city: "Nice", icao_code: "LFMN" },
    { iata_code: "LYS", airport_name: "Lyon-Saint Exupéry Airport", city: "Lyon", icao_code: "LFLL" },
  ],
  "Japan": [
    { iata_code: "NRT", airport_name: "Narita International Airport", city: "Tokyo", icao_code: "RJAA" },
    { iata_code: "HND", airport_name: "Tokyo Haneda Airport", city: "Tokyo", icao_code: "RJTT" },
    { iata_code: "KIX", airport_name: "Kansai International Airport", city: "Osaka", icao_code: "RJBB" },
    { iata_code: "ITM", airport_name: "Itami Airport", city: "Osaka", icao_code: "RJOO" },
  ],
  "Italy": [
    { iata_code: "FCO", airport_name: "Leonardo da Vinci–Fiumicino Airport", city: "Rome", icao_code: "LIRF" },
    { iata_code: "MXP", airport_name: "Milan Malpensa Airport", city: "Milan", icao_code: "LIMC" },
    { iata_code: "NAP", airport_name: "Naples International Airport", city: "Naples", icao_code: "LIRN" },
    { iata_code: "VCE", airport_name: "Venice Marco Polo Airport", city: "Venice", icao_code: "LIPZ" },
  ],
  "United States": [
    { iata_code: "JFK", airport_name: "John F. Kennedy International Airport", city: "New York", icao_code: "KJFK" },
    { iata_code: "LAX", airport_name: "Los Angeles International Airport", city: "Los Angeles", icao_code: "KLAX" },
    { iata_code: "ORD", airport_name: "O'Hare International Airport", city: "Chicago", icao_code: "KORD" },
    { iata_code: "ATL", airport_name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta", icao_code: "KATL" },
  ],
  "Spain": [
    { iata_code: "MAD", airport_name: "Adolfo Suárez Madrid–Barajas Airport", city: "Madrid", icao_code: "LEMD" },
    { iata_code: "BCN", airport_name: "Barcelona–El Prat Airport", city: "Barcelona", icao_code: "LEBL" },
    { iata_code: "AGP", airport_name: "Málaga Airport", city: "Málaga", icao_code: "LEMG" },
    { iata_code: "ALC", airport_name: "Alicante–Elche Airport", city: "Alicante", icao_code: "LEAL" },
  ],
  "Thailand": [
    { iata_code: "BKK", airport_name: "Suvarnabhumi Airport", city: "Bangkok", icao_code: "VTBS" },
    { iata_code: "DMK", airport_name: "Don Mueang Airport", city: "Bangkok", icao_code: "VTBD" },
    { iata_code: "CNX", airport_name: "Chiang Mai International Airport", city: "Chiang Mai", icao_code: "VTCC" },
    { iata_code: "HKT", airport_name: "Phuket International Airport", city: "Phuket", icao_code: "VTSP" },
  ],
  "Germany": [
    { iata_code: "FRA", airport_name: "Frankfurt Airport", city: "Frankfurt", icao_code: "EDDF" },
    { iata_code: "MUC", airport_name: "Munich Airport", city: "Munich", icao_code: "EDDM" },
    { iata_code: "BER", airport_name: "Berlin Brandenburg Airport", city: "Berlin", icao_code: "EDDB" },
    { iata_code: "DUS", airport_name: "Düsseldorf Airport", city: "Düsseldorf", icao_code: "EDDL" },
  ],
  "United Kingdom": [
    { iata_code: "LHR", airport_name: "London Heathrow Airport", city: "London", icao_code: "EGLL" },
    { iata_code: "LGW", airport_name: "London Gatwick Airport", city: "London", icao_code: "EGKK" },
    { iata_code: "MAN", airport_name: "Manchester Airport", city: "Manchester", icao_code: "EGCC" },
    { iata_code: "STN", airport_name: "London Stansted Airport", city: "London", icao_code: "EGSS" },
  ],
};

export default function AirportInfo({ countryName }) {
  const [airports, setAirports] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [useMock, setUseMock] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!countryName) return;

      setLoading(true);
      setUseMock(false);

      const mockData = AIRPORTS_BY_COUNTRY[countryName];
      let airportData = null;

      try {
        airportData = await getAirportsByCountry(countryName, 6);
        
        if (airportData && airportData.length > 0) {
          setAirports(airportData.slice(0, 6));
        } else if (mockData) {
          setUseMock(true);
          setAirports(mockData);
        } else {
          setAirports([]);
        }
      } catch (err) {
        console.log("Using mock airports due to API error:", err.message);
        if (mockData) {
          setUseMock(true);
          setAirports(mockData);
        } else {
          setAirports([]);
        }
      }

      const airportList = airportData && airportData.length > 0 ? airportData.slice(0, 6) : (mockData || []);
      
      const imgs = {};
      for (const airport of airportList) {
        try {
          const keyword = `${airport.city || airport.airport_name} airport`;
          imgs[airport.iata_code || airport.icao_code] = await getPixabayImage(keyword);
        } catch {
          imgs[airport.iata_code || airport.icao_code] = null;
        }
      }
      setImages(imgs);

      setLoading(false);
    }

    loadData();
  }, [countryName]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-48 bg-gray-300 rounded-2xl" />
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-300 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {airports.length > 0 && images[airports[0]?.iata_code || airports[0]?.icao_code] && (
        <div className="relative h-56 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={images[airports[0].iata_code || airports[0].icao_code]}
            alt={`${countryName} airport`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-3">
              ✈️ Major Airports
            </span>
            <h3 className="text-3xl font-bold text-white">
              Airports in {countryName}
            </h3>
          </div>
        </div>
      )}

      {airports.length === 0 && (
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <span className="text-4xl block mb-3">🛫</span>
          <p className="text-gray-500 font-medium">No airport data available for {countryName}</p>
          <p className="text-gray-400 text-sm mt-1">Try searching for a different country</p>
        </div>
      )}

      {airports.length > 0 && (
        <>
          {useMock && (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-600 text-sm font-medium rounded-full">
                Suggested Airports
              </span>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            {airports.slice(0, 6).map((a, idx) => {
              const imgKey = a.iata_code || a.icao_code;
              const airportImg = images[imgKey];
              
              return (
                <div
                  key={a.iata_code || a.icao_code || idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 group cursor-pointer"
                >
                  <div className="relative h-32 overflow-hidden">
                    {airportImg ? (
                      <img
                        src={airportImg}
                        alt={a.airport_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-slate-200 flex items-center justify-center">
                        <span className="text-4xl">✈️</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-lg text-gray-900 group-hover:text-rose-500 transition-colors truncate">
                          {a.airport_name}
                        </h4>
                        <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {a.city || "Unknown city"}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-2">
                        {a.iata_code && (
                          <span className="px-3 py-1.5 bg-rose-100 text-rose-600 font-bold text-sm rounded-lg">
                            {a.iata_code}
                          </span>
                        )}
                        {a.icao_code && (
                          <span className="px-3 py-1.5 bg-blue-100 text-blue-600 font-bold text-sm rounded-lg">
                            {a.icao_code}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Click for flights</span>
                      <span className="text-rose-500 font-medium text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        View details →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}