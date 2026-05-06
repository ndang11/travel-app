import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TravelCard from "../components/TravelCard";
import Icons from "../components/Icons";

const trendingDestinations = [
  {
    id: "FR",
    code: "FR",
    name: "Paris, France",
    summary: "The City of Light awaits",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    price: "From $499",
    rating: 4.8,
    reviews: 12453,
  },
  {
    id: "JP",
    code: "JP",
    name: "Tokyo, Japan",
    summary: "Where tradition meets future",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    price: "From $899",
    rating: 4.9,
    reviews: 8721,
  },
  {
    id: "IT",
    code: "IT",
    name: "Rome, Italy",
    summary: "Walk through history",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    price: "From $599",
    rating: 4.7,
    reviews: 9832,
  },
  {
    id: "US",
    code: "US",
    name: "New York, USA",
    summary: "The city that never sleeps",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    price: "From $399",
    rating: 4.6,
    reviews: 15621,
  },
  {
    id: "ES",
    code: "ES",
    name: "Barcelona, Spain",
    summary: "Art, beaches & nightlife",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
    price: "From $549",
    rating: 4.7,
    reviews: 7234,
  },
  {
    id: "TH",
    code: "TH",
    name: "Bangkok, Thailand",
    summary: "Exotic & vibrant",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
    price: "From $699",
    rating: 4.5,
    reviews: 5621,
  },
];

const deals = [
  {
    id: 1,
    destination: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80",
    discount: "30% OFF",
    description: "Luxury beach resorts",
    validUntil: "May 31, 2026",
  },
  {
    id: 2,
    destination: "Dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    discount: "25% OFF",
    description: "City breaks & shopping",
    validUntil: "June 15, 2026",
  },
  {
    id: 3,
    destination: "Santorini",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
    discount: "20% OFF",
    description: "Romantic getaways",
    validUntil: "June 30, 2026",
  },
];

const travelers = [
  { name: "Sarah M.", location: "London", avatar: "https://i.pravatar.cc/100?img=1", text: "Found our dream vacation in minutes!" },
  { name: "James L.", location: "Sydney", avatar: "https://i.pravatar.cc/100?img=2", text: "Best travel planning experience ever." },
  { name: "Maria K.", location: "Berlin", avatar: "https://i.pravatar.cc/100?img=3", text: "Amazing deals and easy booking." },
];

