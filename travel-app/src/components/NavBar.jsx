import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Search", path: "/search" },
    { name: "Bookings", path: "/bookings" },
  ];

  const destinations = [
    { name: "Paris", path: "/destination/paris" },
    { name: "Tokyo", path: "/destination/tokyo" },
    { name: "New York", path: "/destination/new-york" },
  ];

  const attractions = [
    { name: "Eiffel Tower", path: "/attraction/eiffel-tower" },
    { name: "Disneyland Tokyo", path: "/attraction/disneyland-tokyo" },
    { name: "Central Park", path: "/attraction/central-park" },
  ];

  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TravelApp
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Destinations Dropdown */}
          <div className="relative">
            <button
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              className="text-gray-700 hover:text-blue-500 font-medium"
            >
              Destinations
            </button>
            {dropdownOpen && (
              <div
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-48"
              >
                {destinations.map((dest) => (
                  <Link
                    key={dest.name}
                    to={dest.path}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                  >
                    {dest.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Attractions Dropdown */}
          <div className="relative">
            <button className="text-gray-700 hover:text-blue-500 font-medium">
              Attractions
            </button>
            <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-48 hidden group-hover:block">
              {attractions.map((attr) => (
                <Link
                  key={attr.name}
                  to={attr.path}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                >
                  {attr.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="mt-2">
              <p className="font-medium mb-1">Destinations</p>
              {destinations.map((dest) => (
                <Link
                  key={dest.name}
                  to={dest.path}
                  onClick={() => setMenuOpen(false)}
                  className="block px-2 py-1 text-gray-700 hover:bg-blue-100 rounded"
                >
                  {dest.name}
                </Link>
              ))}
            </div>

            <div className="mt-2">
              <p className="font-medium mb-1">Attractions</p>
              {attractions.map((attr) => (
                <Link
                  key={attr.name}
                  to={attr.path}
                  onClick={() => setMenuOpen(false)}
                  className="block px-2 py-1 text-gray-700 hover:bg-blue-100 rounded"
                >
                  {attr.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
