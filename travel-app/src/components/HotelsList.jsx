const HOTELS = [
  {
    name: "Grand Palace Hotel",
    price: 120,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
  {
    name: "City View Inn",
    price: 80,
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb210b7",
  },
];

export default function HotelsList({ city }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">🏨 Hotels in {city}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {HOTELS.map((h, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow hover:shadow-xl overflow-hidden"
          >
            <img
              src={h.image}
              className="h-40 w-full object-cover"
            />

            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg">{h.name}</h3>
              <div className="text-yellow-500">
                ⭐ {h.rating}
              </div>
              <div className="text-gray-600">
                From ${h.price}/night
              </div>

              <button className="mt-2 w-full bg-green-600 text-white py-2 rounded">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}