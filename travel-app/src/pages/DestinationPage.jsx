import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttractionsList from "../components/AttractionsList";
import { getCountryByCode } from "../services/countryService";
import AirportInfo from "../components/AirportInfo";
import FavoriteButton from "../components/FavoriteButton";
import MapView from "../components/MapView";
import WeatherCard from "../components/WeatherCard";
import CurrencyConverter from "../components/CurrencyConverter";
import LanguageInfo from "../components/LanguageInfo";
import HotelsList from "../components/HotelsList";

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
      <div className="space-y-6 p-6 animate-pulse max-w-6xl mx-auto">
        <div className="h-10 bg-gray-300 w-64 rounded"></div>
        <div className="h-72 bg-gray-300 rounded-md"></div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="h-48 bg-gray-300 rounded-md"></div>
          <div className="h-48 bg-gray-300 rounded-md"></div>
          <div className="h-48 bg-gray-300 rounded-md"></div>
        </div>
        <div className="h-6 bg-gray-300 w-40 rounded"></div>
        <div className="h-48 bg-gray-300 rounded-md"></div>
      </div>
    );
  }

  if (!country)
    return (
      <p className="text-red-500 text-center mt-6 text-lg">
        Country data not found.
      </p>
    );

  const currencyCode = country.currencies
    ? Object.keys(country.currencies)[0]
    : "USD";

  const displayCity = city || country.capital?.[0] || country.name.common;

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          {country.name.common}
        </h1>
        <FavoriteButton countryCode={country.cca2} className="self-start" />
      </div>

      <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <MapView
          lat={country.latlng[0]}
          lon={country.latlng[1]}
          name={country.name.common}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <WeatherCard
            lat={country.latlng[0]}
            lon={country.latlng[1]}
            city={displayCity}
          />
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <CurrencyConverter currency={currencyCode} />
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <LanguageInfo countryCode={country.cca2} /> {/* ✅ LanguageInfo */}
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">
          Top Attractions in {displayCity}
        </h2>
        <AttractionsList city={displayCity} />
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Hotels in {displayCity}</h2>
        <HotelsList cityCode={country.capitalInfo?.latlng ? "PAR" : null} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">
          Airports in {country.name.common}
        </h2>
        <AirportInfo countryName={country.name.common} />
      </section>

      <section className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Weather in {displayCity}</h2>
        <WeatherCard city={displayCity} />
      </section>
    </div>
  );
}
