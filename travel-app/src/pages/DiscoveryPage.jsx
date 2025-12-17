import React from "react";
import SearchBar from "../components/SearchBar";
import AttractionsList from "../components/AttractionsList";
import WeatherBadge from "../components/WeatherBadge";

export default function DiscoveryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Discover Destinations 🌍</h1>
      <p className="text-gray-600">
        Explore popular destinations, attractions, and travel inspiration.
      </p>

      <section>
        <SearchBar />
      </section>
      <section>
        <AttractionsList />
        <WeatherBadge />
      </section>
    </div>
  );
}
