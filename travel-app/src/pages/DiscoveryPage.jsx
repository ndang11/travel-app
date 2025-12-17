import SearchBar from "../components/SearchBar";
import TrendingCities from "../components/TrendingCities";

export default function DiscoveryPage() {
  return (
    <div className="space-y-10 max-w-6xl mx-auto p-6">
      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold">
          Discover Destinations 🌍
        </h1>
        <p className="text-gray-600">
          Search countries, cities, attractions, and travel ideas
        </p>
      </header>

      <SearchBar />

      <section>
        <h2 className="text-2xl font-bold mb-4">
          Trending Cities
        </h2>
        <TrendingCities />
      </section>
    </div>
  );
}