import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [open, setOpen] = useState(false);

  // LOAD FAVORITES COUNT
  useEffect(() => {
    function syncFavorites() {
      const favs = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavoritesCount(favs.length);
    }

    syncFavorites();
    window.addEventListener("storage", syncFavorites);

    return () => window.removeEventListener("storage", syncFavorites);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
    setQuery("");
    setOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link to="/" className="text-2xl font-extrabold text-blue-600">
            🌍 TravelX
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "font-semibold text-blue-600" : "text-gray-600"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/destination"
              className={({ isActive }) =>
                isActive ? "font-semibold text-blue-600" : "text-gray-600"
              }
            >
              Destinations
            </NavLink>

            <NavLink
              to="/booking"
              className={({ isActive }) =>
                isActive ? "font-semibold text-blue-600" : "text-gray-600"
              }
            >
              Booking
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "font-semibold text-blue-600" : "text-gray-600"
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "font-semibold text-blue-600" : "text-gray-600"
              }
            >
              Contact
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? "font-semibold text-blue-600" : "text-gray-600"
              }
            >
              Favorites
              {favoritesCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {favoritesCount}
                </span>
              )}
            </NavLink>

            {/* SEARCH */}
            <form onSubmit={handleSearch} className="flex">
              <input
                className="border rounded-l-lg px-3 py-1 text-sm focus:outline-none"
                placeholder="Search country..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="bg-blue-600 text-white px-3 rounded-r-lg text-sm">
                Go
              </button>
            </form>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-4">

          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="block font-medium"
          >
            Home
          </NavLink>

          <NavLink
            to="/destination"
            onClick={() => setOpen(false)}
            className="block font-medium"
          >
            Destinations
          </NavLink>

          <NavLink
            to="/booking"
            onClick={() => setOpen(false)}
            className="block font-medium"
          >
            Booking
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setOpen(false)}
            className="block font-medium"
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="block font-medium"
          >
            Contact
          </NavLink>

          <NavLink
            to="/favorites"
            onClick={() => setOpen(false)}
            className="block font-medium"
          >
            Favorites ({favoritesCount})
          </NavLink>

          <form onSubmit={handleSearch} className="flex">
            <input
              className="flex-1 border rounded-l-lg px-3 py-2"
              placeholder="Search country..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 rounded-r-lg">
              Go
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}
