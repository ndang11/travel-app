import { useNavigate } from "react-router-dom";
import { getPixabayImage } from "../services/pixabayService";
import { useEffect, useState } from "react";

const CITIES = ["Paris", "Dubai", "Tokyo", "Rome", "New York"];

export default function TrendingCities() {
  const [images, setImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const imgs = {};
      for (const city of CITIES) {
        imgs[city] = await getPixabayImage(city);
      }
      setImages(imgs);
    }
    load();
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {CITIES.map((city) => (
        <div
          key={city}
          onClick={() => navigate(`/destination/${city}`)}
          className="rounded-lg overflow-hidden shadow hover:shadow-xl cursor-pointer"
        >
          <img
            src={images[city]}
            className="h-40 w-full object-cover"
          />
          <div className="p-4 font-semibold">{city}</div>
        </div>
      ))}
    </div>
  );
}