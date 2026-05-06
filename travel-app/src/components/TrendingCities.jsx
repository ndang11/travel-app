import { useNavigate } from "react-router-dom";
import { getPixabayImage } from "../services/pixabayService";
import { useEffect, useState } from "react";

const CITIES = [
  { name: "Paris", country: "France", tag: "City of Lights" },
  { name: "Dubai", country: "UAE", tag: "Luxury & Adventure" },
  { name: "Tokyo", country: "Japan", tag: "Culture & Technology" },
  { name: "Rome", country: "Italy", tag: "Ancient History" },
  { name: "New York", country: "USA", tag: "The Big Apple" },
  { name: "London", country: "UK", tag: "Historic & Modern" },
];

const CATEGORIES = [
  { name: "Beach", icon: "🏖️", color: "bg-amber-100" },
  { name: "Mountain", icon: "🏔️", color: "bg-green-100" },
  { name: "City", icon: "🏙️", color: "bg-blue-100" },
  { name: "Historical", icon: "🏛️", color: "bg-orange-100" },
  { name: "Adventure", icon: "🎢", color: "bg-red-100" },
  { name: "Nature", icon: "🌿", color: "bg-emerald-100" },
];

export default function TrendingCities() {
  const [images, setImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const imgs = {};
      for (const city of CITIES) {
        imgs[city.name] = await getPixabayImage(city.name);
      }
      setImages(imgs);
    }
    load();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.name}
            className={`${cat.color} rounded-2xl p-6 text-center cursor-pointer hover:shadow-lg transition-all hover:scale-105`}
          >
            <span className="text-4xl block mb-2">{cat.icon}</span>
            <span className="font-semibold text-gray-700">{cat.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Cities</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CITIES.map((city) => (
            <div
              key={city.name}
              onClick={() => navigate(`/destination/${city.name}`)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={images[city.name]}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-amber-400 text-sm font-medium">★ 4.9</span>
                  <h4 className="text-white text-xl font-bold mt-1">{city.name}</h4>
                  <p className="text-white/80 text-sm">{city.country}</p>
                </div>
              </div>
              <div className="p-4 bg-white">
                <span className="inline-block px-3 py-1 bg-rose-100 text-rose-600 text-sm font-medium rounded-full">
                  {city.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}