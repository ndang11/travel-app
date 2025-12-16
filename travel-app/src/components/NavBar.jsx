import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-indigo-600">
          ROYAL-Tour
        </NavLink>

        <div className="flex gap-6">
          {[
            { to: "/", label: "Home" },
            { to: "/discovery", label: "Discovery" },
            { to: "/booking", label: "Booking" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-medium ${
                  isActive
                    ? "text-white -600 border-b-2 border-indigo-600"
                    : "text-white -600 hover:text-indigo-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
