import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchCountries } from "../services/countryService";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const debounced = useDebounce(term, 400);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      if (!debounced || debounced.length < 2) {
        setResults([]);
        return;
      }

      const data = await searchCountries(debounced);
      setResults(data.slice(0, 6));
    }

    load();
  }, [debounced]);

  function handleSelect(country) {
    navigate(`/destination/${country.code}`);
    setResults([]);
    setTerm("");
  }

  return (
    <div className="relative w-full max-w-md">
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search country..."
        className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
      />

      {results.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded shadow">
          {results.map((c) => (
            <li
              key={c.code}
              onClick={() => handleSelect(c)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            >
              <img
                src={c.flag}
                alt={c.name}
                className="w-6 h-4 object-cover"
              />
              <span>{c.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
