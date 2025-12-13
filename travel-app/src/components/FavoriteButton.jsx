// src/components/FavoriteButton.jsx
import React, { useState } from "react";

export default function FavoriteButton({ countryCode }) {
  const [favorite, setFavorite] = useState(false);

  function toggleFavorite() {
    setFavorite(!favorite);
    // optionally store in localStorage or backend
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
      className={`px-4 py-2 rounded font-bold ${
        favorite ? "bg-red-500 text-white" : "bg-gray-200 text-black"
      }`}
    >
      {favorite ? "Unfavorite" : "Favorite"}
    </button>
  );
}
