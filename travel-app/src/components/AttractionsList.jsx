import React, { useEffect, useState } from "react";
import { getPixabayImage } from "../services/pixabayService";

const ATTRACTIONS = [
  {
    name: "Museum",
    description: "Discover art, history, and culture."
  },
  {
    name: "Park",
    description: "Relax in beautiful green spaces."
  },
  {
    name: "Beach",
    description: "Enjoy sun, sand, and sea."
  },
  {
    name: "Historic Site",
    description: "Explore historical landmarks."
  },
  {
    name: "Shopping District",
    description: "Shop local and international brands."
  },
  {
    name: "Zoo",
    description: "Meet wildlife and exotic animals."
  }
];

export default function AttractionsList({ city }) {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

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
      <div className="grid md:grid-cols-3 gap-6 animate-pulse">
        {ATTRACTIONS.map((_, i) => (
          <div key={i} className="h-48 bg-gray-300 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {ATTRACTIONS.map(({ name, description }) => (
        <div
          key={name}
          className="bg-white rounded-lg shadow border overflow-hidden hover:shadow-xl transition"
        >
          {images[name] && (
            <img
              src={images[name]}
              alt={name}
              className="h-40 w-full object-cover"
            />
          )}

          <div className="p-4">
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
            <button className="mt-3 text-blue-600 text-sm font-semibold hover:underline">
              Explore →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
