import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchLocations } from "../services/locationService";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const debounced = useDebounce(term, 400);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function load() {
      if (debounced.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }
      const data = await searchLocations(debounced);
      setResults(data);
      setIsOpen(data.length > 0);
    }
    load();
  }, [debounced]);

  function handleSelect(item) {
    if (item.type === "country") {
      navigate(`/destination/${item.code}`);
    } else {
      navigate(`/destination/${item.name}`);
    }
    setResults([]);
    setTerm("");
    setIsOpen(false);
  }

  function handleSearch() {
    if (term.trim().length >= 2 && results.length > 0) {
      handleSelect(results[0]);
    } else if (term.trim().length >= 2) {
      searchLocations(term.trim()).then((data) => {
        if (data.length > 0) {
          handleSelect(data[0]);
        }
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (results.length > 0) {
      handleSelect(results[0]);
    }
  }

  return (
    <div className="relative w-full">
      <div className="relative flex items-center bg-white rounded-full shadow-2xl overflow-hidden">
        <div className="flex-1 flex items-center px-6 py-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            placeholder="Where do you want to go?"
            className="w-full outline-none text-gray-700 placeholder-gray-400 text-lg"
          />
        </div>
        <button
          onClick={handleSearch}
          className="m-2 px-6 py-3 bg-rose-500 text-white font-semibold rounded-full hover:bg-rose-600 transition-colors"
        >
          Search
        </button>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
          <ul className="max-h-80 overflow-y-auto">
            {results.map((r, i) => (
              <li
                key={i}
                onClick={() => handleSelect(r)}
                className="px-6 py-4 hover:bg-gray-50 cursor-pointer flex items-center gap-4 border-b border-gray-100 last:border-0 transition-colors"
              >
                {r.type === "country" && (
                  <>
                    <img src={r.flag} alt={r.name} className="w-8 h-6 rounded object-cover" />
                    <div>
                      <span className="font-semibold text-gray-900">{r.name}</span>
                      <span className="text-gray-400 text-sm ml-2">Country</span>
                    </div>
                  </>
                )}

                {r.type === "city" && (
                  <>
                    <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">{r.name}</span>
                      <span className="text-gray-400 text-sm ml-2">{r.country}</span>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}