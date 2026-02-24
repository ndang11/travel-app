import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AttractionsList from "../components/AttractionsList";
import { getCountryByCode } from "../services/countryService";
import AirportInfo from "../components/AirportInfo";
import FavoriteButton from "../components/FavoriteButton";
import MapView from "../components/MapView";
import WeatherCard from "../components/WeatherCard";
import CurrencyConverter from "../components/CurrencyConverter";
import LanguageInfo from "../components/LanguageInfo";
import HotelsList from "../components/HotelsList";
import ForecastWidget from "../components/ForecastWidget";
import Icons from "../components/Icons";

export default function DestinationPage() {
  const { code, city } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountry() {
      try {
        setLoading(true);
        const data = await getCountryByCode(code);
        setCountry(data);
      } catch (error) {
        console.error("Country fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    if (code) fetchCountry();
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Country Not Found</h2>
          <Link to="/" className="text-indigo-600 hover:underline">Go Home</Link>
        </div>
      </div>
    );
  }

  const currencyCode = country.currencies ? Object.keys(country.currencies)[0] : "USD";
  const displayCity = city || country.capital?.[0] || country.name.common;
  const flags = country.flags?.svg || country.flags?.png;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <Icons.chevronRight />
            <Link to="/discovery" className="hover:text-indigo-600">Discovery</Link>
            <Icons.chevronRight />
            <span className="text-gray-900 font-medium">{country.name.common}</span>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Country Header */}
        <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-end">
            {flags && (
              <img src={flags} alt={country.name.common} className="w-24 h-16 object-cover mx-6 mb-4 rounded-lg shadow-lg border-2 border-white" />
            )}
          </div>
          <div className="px-6 pb-6">
            <div className="flex justify-between items-start -mt-8 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{country.name.common}</h1>
                <p className="text-gray-500 mt-1">{country.region} {country.subregion && `• ${country.subregion}`}</p>
              </div>
              <FavoriteButton countryCode={country.cca2} />
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500 uppercase">Languages</p>
                <p className="font-semibold text-gray-900">{country.languages ? Object.values(country.languages).length : 1}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500 uppercase">Currency</p>
                <p className="font-semibold text-gray-900">{currencyCode}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500 uppercase">Population</p>
                <p className="font-semibold text-gray-900">{country.population ? (country.population / 1000000).toFixed(1) + 'M' : 'N/A'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500 uppercase">Capital</p>
                <p className="font-semibold text-gray-900">{country.capital?.[0] || 'N/A'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="h-64">
            <MapView lat={country.latlng[0]} lon={country.latlng[1]} name={country.name.common} />
          </div>
        </section>

        {/* Weather & Currency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Weather in {displayCity}</h2>
            <WeatherCard lat={country.latlng[0]} lon={country.latlng[1]} city={displayCity} />
            <div className="mt-4">
              <ForecastWidget lat={country.latlng[0]} lon={country.latlng[1]} />
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Currency</h2>
            <CurrencyConverter currency={currencyCode} />
          </section>
        </div>

        {/* Language */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Languages</h2>
          <LanguageInfo country={country} />
        </section>

        {/* Hotels */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hotels in {displayCity}</h2>
          <HotelsList city={displayCity} />
        </section>

        {/* Attractions */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Attractions in {displayCity}</h2>
          <AttractionsList city={displayCity} />
        </section>

        {/* Airports */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Airports</h2>
          <AirportInfo countryName={country.name.common} />
        </section>
      </main>
    </div>
  );
}
