import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import TrendingCities from "../components/TrendingCities";
import { searchCountries } from "../services/countryService";
import DestinationCard from "../components/DestinationCard";

const REGIONS = [
  { name: "Europe", image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop", count: 44 },
  { name: "Asia", image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop", count: 48 },
  { name: "North America", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop", count: 23 },
  { name: "South America", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop", count: 12 },
  { name: "Africa", image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=400&h=300&fit=crop", count: 54 },
  { name: "Oceania", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&h=300&fit=crop", count: 14 },
];

export default function DiscoveryPage() {
  const [featuredCountries, setFeaturedCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const countries = ["Germany", "Australia", "Brazil", "India", "Mexico", "Netherlands", "Switzerland", "Canada"];
        const results = await Promise.all(
          countries.map(name => searchCountries(name))
        );
        const flat = results.map(r => r[0]).filter(Boolean);
        setFeaturedCountries(flat.slice(0, 8));
      } catch (error) {
        console.error("Error fetching featured:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16 pb-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
              Discover Your Next <span className="text-amber-400">Adventure</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Search for countries, cities, and explore trending destinations around the world
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Explore</h2>
              <p className="text-gray-500 mt-1">Browse by category or discover trending cities</p>
            </div>
          </div>
          <TrendingCities />
        </div>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">By Region</h2>
              <p className="text-gray-500 mt-1">Explore destinations by continent</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {REGIONS.map((region) => (
              <div
                key={region.name}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
              >
                <div className="relative h-32 md:h-40">
                  <img
                    src={region.image}
                    alt={region.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold">{region.name}</h3>
                    <p className="text-white/70 text-sm">{region.count} countries</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Destinations</h2>
              <p className="text-gray-500 mt-1">Handpicked places loved by travelers</p>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, idx) => (
                <div key={idx} className="rounded-2xl bg-gray-200 animate-pulse h-72" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCountries.map((country, idx) => (
                <DestinationCard key={country.cca2 || `country-${idx}`} destination={country} />
              ))}
            </div>
          )}
        </section>

        <div className="bg-gradient-to-r from-rose-500 to-amber-500 rounded-3xl p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Plan Your Perfect Trip
              </h3>
              <p className="text-white/90">
                Get weather updates, find attractions, and book your stay - all in one place
              </p>
            </div>
            <button className="px-8 py-4 bg-white text-rose-500 font-bold rounded-full hover:shadow-lg transition-all hover:scale-105">
              Start Planning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}