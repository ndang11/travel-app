import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchLocations } from "../services/locationService";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debounced = useDebounce(term, 400);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
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
      
      setLoading(true);
      setIsOpen(true);
      
      const data = await searchLocations(debounced);
      setResults(data);
      setLoading(false);
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
    setIsOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (results.length > 0) {
      handleSelect(results[0]);
    }
  }

  // Group results by type
  const countries = results.filter(r => r.type === "country");
  const cities = results.filter(r => r.type === "city");

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          {/* Search Icon */}
          <div className="absolute left-4 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Input */}
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search for a destination..."
            className="w-full pl-12 pr-12 py-4 text-lg bg-white border-2 border-transparent rounded-2xl shadow-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
          />

          {/* Clear Button */}
          {term && (
            <button
              type="button"
              onClick={() => { setTerm(""); setResults([]); setIsOpen(false); }}
              className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
          {loading ? (
            <div className="p-4">
              <div className="flex items-center gap-3 text-gray-500">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                <span>Searching...</span>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {/* Countries Section */}
              {countries.length > 0 && (
                <div className="p-2">
                  <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Countries
                  </p>
                  {countries.map((r, i) => (
                    <button
                      key={`c-${i}`}
                      onClick={() => handleSelect(r)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-indigo-50 rounded-xl transition-colors text-left"
                    >
                      <img 
                        src={r.flag} 
                        alt={r.name}
                        className="w-8 h-5 object-cover rounded shadow-sm" 
                      />
                      <span className="font-medium text-gray-800">{r.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Cities Section */}
              {cities.length > 0 && (
                <div className="p-2 border-t border-gray-100">
                  <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Cities
                  </p>
                  {cities.map((r, i) => (
                    <button
                      key={`city-${i}`}
                      onClick={() => handleSelect(r)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-indigo-50 rounded-xl transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">{r.name}</span>
                        <span className="text-gray-400 text-sm ml-2">{r.country}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : debounced.length >= 2 ? (
            <div className="p-6 text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>No results found for "{term}"</p>
              <p className="text-sm mt-1">Try searching for a country or city</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
