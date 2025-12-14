import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPixabayImage } from "../services/pixabayService";

export default function DestinationCard({ destination }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    getPixabayImage(destination.name).then(setImage);
  }, [destination.name]);

  return (
    <Link to={`/destination/${destination.code}`}>
      <div className="border rounded overflow-hidden hover:shadow-lg transition">
        {image && (
          <img
            src={image}
            alt={destination.name}
            className="w-full h-48 object-cover"
          />
        )}

        <div className="p-4">
          <h3 className="font-bold text-lg">{destination.name}</h3>
          <p className="text-gray-600">{destination.summary}</p>
        </div>
      </div>
    </Link>
  );
}
