import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import DestinationCard from "../components/DestinationCard";
import { searchCountries } from "../services/countryService";

const HERO_IMAGES = [
  "https://d2vbr83hnyiux1.cloudfront.net/image/975050285728/image_4lqdtu00bd17l6jlamum1t4v73/-FWEBP",
  "https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/q0bczmrllmdmskwhi59i",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/d8/b9/d2/caption.jpg?w=500&h=500&s=1",
  "https://media.tacdn.com/media/attractions-splice-spp-360x240/16/9b/c7/3c.jpg",
  "https://assets-news.housing.com/news/wp-content/uploads/2022/06/28093154/15-worlds-best-places-to-visit.jpg",
  "https://media.istockphoto.com/id/2208987950/photo/young-woman-with-cabin-luggage.jpg?s=612x612&w=0&k=20&c=BzsiC7NL59fLMe9lazdumeSxqIkCtdtygitzEQ-1BkI=",
  "https://www.airportspotting.com/wp-content/uploads/2023/12/Air-France-Spotting.jpg",
];

const TRENDING_DESTINATIONS = [
  { name: "Bali", country: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop" },
  { name: "Maldives", country: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop" },
  { name: "Santorini", country: "Greece", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop" },
  { name: "Dubai", country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop" },
];

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "This app made planning my Europe trip so easy! Found amazing attractions and weather info all in one place.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Chen",
    location: "Toronto, Canada",
    text: "The best travel companion! Got real-time weather updates and found hidden gems in Tokyo.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emma Williams",
    location: "London, UK",
    text: "Discovered beautiful beaches in Thailand. The hotel recommendations were spot-on!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const countries = ["France", "Japan", "Italy", "United States", "Spain", "Thailand", "Germany", "Australia", "Brazil", "India", "Mexico", "United Kingdom"];
        const results = await Promise.all(
          countries.map(async (name) => {
            const data = await searchCountries(name);
            return data[0] || null;
          })
        );
        const filtered = results.filter(Boolean);
        setDestinations(filtered.slice(0, 6));
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?q=${search}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-all duration-[1500ms] ease-in-out"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: idx === currentImageIndex ? 1 : 0,
              transform: idx === currentImageIndex ? "scale(1)" : "scale(1.1)",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentImageIndex
                  ? "bg-white w-12"
                  : "bg-white/40 w-6 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
          ))}
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight drop-shadow-2xl">
              Travel<span className="text-amber-400">Mate</span>
            </h1>
            <p className="text-white/90 text-xl md:text-2xl font-light max-w-2xl mx-auto drop-shadow-lg">
              Your all-in-one travel companion for discovering amazing destinations
            </p>
          </div>

          {/* Search Bar - Airbnb Style */}
          <div className="bg-white rounded-full shadow-2xl p-2 flex items-center max-w-3xl w-full mx-auto hover:shadow-2xl transition-shadow">
            <div className="flex-1 px-6 py-3 border-r border-gray-200">
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wide">
                Where
              </label>
              <input
                type="text"
                placeholder="Search destinations"
                className="w-full outline-none text-gray-700 placeholder-gray-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex-1 px-6 py-3 border-r border-gray-200">
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wide">
                When
              </label>
              <input
                type="text"
                placeholder="Add dates"
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-rose-500 hover:bg-rose-600 text-white rounded-full p-4 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <div className="mt-6 flex gap-4">
            <Link
              to="/discovery"
              className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 transition"
            >
              Explore Now
            </Link>
            <button className="px-6 py-3 border border-white text-white font-semibold rounded-full hover:bg-white/20 transition">
              Watch Video
            </button>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Popular Destinations</h2>
            <p className="text-gray-500 mt-2">Explore our most visited places this month</p>
          </div>
          <Link to="/discovery" className="text-rose-500 font-semibold hover:text-rose-600 flex items-center gap-1">
            View all
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="rounded-2xl bg-gray-200 animate-pulse h-80" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((d) => (
              <DestinationCard key={d.cca2} destination={d} />
            ))}
          </div>
        )}
      </section>

      {/* Trending Now */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-rose-500 font-semibold uppercase tracking-wider text-sm">Hot This Season</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Trending Destinations</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRENDING_DESTINATIONS.map((dest, idx) => (
              <div
                key={idx}
                className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[4/5]"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm opacity-80">{dest.country}</p>
                  <h3 className="text-xl font-bold">{dest.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Travelers Love Us</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Everything you need to plan your perfect trip, all in one place
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🗺️", title: "Explore", desc: "Discover destinations worldwide" },
              { icon: "🌤️", title: "Weather", desc: "Real-time forecasts & updates" },
              { icon: "✈️", title: "Flights", desc: "Airport info & schedules" },
              { icon: "🏨", title: "Stays", desc: "Hotels & accommodations" },
              { icon: "🎫", title: "Attractions", desc: "Top things to do & see" },
              { icon: "💱", title: "Currency", desc: "Live exchange rates" },
              { icon: "🗣️", title: "Language", desc: "Local languages & phrases" },
              { icon: "❤️", title: "Favorites", desc: "Save your top places" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow text-center group"
              >
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">
                  {feature.icon}
                </span>
                <h3 className="font-bold text-gray-900 text-lg">{feature.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-400 font-semibold uppercase tracking-wider text-sm">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">What Travelers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div key={idx} className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=600&fit=crop"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-white/90 text-xl mb-8">
            Start planning your dream trip today. Discover new places, create lasting memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/discovery"
              className="px-8 py-4 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-600 transition transform hover:scale-105"
            >
              Start Exploring
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-gray-900 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-rose-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get Travel Inspiration</h2>
          <p className="text-white/80 mb-6">Subscribe to get exclusive deals and travel tips</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full outline-none text-gray-900"
            />
            <button className="px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}