import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import DestinationCard from "../components/DestinationCard";

const destinations = [
  {
    id: "FR",
    code: "FR",
    name: "France",
    summary: "Culture, fashion & cuisine",
    image: "https://source.unsplash.com/800x600/?france,paris",
  },
  {
    id: "JP",
    code: "JP",
    name: "Japan",
    summary: "Tradition meets technology",
    image: "https://source.unsplash.com/800x600/?japan,tokyo",
  },
  {
    id: "IT",
    code: "IT",
    name: "Italy",
    summary: "History, art & food",
    image: "https://source.unsplash.com/800x600/?italy,rome",
  },
  {
    id: "US",
    code: "US",
    name: "United States",
    summary: "Cities, nature & adventure",
    image: "https://source.unsplash.com/800x600/?newyork,usa",
  },
  {
    id: "ES",
    code: "ES",
    name: "Spain",
    summary: "Beaches, culture & nightlife",
    image: "https://source.unsplash.com/800x600/?spain,barcelona",
  },
  {
    id: "TH",
    code: "TH",
    name: "Thailand",
    summary: "Tropical paradise & culture",
    image: "https://source.unsplash.com/800x600/?thailand",
  },
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
      <section
        className="relative flex items-center justify-center text-center min-h-[70vh] px-6"
        style={{
          backgroundImage:
            "url('https://d2vbr83hnyiux1.cloudfront.net/image/975050285728/image_4lqdtu00bd17l6jlamum1t4v73/-FWEBP')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 space-y-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-600">
            Adventure Like Never Before
          </h1>

          <p className="text-gray-200 text-lg">
            Explore destinations, attractions, weather, airports, currency, and
            everything you need to plan your perfect trip.
          </p>

          <Link to="/discovery">
            <button className="mt-4 px-8 py-3 text-lg font-semibold bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
              Get Started
            </button>
          </Link>
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-6">Popular Destinations</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>
      </section>

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
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div>
            <img
              src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg"
              alt="Travel lifestyle"
              className="rounded-2xl shadow-lg w-full h-[380px] object-cover"
            />
          </div>

          {/* Text */}
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold">
              Travel Is More Than a Destination
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              Traveling opens your mind, challenges your comfort zone, and
              connects you with cultures, people, and experiences that last a
              lifetime. It’s not just about where you go — it’s about who you
              become along the way.
            </p>

            <p className="text-gray-600">
              From peaceful beaches to vibrant cities, every journey teaches you
              something new. Travel slowly, travel intentionally, and let the
              world shape your story.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
        <p className="text-gray-600 mb-6">
          Click a destination or search for a country to start your journey.
        </p>
      </section>
    </div>
  );
}
