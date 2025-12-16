import { useEffect, useState } from "react";

export default function useFavorites(key = "favoriteAirports") {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(key)) || [];
    setFavorites(saved);
  }, [key]);

  function toggleFavorite(item) {
    const exists = favorites.find((f) => f.iata_code === item.iata_code);
    const updated = exists
      ? favorites.filter((f) => f.iata_code !== item.iata_code)
      : [...favorites, item];

    setFavorites(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  }

  return { favorites, toggleFavorite };
}
