// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import DestinationCard from "../components/DestinationCard";

const destinations = [
  {
    id: "FR",
    code: "FR",
    name: "France",
    summary: "Culture, fashion & cuisine",
    image: "https://source.unsplash.com/800x600/?france,paris"
  },
  {
    id: "JP",
    code: "JP",
    name: "Japan",
    summary: "Tradition meets technology",
    image: "https://source.unsplash.com/800x600/?japan,tokyo"
  },
  {
    id: "IT",
    code: "IT",
    name: "Italy",
    summary: "History, art & food",
    image: "https://source.unsplash.com/800x600/?italy,rome"
  },
  {
    id: "US",
    code: "US",
    name: "United States",
    summary: "Cities, nature & adventure",
    image: "https://source.unsplash.com/800x600/?newyork,usa"
  },
  {
    id: "ES",
    code: "ES",
    name: "Spain",
    summary: "Beaches, culture & nightlife",
    image: "https://source.unsplash.com/800x600/?spain,barcelona"
  },
  {
    id: "TH",
    code: "TH",
    name: "Thailand",
    summary: "Tropical paradise & culture",
    image: "https://source.unsplash.com/800x600/?thailand"
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?q=${search}`);
  }

  return (
    <div className="space-y-16">

      {/* HERO SECTION */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Discover Your Next Adventure 🌍
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore destinations, attractions, weather, airports, currency,
          and everything you need to plan your perfect trip.
        </p>

        {/* SEARCH BAR */}
        <form
          onSubmit={handleSearch}
          className="flex max-w-xl mx-auto"
        >
          <input
            type="text"
            placeholder="Search a country or destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 border rounded-l-lg focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section>
        <h2 className="text-3xl font-bold mb-6">
          Popular Destinations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Use This Travel App?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <span className="text-4xl">✈️</span>
            <h3 className="font-semibold text-xl">Airports & Flights</h3>
            <p className="text-gray-600">
              Find major airports and travel information instantly.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-4xl">🌦️</span>
            <h3 className="font-semibold text-xl">Live Weather</h3>
            <p className="text-gray-600">
              Check real-time weather before you travel.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-4xl">📸</span>
            <h3 className="font-semibold text-xl">Top Attractions</h3>
            <p className="text-gray-600">
              Discover attractions with real images and details.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to explore?
        </h2>
        <p className="text-gray-600 mb-6">
          Click a destination or search for a country to start your journey.
        </p>
      </section>

    </div>
  );
}