const experiences = [
  {
    id: 1,
    title: "Adventure Tours",
    image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400&q=80",
    count: "2,500+ tours",
  },
  {
    id: 2,
    title: "Food & Dining",
    image: "https://images.unsplash.com/photo-1414235077428-33898908f8e8?w=400&q=80",
    count: "1,200+ experiences",
  },
  {
    id: 3,
    title: "Luxury Stays",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099467a?w=400&q=80",
    count: "800+ hotels",
  },
  {
    id: 4,
    title: "Unique Activities",
    image: "https://images.unsplash.com/photo-1533105079780-92b9e4824228?w=400&q=80",
    count: "3,000+ activities",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("stays");

  function handleSearch(e) {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?q=${search}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Full Width */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
          {/* Tagline */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white text-sm font-medium rounded-full mb-6 border border-white/20">
              <span>✈️</span>
              <span>Over 10,000+ destinations worldwide</span>
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Plan Your Perfect
              <span className="block text-amber-400">Trip</span>
            </h1>
            <p className="text-white/85 text-xl md:text-2xl max-w-2xl mx-auto font-light">
              Discover amazing places, find the best deals, and create unforgettable memories.
            </p>
          </div>

          {/* Search Widget - Airbnb Style */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setTab("stays")}
                className={`flex-1 py-4 text-center font-medium transition relative ${
                  tab === "stays" 
                    ? "text-rose-500" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {Icons.buildingHotel()} 
                  <span className="font-semibold">Stays</span>
                </span>
                {tab === "stays" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"></div>
                )}
              </button>
              <button
                onClick={() => setTab("flights")}
                className={`flex-1 py-4 text-center font-medium transition relative ${
                  tab === "flights" 
                    ? "text-rose-500" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {Icons.airplane()} 
                  <span className="font-semibold">Flights</span>
                </span>
                {tab === "flights" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"></div>
                )}
              </button>
              <button
                onClick={() => setTab("packages")}
                className={`flex-1 py-4 text-center font-medium transition relative ${
                  tab === "packages" 
                    ? "text-rose-500" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {Icons.globe()} 
                  <span className="font-semibold">Packages</span>
                </span>
                {tab === "packages" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"></div>
                )}
              </button>
            </div>

            {/* Search Form - Advanced */}
            <form onSubmit={handleSearch} className="p-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                {/* Destination */}
                <div className="relative bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 hover:border-rose-300 transition cursor-pointer">
                  <label className="block text-xs font-semibold text-gray-700">Destination</label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{Icons.mapPin()}</span>
                    <input
                      type="text"
                      placeholder={tab === "flights" ? "Where from?" : "Where are you going?"}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
                    />
                  </div>
                </div>
                
                {/* Dates */}
                <div className="relative bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 hover:border-rose-300 transition cursor-pointer">
                  <label className="block text-xs font-semibold text-gray-700">Dates</label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{Icons.calendar()}</span>
                    <input
                      type="text"
                      placeholder="Add dates"
                      className="w-full bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
                    />
                  </div>
                </div>
                
                {/* Guests */}
                <div className="relative bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 hover:border-rose-300 transition cursor-pointer">
                  <label className="block text-xs font-semibold text-gray-700">Guests</label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{Icons.users()}</span>
                    <input
                      type="text"
                      placeholder="Add guests"
                      className="w-full bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
                    />
                  </div>
                </div>
                
                {/* Search Button */}
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <span>{Icons.search()}</span>
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <span className="text-white/70 text-base font-medium">Popular:</span>
            <Link to="/search?q=paris" className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full text-base font-medium transition">Paris</Link>
            <Link to="/search?q=tokyo" className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full text-base font-medium transition">Tokyo</Link>
            <Link to="/search?q=new york" className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full text-base font-medium transition">New York</Link>
            <Link to="/search?q=bali" className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full text-base font-medium transition">Bali</Link>
            <Link to="/search?q=dubai" className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full text-base font-medium transition">Dubai</Link>
          </div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">Explore</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Trending Destinations</h2>
          </div>
          <Link to="/discovery" className="hidden md:flex items-center gap-2 text-rose-500 font-semibold hover:text-rose-600 transition">
            <span>View all destinations</span>
            <span className="text-xl">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingDestinations.map((d) => (
            <TravelCard key={d.id} destination={d} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/discovery" className="inline-flex items-center gap-2 text-rose-500 font-semibold">
            <span>View all destinations</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">Discover</span>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">Experiences & Activities</h2>
            </div>
            <Link to="/experiences" className="hidden md:flex items-center gap-2 text-rose-500 font-semibold hover:text-rose-600 transition">
              <span>View all</span>
              <span className="text-xl">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {experiences.map((exp) => (
              <Link key={exp.id} to={`/search?q=${exp.title.toLowerCase()}`} className="group relative overflow-hidden rounded-2xl">
                <div className="aspect-square">
                  <img 
                    src={exp.image} 
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <p className="text-white/80 text-sm">{exp.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Deals */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-rose-50/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">Limited Time</span>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">Special Deals & Offers</h2>
            </div>
            <Link to="/deals" className="hidden md:flex items-center gap-2 text-rose-500 font-semibold hover:text-rose-600 transition">
              <span>View all deals</span>
              <span className="text-xl">→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <Link key={deal.id} to={`/search?q=${deal.destination.toLowerCase()}`} className="group relative overflow-hidden rounded-2xl">
                <div className="aspect-[4/3]">
                  <img 
                    src={deal.image} 
                    alt={deal.destination}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-amber-500 text-white text-sm font-bold rounded-full">
                    {deal.discount}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-2xl font-bold text-white">{deal.destination}</h3>
                  <p className="text-white/80 text-base">{deal.description}</p>
                  <p className="text-white/60 text-sm mt-1">Valid until {deal.validUntil}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">Benefits</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Why Travelers Choose Us</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto bg-rose-100 rounded-full flex items-center justify-center text-rose-500 text-3xl mb-5">
                {Icons.currencyDollar()}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Best Price Guarantee</h3>
              <p className="text-gray-500">We match any lower price you find elsewhere.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center text-amber-500 text-3xl mb-5">
                {Icons.shieldCheck()}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Secure Booking</h3>
              <p className="text-gray-500">Your payments are safe and encrypted.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 text-3xl mb-5">
                {Icons.support()}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">24/7 Support</h3>
              <p className="text-gray-500">We're here to help anytime, anywhere.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center text-purple-500 text-3xl mb-5">
                {Icons.star()}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Trusted Reviews</h3>
              <p className="text-gray-500">Real reviews from verified travelers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">What Our Travelers Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {travelers.map((traveler, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-5">
                  <img src={traveler.avatar} alt={traveler.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{traveler.name}</h4>
                    <p className="text-gray-500">{traveler.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-lg italic mb-4">"{traveler.text}"</p>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, j) => (
                    <span key={j}>{Icons.star()}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-24 px-4 relative overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gray-900/70"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md text-white/90 text-base font-medium rounded-full mb-6">
            Get Started Today
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto">
            Join millions of happy travelers and start planning your perfect trip today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/discovery" className="px-10 py-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-lg font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition shadow-xl">
              Explore Destinations
            </Link>
            <Link to="/signup" className="px-10 py-4 bg-white text-gray-800 text-lg font-semibold rounded-xl hover:bg-gray-100 transition">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-rose-500">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-3">Get Travel Deals in Your Inbox</h3>
          <p className="text-white/80 text-lg mb-8">Subscribe to our newsletter and get exclusive deals sent to your email.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 rounded-xl outline-none text-gray-700 text-lg"
            />
            <button type="submit" className="px-8 py-4 bg-gray-900 text-white text-lg font-semibold rounded-xl hover:bg-gray-800 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* App Download */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-white mb-4">Download Our App</h3>
            <p className="text-gray-400 text-lg mb-8">Get access to exclusive deals and book on-the-go with our mobile app.</p>
            <div className="flex gap-4">
              <button className="px-6 py-3.5 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center gap-4 transition border border-gray-700">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <p className="text-xs text-gray-400">Download on the</p>
                  <p className="text-base font-semibold text-white">App Store</p>
                </div>
              </button>
              <button className="px-6 py-3.5 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center gap-4 transition border border-gray-700">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <p className="text-xs text-gray-400">Get it on</p>
                  <p className="text-base font-semibold text-white">Google Play</p>
                </div>
              </button>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <div className="inline-flex items-center justify-center w-56 h-56 bg-gradient-to-br from-rose-500 to-amber-500 rounded-full">
              <span className="text-7xl">✈️</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}