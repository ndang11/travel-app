import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchLocations } from "../services/locationService";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const debounced = useDebounce(term, 400);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      if (debounced.length < 3) {
        setResults([]);
        return;
      }
      setResults(await searchLocations(debounced));
    }
    load();
  }, [debounced]);

  function handleSelect(item) {
    if (item.type === "country") {
      navigate(`/destination/${item.code}`);
    } else {
      navigate(`/destination/${item.country}/${item.name}`);
    }
    setResults([]);
    setTerm("");
  }

  return (
    <div className="relative max-w-lg">
      <div className="flex gap-2">
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search country or city..."
          className="flex-1 border rounded px-4 py-2"
        />
        <button className="bg-blue-600 text-white px-4 rounded">
          Search
        </button>
      </div>

      {results.length > 0 && (
        <ul className="absolute z-10 bg-white w-full mt-1 border rounded shadow">
          {results.map((r, i) => (
            <li
              key={i}
              onClick={() => handleSelect(r)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              {r.type === "country" && (
                <>
                  <img src={r.flag} className="w-6 h-4" />
                  <span>{r.name}</span>
                </>
              )}

              {r.type === "city" && (
                <span>
                  📍 {r.name}, <span className="text-gray-500">{r.country}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}