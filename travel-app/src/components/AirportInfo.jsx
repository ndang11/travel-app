import { useState, useEffect } from "react";
import { getAirportInfo } from "../../services/airportApi";

export default function AirportInfo({ iataCode }) {
  const [airport, setAirport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!iataCode) return;

    async function fetchAirport() {
      setLoading(true);
      setError(null);
      try {
        const data = await getAirportInfo(iataCode);
        setAirport(data);
      } catch (err) {
        setError("Unable to load airport information.");
      } finally {
        setLoading(false);
      }
    }

    fetchAirport();
  }, [iataCode]);

  if (loading) return <p className="text-blue-500">Loading airport details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!airport) return <p>No airport info available.</p>;

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-2">Airport Information</h2>
      <p><strong>Name:</strong> {airport.name}</p>
      <p><strong>City:</strong> {airport.city}</p>
      <p><strong>Country:</strong> {airport.country}</p>
      <p><strong>IATA Code:</strong> {airport.iata}</p>
      {airport.flights && (
        <div className="mt-3">
          <h3 className="font-semibold">Upcoming Flights</h3>
          <ul className="list-disc ml-5">
            {airport.flights.map((flight, index) => (
              <li key={index}>
                {flight.airline} — {flight.time} ({flight.days})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}