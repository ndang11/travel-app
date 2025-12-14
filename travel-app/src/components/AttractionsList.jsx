import { useEffect, useState } from "react";
import { getPixabayImage } from "../services/pixabayService";

export default function AttractionsList({ country }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function loadImage() {
      const img = await getPixabayImage(`${country} tourist attraction`);
      setImage(img);
    }

    loadImage();
  }, [country]);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-3">Top Attractions</h2>

      <div className="border rounded overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={country}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            No image available
          </div>
        )}

        <div className="p-4">
          <p className="text-gray-600">
            Discover popular attractions in {country}.
          </p>
        </div>
      </div>
    </section>
  );
}
