import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getCountryByCode } from "../services/countryService";
import AirportInfo from "../components/AirportInfo";
import FavoriteButton from "../components/FavoriteButton";
import MapView from "../components/MapView";
import WeatherCard from "../components/WeatherCard";
import CurrencyConverter from "../components/CurrencyConverter";
import AttractionsList from "../components/AttractionsList";

export default function DestinationPage() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    async function fetchCountry() {
      const data = await getCountryByCode(code);
      setCountry(data);
    }
    fetchCountry();
  }, [code]);

  if (!country) return <p>Loading...</p>;

  const currencyCode = country.currencies
    ? Object.keys(country.currencies)[0]
    : "USD";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{country.name.common}</h1>
        <FavoriteButton countryCode={country.cca2} />
      </div>

      <MapView
        lat={country.latlng[0]}
        lon={country.latlng[1]}
        name={country.name.common}
      />

      <div className="grid md:grid-cols-3 gap-4">
        <WeatherCard lat={country.latlng[0]} lon={country.latlng[1]} />
        <CurrencyConverter currency={currencyCode} />
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-2">Top Attractions</h2>
        <AttractionsList
          lat={country.latlng[0]}
          lon={country.latlng[1]}
        />
      </section>

      <section>
         <div>
      <h1>Destination: France</h1>
      <AirportInfo countryName="FR" />
    </div>
      </section>
    </div>
  );
}
