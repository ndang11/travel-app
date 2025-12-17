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
import ForecastWidget from "../components/ForecastWidget";

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
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50">
        <div className="space-y-5 sm:space-y-6 p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto animate-pulse">
          <div className="h-8 sm:h-9 md:h-10 bg-slate-200 w-40 sm:w-56 md:w-64 rounded-lg" />
          <div className="h-56 sm:h-64 md:h-80 bg-slate-200 rounded-2xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            <div className="h-32 sm:h-36 md:h-40 bg-slate-200 rounded-2xl" />
            <div className="h-32 sm:h-36 md:h-40 bg-slate-200 rounded-2xl" />
            <div className="h-32 sm:h-36 md:h-40 bg-slate-200 rounded-2xl" />
          </div>
          <div className="h-5 bg-slate-200 w-32 sm:w-40 rounded-lg" />
          <div className="h-32 sm:h-36 md:h-40 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!country)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 via-white to-slate-50 px-4">
        <p className="text-red-500 text-center text-base sm:text-lg md:text-xl font-semibold">
          Country data not found.
        </p>
      </div>
    );

  const currencyCode = country.currencies
    ? Object.keys(country.currencies)[0]
    : "USD";

  const displayCity = city || country.capital?.[0] || country.name.common;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-8 sm:space-y-10 lg:space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4 md:gap-6">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              {country.name.common}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-xl">
              Discover {displayCity}, plan your stay, and book everything in one
              place.
            </p>
          </div>
          <div className="mt-1 md:mt-0">
            <FavoriteButton
              countryCode={country.cca2}
              className="self-start md:self-center"
            />
          </div>
        </div>

        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl border border-slate-200/70 bg-white/60 backdrop-blur-sm">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-900/5 via-transparent" />
          <MapView
            lat={country.latlng[0]}
            lon={country.latlng[1]}
            name={country.name.common}
          />
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
            <div className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-white/80 backdrop-blur text-[11px] sm:text-xs md:text-sm text-slate-700 shadow-sm">
              {country.region} • {country.subregion}
            </div>
            <div className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-sky-500 text-[11px] sm:text-xs md:text-sm text-white shadow-sm">
              Explore {displayCity}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          <div className="md:col-span-2 bg-white/80 backdrop-blur rounded-2xl shadow-md border border-slate-200/70 p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                Current weather
              </h2>
              <span className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-400">
                Live forecast
              </span>
            </div>
            <WeatherCard
              lat={country.latlng[0]}
              lon={country.latlng[1]}
              city={displayCity}
            />
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-md border border-slate-200/70 p-4 sm:p-5 lg:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">
              Currency & exchange
            </h2>
            <CurrencyConverter currency={currencyCode} />
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-md border border-slate-200/70 p-4 sm:p-5 lg:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">
              Language & basics
            </h2>
            <LanguageInfo country={country} />
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-md border border-slate-200/70 p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                Stays in {displayCity}
              </h2>
              <span className="text-[11px] sm:text-xs text-sky-600 font-medium">
                Hotels & popular areas
              </span>
            </div>
            <HotelsList city={displayCity} />
          </div>
        </section>

        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1.5 sm:gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Top attractions in {displayCity}
            </h2>
            <span className="text-xs sm:text-sm text-slate-500">
              Must-see places curated for travelers
            </span>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-md border border-slate-200/70 p-4 sm:p-5 lg:p-6">
            <AttractionsList city={displayCity} />
          </div>
        </section>

        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1.5 sm:gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Airports in {country.name.common}
            </h2>
            <span className="text-xs sm:text-sm text-slate-500">
              Flight times, days, and nearby hubs
            </span>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-md border border-slate-200/70 p-4 sm:p-5 lg:p-6">
            <AirportInfo countryName={country.name.common} />
          </div>
        </section>

        <section className="bg-white/80 backdrop-blur rounded-2xl sm:rounded-3xl shadow-md border border-slate-200/70 p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-2 sm:mb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Detailed weather for {displayCity}
            </h2>
            <span className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-0">
              Hourly & extended overview
            </span>
          </div>
          <WeatherCard city={displayCity} />
        </section>
        <section className="bg-white rounded-lg shadow p-6 border">
          <h2 className="text-2xl font-bold mb-4">7-Day Forecast</h2>
          <ForecastWidget lat={country.latlng[0]} lon={country.latlng[1]} />
        </section>
      </div>
    </div>
  );
}
