export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">About TravelX</h1>

      <p className="text-gray-700">
        TravelX is a smart travel companion designed to help travelers explore
        destinations with confidence. We bring together weather forecasts,
        attractions, airports, maps, bookings, and currency conversion in one
        seamless experience.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">🌍 Destinations</h3>
          <p className="text-sm text-gray-600">
            Discover top cities and countries with real-time travel data.
          </p>
        </div>

        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">✈️ Travel Planning</h3>
          <p className="text-sm text-gray-600">
            Find airports, weather, attractions, and local info in one place.
          </p>
        </div>

        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">🧳 Easy Booking</h3>
          <p className="text-sm text-gray-600">
            Book hotels and tours with a simple and intuitive interface.
          </p>
        </div>
      </div>
    </div>
  );
}
