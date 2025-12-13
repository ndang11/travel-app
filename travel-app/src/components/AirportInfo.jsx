import React, { useEffect, useState } from "react";
import { getAirports } from "../services/airportService";

export default function AirportInfo({ countryCode }) {
  const [airports, setAirports] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY;

  useEffect(() => {
    async function fetchAirports() {
      setLoading(true);
      const data = await getAirports(countryCode);
      setAirports(data);

      const imgs = {};
      await Promise.all(
        data.map(async (airport) => {
          const query = encodeURIComponent(`${airport.name} airport`);
          const res = await fetch(
            `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${query}&image_type=photo&per_page=1`
          );
          const result = await res.json();
          imgs[airport.iata_code || airport.name] = result.hits[0]?.webformatURL;
        })
      );
      setImages(imgs);
      setLoading(false);
    }

    if (countryCode) fetchAirports();
  }, [countryCode]);

  if (loading) return <p>Loading airports...</p>;
  if (airports.length === 0) return <p>No airports found in {countryCode}.</p>;

  return (
    <div>
      <h2>Airports in {countryCode}</h2>
      <ul>
        {airports.map((airport) => (
          <li key={airport.iata_code || airport.name} style={{ marginBottom: "20px" }}>
            <strong>{airport.name}</strong> ({airport.iata_code || "N/A"}) – {airport.city}
            {images[airport.iata_code || airport.name] && (
              <img
                src={images[airport.iata_code || airport.name]}
                alt={airport.name}
                style={{ width: "250px", display: "block", marginTop: "10px" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
