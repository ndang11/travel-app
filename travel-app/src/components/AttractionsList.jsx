import React, { useEffect, useState } from "react";
import { getPixabayImage } from "../services/pixabayService";

const mockAttractions = [
  "Museum",
  "Park",
  "Beach",
  "Historic Site",
  "Shopping District",
  "Zoo",
];

export default function AttractionsList({ city }) {
  const [images, setImages] = useState({});

  useEffect(() => {
    async function loadImages() {
      const imgs = {};
      for (const attraction of mockAttractions) {
        const img = await getPixabayImage(`${city} ${attraction}`);
        imgs[attraction] = img;
      }
      setImages(imgs);
    }

    loadImages();
  }, [city]);

  function handleClick(attraction) {
    alert(`Explore more about ${attraction} in ${city}`);
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {mockAttractions.map((attr) => (
        <div
          key={attr}
          onClick={() => handleClick(attr)}
          className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden cursor-pointer transform transition-transform hover:-translate-y-2 hover:shadow-lg duration-300"
        >
          {images[attr] && (
            <img
              src={images[attr]}
              alt={attr}
              className="w-full h-40 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="font-semibold text-lg">{attr}</h3>
            <p className="text-gray-600 text-sm">Explore the best of {attr} in {city}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
