import { useEffect, useState } from "react";
import { getAirports } from "../services/airportService";
import { getPixabayImage } from "../services/pixabayService";

export default function AirportInfo({ countryCode, countryName }) {
  const [airports, setAirports] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!countryCode) return;

    async function loadData() {
      const airportData = await getAirports(countryCode);
      setAirports(airportData.slice(0, 3));

      const img = await getPixabayImage(`${countryName} airport`);
      setImage(img);
    }

    loadData();
  }, [countryCode, countryName]);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Airports</h2>

      {image && (
        <img
          src={image}
          alt={`${countryName} airport`}
          className="w-full h-56 object-cover rounded"
        />
      )}

      {airports.length === 0 && (
        <p className="text-gray-500">No airport data available.</p>
      )}

      <ul className="space-y-2">
        {airports.map((a, i) => (
          <li key={i} className="border p-3 rounded">
            <p className="font-semibold">{a.name}</p>
            <p className="text-sm text-gray-600">
              {a.city || "Unknown city"} — {a.iata || "N/A"}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
