import React, { useEffect, useState } from "react";
import { getPixabayImage } from "../services/pixabayService";

const ATTRACTIONS = [
  {
    name: "Museum",
    description: "Discover history, culture, and art from around the world.",
  },
  {
    name: "Park",
    description: "Relax in beautiful green spaces and nature reserves.",
  },
  {
    name: "Beach",
    description: "Enjoy sunshine, sand, and ocean views.",
  },
  {
    name: "Historic Site",
    description: "Explore landmarks rich in history and heritage.",
  },
  {
    name: "Shopping District",
    description: "Shop local markets and modern malls.",
  },
  {
    name: "Zoo",
    description: "Experience wildlife and conservation centers.",
  },
];

export default function AttractionsList({ city }) {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;

    async function loadImages() {
      setLoading(true);
      const result = {};

      for (const attraction of ATTRACTIONS) {
        const img = await getPixabayImage(
          `${city} ${attraction.name}`
        );
        result[attraction.name] = img;
      }

      setImages(result);
      setLoading(false);
    }

    loadImages();
  }, [city]);

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-6 animate-pulse">
        {ATTRACTIONS.map((_, i) => (
          <div key={i} className="h-48 bg-gray-300 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {ATTRACTIONS.map((attr) => (
        <div
          key={attr.name}
          className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
        >
          {images[attr.name] && (
            <img
              src={images[attr.name]}
              alt={attr.name}
              className="w-full h-40 object-cover"
            />
          )}

          <div className="p-4">
            <h3 className="font-semibold text-lg">{attr.name}</h3>
            <p className="text-sm text-gray-600">{attr.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}