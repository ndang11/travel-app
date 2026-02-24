import { useState, useEffect } from "react";
import { searchHotels } from "../services/hotelsService";

// Hotel card component
function HotelCard({ hotel }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Image Container */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
          <span className="text-yellow-500 text-sm">⭐</span>
          <span className="text-sm font-bold text-slate-800">{hotel.rating || "4.5"}</span>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-indigo-600 text-white px-3 py-1.5 rounded-full text-sm font-bold">
            From ${hotel.price || "120"}/night
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
          {hotel.name}
        </h3>
        
        <div className="flex items-center gap-2 mt-2 text-slate-500 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>City Center</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-3">
          {["WiFi", "Pool", "Breakfast"].slice(0, 3).map((amenity, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Book Button */}
        <button className="mt-4 w-full py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
          Book Now
        </button>
      </div>
    </div>
  );
}

export default function HotelsList({ city }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    async function fetchHotels() {
      try {
        setLoading(true);
        const data = await searchHotels(city);
        // Use fetched data or fallback to defaults
        setHotels(data.length > 0 ? data : getDefaultHotels());
      } catch (err) {
        setHotels(getDefaultHotels());
      } finally {
        setLoading(false);
      }
    }

    fetchHotels();
  }, [city]);

  // Default hotels fallback
  function getDefaultHotels() {
    return [
      {
        name: "Grand Palace Hotel",
        price: 120,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      },
      {
        name: "City View Inn",
        price: 80,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210b7?w=400",
      },
      {
        name: "Seaside Resort",
        price: 200,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400",
      },
    ];
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-6 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-sm">🏨</span>
          </div>
          <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
              <div className="h-44 bg-slate-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
            <span className="text-xl">🏨</span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Popular Hotels</h3>
            <p className="text-xs text-slate-500">Top-rated stays in {city}</p>
          </div>
        </div>
      </div>

      {/* Hotel Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.slice(0, 6).map((hotel, idx) => (
          <HotelCard key={idx} hotel={hotel} />
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center pt-2">
        <button className="text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors inline-flex items-center gap-1">
          View all hotels in {city}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
