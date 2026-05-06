import { useEffect, useState } from "react";
import { getPixabayImage } from "../services/pixabayService";

const FOODS = [
  "Local Street Food",
  "Traditional Dish",
  "Popular Dessert",
  "Seafood Special",
];

export default function FoodList({ city }) {
  const [images, setImages] = useState({});

  useEffect(() => {
    async function load() {
      const imgs = {};
      for (const food of FOODS) {
        imgs[food] = await getPixabayImage(`${city} ${food}`);
      }
      setImages(imgs);
    }
    load();
  }, [city]);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">
        🍽️ Food & Local Dishes
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {FOODS.map((food) => (
          <div
            key={food}
            className="bg-white rounded shadow hover:shadow-xl"
          >
            <img
              src={images[food]}
              className="h-32 w-full object-cover rounded-t"
            />
            <div className="p-3 font-semibold text-center">
              {food}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}