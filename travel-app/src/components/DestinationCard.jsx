import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPixabayImage } from "../services/pixabayService";

export default function DestinationCard({ destination }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const searchTerm = destination.capital?.[0] || destination.name?.common || destination.name;
    getPixabayImage(searchTerm).then((img) => {
      setImage(img);
      setLoading(false);
    });
  }, [destination]);

  const countryName = destination.name?.common || destination.name || "";
  const capital = destination.capital?.[0] || "";
  const region = destination.region || "";

  return (
    <Link to={`/destination/${destination.cca2}`} className="group">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-56 overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          ) : (
            <img
              src={image}
              alt={countryName}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
              {region}
            </span>
          </div>
          <button 
            onClick={(e) => e.preventDefault()}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-rose-500 transition-colors">
                {countryName}
              </h3>
              {capital && (
                <p className="text-sm text-gray-500 mt-1">{capital}</p>
              )}
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <span className="text-amber-400">★</span>
                <span className="font-semibold text-gray-900">4.8</span>
              </div>
              <p className="text-xs text-gray-400">1.2k reviews</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {destination.subregion || region}
            </span>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{destination.timezone?.[0] || "UTC"}</span>
            </div>
            <span className="text-rose-500 font-semibold text-sm group-hover:translate-x-1 transition-transform">
              Explore →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}