import React, { useEffect, useState } from "react";

export default function SearchResult() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get search query from URL ?q=Paris
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");

    if (q) {
      setQuery(q);
      fetchResults(q);
    }
  }, []);

  async function fetchResults(searchQuery) {
    try {
      setLoading(true);

      // Example placeholder — replace with your real API later
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${searchQuery}`
      );
      const data = await response.json();

      setResults(data);
    } catch (error) {
      console.error("SEARCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Search Results for: <span className="text-blue-600">{query}</span>
      </h1>

      {loading && (
        <p className="text-gray-500 text-lg">Searching… Please wait.</p>
      )}

      {!loading && results.length === 0 && (
        <p className="text-gray-500 text-lg">No results found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {results.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">
              {item.name?.common || "Unknown"}
            </h2>

            {item.flags?.png && (
              <img
                src={item.flags.png}
                alt={item.flags.alt || item.name?.common}
                className="w-full h-40 object-cover rounded mt-3"
              />
            )}

            <p className="mt-3">
              <strong>Region:</strong> {item.region}
            </p>

            <p>
              <strong>Capital:</strong> {item.capital?.[0] || "N/A"}
            </p>

            <p>
              <strong>Population:</strong>{" "}
              {item.population?.toLocaleString() || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
