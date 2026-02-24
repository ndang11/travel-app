import React, { useEffect, useState } from "react";
import { getPixabayImage } from "../services/pixabayService";

// Category icons mapping
const CATEGORY_ICONS = {
  Museum: "🏛️",
  Park: "🌳",
  Beach: "🏖️",
  "Historic Site": "🏰",
  "Shopping District": "🛍️",
  Zoo: "🦁",
  Tower: "🗼",
  Temple: "⛩️",
  Market: "🛒",
  Palace: "👑",
  Cathedral: "⛪",
  Garden: "🌺",
  Restaurant: "🍽️",
  Nightclub: "🎉",
  Aquarium: "🐠",
  Stadium: "🏟️",
  Library: "📚",
  Gallery: "🎨",
};

// Default attractions with categories
const ATTRACTIONS = [
  { name: "Museum", description: "Discover art, history, and culture", category: "Culture" },
  { name: "Park", description: "Relax in beautiful green spaces", category: "Nature" },
  { name: "Beach", description: "Enjoy sun, sand, and sea", category: "Nature" },
  { name: "Historic Site", description: "Explore historical landmarks", category: "History" },
  { name: "Shopping District", description: "Shop local and international brands", category: "Shopping" },
  { name: "Zoo", description: "Meet wildlife and exotic animals", category: "Family" },
];

// Attraction Card Component
function AttractionCard({ attraction, image, isHovered, onHover }) {
  const icon = CATEGORY_ICONS[attraction.name] || "📍";

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onMouseEnter={() => onHover(attraction.name)}
      onMouseLeave={() => onHover(null)}
      style={{
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={attraction.name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
            <span className="text-5xl">{icon}</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700">
            {attraction.category}
          </span>
        </div>

        {/* Icon Badge */}
        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-xl shadow-md">
          {icon}
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm">
          <span className="text-yellow-500 text-sm">⭐</span>
          <span className="text-sm font-bold text-slate-800">4.8</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
          {attraction.name}
        </h3>
        <p className="text-sm text-slate-600 mt-1 line-clamp-2">
          {attraction.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-500">Popular attraction</span>
          <div className="flex items-center gap-1 text-indigo-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
            <span>Explore</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AttractionsList({ city }) {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    if (!city) return;

    async function loadImages() {
      setLoading(true);
      const results = {};

      for (const attraction of ATTRACTIONS) {
        try {
          const img = await getPixabayImage(`${city} ${attraction.name}`);
          results[attraction.name] = img;
        } catch {
          results[attraction.name] = null;
        }
      }

      setImages(results);
      setLoading(false);
    }

    loadImages();
  }, [city]);

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-48 bg-slate-200 rounded animate-pulse" />
          <div className="h-6 w-24 bg-slate-200 rounded animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ATTRACTIONS.map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
              <div className="h-48 bg-slate-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg">
            🎯
          </div>
          <div>
            <h3 className="font-bold text-xl text-slate-900">Top Attractions</h3>
            <p className="text-sm text-slate-500">Must-see places in {city}</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-sm text-slate-500">Sort by:</span>
          <select className="text-sm border-none bg-slate-100 rounded-lg px-3 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Popular</option>
            <option>Rating</option>
            <option>Distance</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {["All", "Culture", "Nature", "History", "Shopping", "Family"].map((cat, idx) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              idx === 0
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Attractions Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ATTRACTIONS.map((attraction) => (
          <AttractionCard
            key={attraction.name}
            attraction={attraction}
            image={images[attraction.name]}
            isHovered={hoveredCard === attraction.name}
            onHover={setHoveredCard}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center pt-4">
        <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all inline-flex items-center gap-2">
          <span>View All Attractions in {city}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
