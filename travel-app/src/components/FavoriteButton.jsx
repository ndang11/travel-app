import React, { useState } from "react";

export default function FavoriteButton({ countryCode }) {
  const [favorite, setFavorite] = useState(false);

  function toggleFavorite(e) {
    e.stopPropagation();
    setFavorite(!favorite);
  
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favorite) {
      localStorage.setItem("favorites", JSON.stringify([...favorites, countryCode]));
    } else {
      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites.filter((code) => code !== countryCode))
      );
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all ${
        favorite 
          ? "bg-rose-500 text-white hover:bg-rose-600" 
          : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
      }`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-5 w-5 ${favorite ? "fill-current" : "stroke-current"}`}
        fill={favorite ? "currentColor" : "none"} 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      {favorite ? "Saved" : "Save"}
    </button>
  );
}