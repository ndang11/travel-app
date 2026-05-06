import { Link } from "react-router-dom";
import Icons from "./Icons";

export default function TravelCard({ destination }) {
  return (
    <Link to={`/destination/${destination.code}`} className="group">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-56 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <div className="absolute top-3 right-3">
            <button 
              onClick={(e) => e.preventDefault()}
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40 transition"
            >
              {Icons.heart()}
            </button>
          </div>
          
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-lg font-bold text-white">{destination.name}</h3>
            <p className="text-white/80 text-sm">{destination.summary}</p>
          </div>
        </div>
        
        <div className="p-3.5 flex items-center justify-between">
          <div>
            <span className="text-rose-500 font-bold text-sm">{destination.price}</span>
            {destination.rating && (
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-amber-400">{Icons.star()}</span>
                <span className="font-semibold text-gray-900 text-sm">{destination.rating}</span>
                {destination.reviews && (
                  <span className="text-gray-400 text-xs">({(destination.reviews / 1000).toFixed(1)}k)</span>
                )}
              </div>
            )}
          </div>
          <span className="text-rose-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}