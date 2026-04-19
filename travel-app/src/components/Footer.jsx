
import React from 'react';

const Footer = () => {
  const navSections = [
    {
      title: 'Explore',
      links: [
        { name: 'Top Destinations', href: '/destinations' },
        { name: 'Travel Guides', href: '/guides' },
        { name: 'Featured Tours', href: '/tours' },
        { name: 'Airport Info', href: '/airport' },
      ],
    },
    {
      title: 'Bookings',
      links: [
        { name: 'Manage Flights', href: '/bookings/flights' },
        { name: 'Hotel Reservations', href: '/bookings/hotels' },
        { name: 'Tour History', href: '/bookings/tours' },
        { name: 'Currency Tools', href: '/currency' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact Support', href: '/contact' },
        { name: 'Booking', href: '/booking' },
      ],
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-[1400px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold text-accent-orange tracking-wider">
             ROYAL-Tour
            </h3>
            <p className="text-sm text-gray-400">
              Your one-stop source for comprehensive travel planning.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition">F</a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition">T</a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition">I</a>
            </div>
          </div>

          {navSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-lg font-semibold text-white border-b border-accent-orange/50 pb-1">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-accent-orange transition duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 order-2 md:order-1 mt-4 md:mt-0">
            &copy; {currentYear} Destination Navigator, Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm order-1 md:order-2">
            <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a>
            <a href="/sitemap" className="text-gray-400 hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;