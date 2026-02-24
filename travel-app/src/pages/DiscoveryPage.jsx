import SearchBar from "../components/SearchBar";
import TrendingCities from "../components/TrendingCities";

// Discovery category card
function CategoryCard({ icon, title, description, color, link }) {
  return (
    <a
      href={link}
      className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-slate-200"
    >
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-500">{description}</p>
    </a>
  );
}

// Featured destination card
function FeaturedCard({ country, image, flag }) {
  return (
    <a
      href={`/destination/${country.code}`}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="h-64 overflow-hidden">
        <img
          src={image}
          alt={country.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="text-4xl mb-2 block">{flag}</span>
        <h3 className="text-white text-xl font-bold">{country.name}</h3>
        <p className="text-white/80 text-sm">{country.summary}</p>
      </div>
    </a>
  );
}

// Featured destinations data
const featuredDestinations = [
  {
    name: "Japan",
    code: "JP",
    summary: "Tradition meets technology",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600",
    flag: "🇯🇵",
  },
  {
    name: "Italy",
    code: "IT",
    summary: "History, art & food",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600",
    flag: "🇮🇹",
  },
  {
    name: "France",
    code: "FR",
    summary: "Culture, fashion & cuisine",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600",
    flag: "🇫🇷",
  },
];

export default function DiscoveryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-12">
        {/* Header Section */}
        <header className="text-center space-y-4 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-lg mb-4">
            <span className="text-4xl">🌍</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900">
            Discover Destinations
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Search countries, cities, attractions, and travel ideas. Find your perfect adventure around the world.
          </p>
        </header>

        {/* Search Section */}
        <div className="max-w-3xl mx-auto">
          <SearchBar />
        </div>

        {/* Categories Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
              📂
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Browse by Category</h2>
              <p className="text-sm text-slate-500">Explore different types of destinations</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CategoryCard
              icon="🏖️"
              title="Beaches"
              description="Sun, sand, and sea"
              color="bg-cyan-100"
              link="/search?category=beaches"
            />
            <CategoryCard
              icon="🏔️"
              title="Mountains"
              description="Adventure awaits"
              color="bg-emerald-100"
              link="/search?category=mountains"
            />
            <CategoryCard
              icon="🏛️"
              title="Historic"
              description="Rich heritage"
              color="bg-amber-100"
              link="/search?category=historic"
            />
            <CategoryCard
              icon="🌆"
              title="Metros"
              description="Urban exploration"
              color="bg-purple-100"
              link="/search?category=metros"
            />
          </div>
        </section>

        {/* Featured Destinations */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-xl">
              ⭐
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Featured Destinations</h2>
              <p className="text-sm text-slate-500">Top picks for your next trip</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredDestinations.map((dest) => (
              <FeaturedCard key={dest.code} country={dest} image={dest.image} flag={dest.flag} />
            ))}
          </div>
        </section>

        {/* Trending Cities */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-xl">
              🔥
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Trending Cities</h2>
              <p className="text-sm text-slate-500">Popular destinations travelers love</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
            <TrendingCities />
          </div>
        </section>

        {/* Travel Tips Banner */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Use our search to find flights, hotels, attractions, and more for any destination worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/search"
              className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Search Now
            </a>
            <a
              href="/about"
              className="px-6 py-3 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-slate-500">
          <p>Discover amazing places around the world</p>
        </footer>
      </div>
    </div>
  );
}
