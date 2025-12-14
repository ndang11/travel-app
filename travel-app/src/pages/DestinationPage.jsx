// src/pages/DestinationPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AttractionsList from "../components/AttractionsList"; // single, correct import
import { getCountryByCode } from "../services/countryService";
import AirportInfo from "../components/AirportInfo";
import FavoriteButton from "../components/FavoriteButton";
import MapView from "../components/MapView";
import WeatherCard from "../components/WeatherCard";
import CurrencyConverter from "../components/CurrencyConverter";

export default function DestinationPage() {
  const { code, city } = useParams(); // expects URL like /destination/:code/:city
  const [country, setCountry] = useState(null);

  useEffect(() => {
    async function fetchCountry() {
      try {
        const data = await getCountryByCode(code);
        setCountry(data);
      } catch (error) {
        console.error("Country fetch error:", error);
      }
    }
    if (code) fetchCountry();
  }, [code]);

  if (!country) return <p>Loading country data...</p>;

  const currencyCode = country.currencies
    ? Object.keys(country.currencies)[0]
    : "USD";

  return (
    <div className="space-y-6 p-4">
      {/* Header with favorite */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{country.name.common}</h1>
        <FavoriteButton countryCode={country.cca2} />
      </div>

      {/* Map */}
      <MapView
        lat={country.latlng[0]}
        lon={country.latlng[1]}
        name={country.name.common}
      />

      {/* Weather & Currency */}
      <div className="grid md:grid-cols-3 gap-4">
        <WeatherCard lat={country.latlng[0]} lon={country.latlng[1]} />
        <CurrencyConverter currency={currencyCode} />
      </div>

      {/* Top Attractions */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Top Attractions in {city}</h2>
        <AttractionsList city={city} />
      </section>

      {/* Airport Info */}
      <section>
        <h2 className="text-2xl font-bold mb-2">
          Airports in {country.name.common}
        </h2>
        <AirportInfo
          countryCode={country.cca2}
          countryName={country.name.common}
        />
      </section>

      {/* Additional city info */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Weather in {city}</h2>
        <WeatherCard city={city} />
      </section>
    </div>
  );
}
