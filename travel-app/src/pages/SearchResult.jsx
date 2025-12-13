// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getCountryByName } from "../services/countryService";
import AttractionsList from "../components/AttractionsList";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;

    async function search() {
      try {
        const data = await getCountryByName(query);
        // Wrap in array if API returns single object
        setResults(Array.isArray(data) ? data : [data]);
      } catch {
        setResults([]);
      }
    }

    search();
  }, [query]);

  if (!query) return <p>Please enter a search query.</p>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">
        Search results for "{query}"
      </h2>

      {results.length === 0 && <p>No results found</p>}

      {results.map((country) => {
        const lat = country.latlng?.[0];
        const lon = country.latlng?.[1];

        return (
          <div
            key={country.cca2}
            className="border rounded-lg p-4 hover:shadow transition cursor-pointer"
            onClick={() => navigate(`/destination/${country.cca2}`)}
          >
            <h3 className="font-semibold text-xl">{country.name.common}</h3>
            <p className="text-sm text-gray-500">{country.region}</p>

            {lat && lon && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Top Attractions</h4>
                <AttractionsList lat={lat} lon={lon} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
