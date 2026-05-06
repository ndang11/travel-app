import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AttractionsList from "../components/AttractionsList";
import { getCountryByCode, getCountryByName } from "../services/countryService";
import AirportInfo from "../components/AirportInfo";
import FavoriteButton from "../components/FavoriteButton";
import MapView from "../components/MapView";
import WeatherCard from "../components/WeatherCard";
import CurrencyConverter from "../components/CurrencyConverter";
import LanguageInfo from "../components/LanguageInfo";
import HotelsList from "../components/HotelsList";
import ForecastWidget from "../components/ForecastWidget";
import { getPixabayImage } from "../services/pixabayService";

export default function DestinationPage() {
  const { code, city } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    async function fetchCountry() {
      if (!code || code === "undefined") return;
      
      try {
        setLoading(true);
        let data = null;
        
        if (city) {
          data = await getCountryByName(code);
        } else if (code) {
          data = await getCountryByCode(code);
        }
        
        if (!data) {
          data = await getCountryByName(code);
        }
        
        setCountry(data);
        if (data) {
          const img = await getPixabayImage(data.capital?.[0] || data.name.common);
          setHeroImage(img);
        }
      } catch (error) {
        console.error("Country fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    if (code && code !== "undefined") fetchCountry();
  }, [code, city]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-300" />
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <div className="h-10 bg-gray-300 w-1/3 rounded" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-64 bg-gray-300 rounded-2xl" />
              <div className="h-64 bg-gray-300 rounded-2xl" />
              <div className="h-64 bg-gray-300 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <span className="text-6xl block mb-4">🗺️</span>
          <p className="text-gray-600 text-xl font-semibold">Destination not found</p>
          <Link to="/discovery" className="mt-4 inline-block text-rose-500 hover:underline">
            Browse destinations
          </Link>
        </div>
      </div>
    );
  }

  const currencyCode = country.currencies
    ? Object.keys(country.currencies)[0]
    : "USD";
  
  const displayCity = city || country.capital?.[0] || country.name.common;
  const population = country.population?.toLocaleString() || "N/A";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[50vh] min-h-[400px]">
        {heroImage && (
          <img 
            src={heroImage} 
            alt={country.name.common}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute top-4 left-4">
          <Link 
            to="/discovery" 
            className="flex items-center gap-2 text-white/90 hover:text-white bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {country.flags?.png && (
                    <img src={country.flags.png} alt="" className="w-8 h-6 rounded shadow" />
                  )}
                  <span className="text-white/80 font-medium">{country.region}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2">
                  {country.name.common}
                </h1>
                <p className="text-white/80 text-lg">
                  {country.subregion} • {population} people
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FavoriteButton countryCode={country.cca2} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-10">
        <div className="flex flex-wrap gap-3">
          <div className="bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-xl">🌡️</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Capital</p>
              <p className="font-bold text-gray-900">{displayCity}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xl">💱</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Currency</p>
              <p className="font-bold text-gray-900">{currencyCode}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-xl">🗣️</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Language</p>
              <p className="font-bold text-gray-900">
                {country.languages ? Object.values(country.languages)[0] : "N/A"}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-xl">⏰</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Timezone</p>
              <p className="font-bold text-gray-900">{country.timezone?.[0] || "UTC"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="relative h-80">
            <MapView
              lat={country.latlng[0]}
              lon={country.latlng[1]}
              name={country.name.common}
            />
            <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur rounded-full text-sm font-medium text-gray-700 shadow">
              📍 {country.region} • {country.subregion}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Weather in {displayCity}</h2>
              <span className="text-sm text-gray-500">Live forecast</span>
            </div>
            <WeatherCard
              lat={country.latlng[0]}
              lon={country.latlng[1]}
              city={displayCity}
            />
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Currency Exchange</h2>
            <CurrencyConverter currency={currencyCode} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Language & Essentials</h2>
            <LanguageInfo country={country} />
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Accommodations</h2>
              <span className="text-sm text-rose-500 font-medium">Hotels in {displayCity}</span>
            </div>
            <HotelsList city={displayCity} />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Top Attractions</h2>
              <p className="text-gray-500 mt-1">Must-see places in {displayCity}</p>
            </div>
          </div>
          <AttractionsList city={displayCity} />
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Airports</h2>
            <p className="text-gray-500 mt-1">Major airports in {country.name.common}</p>
          </div>
          <AirportInfo countryName={country.name.common} />
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">7-Day Forecast</h2>
            <p className="text-gray-500 mt-1">Extended weather outlook for {displayCity}</p>
          </div>
          <ForecastWidget lat={country.latlng[0]} lon={country.latlng[1]} />
        </div>

        <div className="bg-gradient-to-r from-rose-500 to-amber-500 rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to visit {country.name.common}?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Book your flights, hotels, and experiences all in one place
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-rose-500 font-bold rounded-full hover:shadow-lg transition-all hover:scale-105">
                Book Now
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/20 transition">
                Save for Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}