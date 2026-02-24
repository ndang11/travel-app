import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPixabayImage } from "../services/pixabayService";

// Star rating component
function StarRating({ rating }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } else {
      stars.push(
        <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
}

export default function DestinationCard({ destination }) {
  const [image, setImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Use provided image or fetch from pixabay
  const displayImage = destination.image || image;

  useEffect(() => {
    if (!destination.image) {
      getPixabayImage(destination.name).then(setImage);
    }
  }, [destination.name, destination.image]);

  // Generate random rating for demo purposes
  const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);

  // Generate random price level for demo
  const priceLevel = "$".repeat(Math.floor(Math.random() * 3) + 1);

  return (
    <Link to={`/destination/${destination.code}`}>
      <div
        className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        }}
      >
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

          {/* Image */}
          {displayImage ? (
            <img
              src={displayImage}
              alt={destination.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-out"
              style={{
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
              <span className="text-5xl text-white/50">✈️</span>
            </div>
          )}

          {/* Price Tag */}
          <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-sm font-bold text-indigo-600">{priceLevel}</span>
          </div>

          {/* Country Code Badge */}
          <div className="absolute top-4 left-4 z-20 bg-indigo-600/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-semibold text-white uppercase">{destination.code}</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-5">
          {/* Title and Rating Row */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-xl text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                {destination.name}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Popular destination</p>
            </div>
            <div className="flex flex-col items-end">
              <StarRating rating={rating} />
              <span className="text-xs text-gray-500 mt-0.5">{rating}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {destination.summary}
          </p>

          {/* Explore Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-indigo-600 font-semibold text-sm">
              <span>Explore</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  isHovered ? 'translate-x-1' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            {/* Decorative dots */}
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-200 group-hover:bg-indigo-400 transition-colors duration-300"></span>
              <span className="w-2 h-2 rounded-full bg-indigo-300 group-hover:bg-indigo-500 transition-colors duration-300 delay-75"></span>
              <span className="w-2 h-2 rounded-full bg-indigo-400 group-hover:bg-indigo-600 transition-colors duration-300 delay-150"></span>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
        />
      </div>
    </Link>
  );
}
