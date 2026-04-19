import { useEffect, useState } from "react";
import { getHotels } from "../components/HotelCard";
import { getPixabayImage } from "../services/pixabayService";

const HOTELS_BY_COUNTRY = {
  "France": { code: "PAR", hotels: ["Le Marais Hotel", "Eiffel View Inn", "Montmartre Grand", "Latin Quarter Hotel", "Champs Elysees Hotel", "Notre Dame Boutique"] },
  "Japan": { code: "TYO", hotels: ["Shibuya Excel", "Shinjuku Grand", "Tokyo Bay Resort", "Asakusa View", "Ginza Palace", "Harajuku Hotel"] },
  "Italy": { code: "ROM", hotels: ["Colosseum Hotel", "Trevi Fountain Inn", "Vatican View", "Spanish Steps Hotel", "Trastevere Resort", "Termini Station Hotel"] },
  "United States": { code: "NYC", hotels: ["Times Square Hotel", "Manhattan View", "Brooklyn Bridge Inn", "Central Park Hotel", "SoHo Boutique", "Chelsea Hotel"] },
  "Spain": { code: "BCN", hotels: ["La Rambla Hotel", "Gothic Quarter Inn", "Beach Resort Barcelona", "Sagrada Familia Hotel", "Barceloneta Hotel", "Eixample Hotel"] },
  "Thailand": { code: "BKK", hotels: ["Sukhumvit Hotel", "Khao San View", "Chao Phraya Resort", "Pataya Beach Hotel", "Old City Inn", "Airport Hotel"] },
  "Germany": { code: "BER", hotels: ["Brandenburg Hotel", "Alexanderplatz Inn", "Checkpoint Charlie Hotel", "East Side Gallery Hotel", "Museum Island Hotel", "Berlin Central Hotel"] },
  "Australia": { code: "SYD", hotels: ["Harbour View Hotel", "Bondi Beach Resort", "Opera House Hotel", "Circular Quay Inn", "The Rocks Hotel", "Darling Harbour Hotel"] },
  "Brazil": { code: "SAO", hotels: ["Paulista Hotel", "Ipanema View", "Copacabana Resort", "Centro Historico Inn", "Jardins Hotel", "Moema Boutique"] },
  "India": { code: "DEL", hotels: ["Connaught Place Hotel", "India Gate Inn", "Chandni Chowk Hotel", "Karol Bagh Hotel", "Aerocity Hotel", "Nehru Place Hotel"] },
};

export default function HotelsList({ city, countryCode }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useMock, setUseMock] = useState(false);

  useEffect(() => {
    async function loadHotels() {
      if (!city) return;
      
      setLoading(true);
      setUseMock(false);

      const countryData = HOTELS_BY_COUNTRY[city];
      
      if (countryData) {
        try {
          const data = await getHotels(countryData.code);
          
          if (data && data.length > 0) {
            const hotelsWithImages = await Promise.all(
              data.slice(0, 6).map(async (hotel) => {
                const img = await getPixabayImage(hotel.name || city);
                return { ...hotel, image: img };
              })
            );
            setHotels(hotelsWithImages);
          } else {
            throw new Error("No hotels returned");
          }
        } catch (err) {
          console.log("Using mock hotels due to API error:", err.message);
          setUseMock(true);
          const mockHotels = countryData.hotels.map((name, idx) => ({
            name,
            price: Math.floor(Math.random() * 150) + 80,
            rating: (Math.random() * 1.5 + 3.5).toFixed(1),
            tag: ["Popular", "Budget", "Luxury", "Boutique", "Trending", "Exclusive"][idx],
            image: null
          }));
          
          const withImages = await Promise.all(
            mockHotels.map(async (h) => ({
              ...h,
              image: await getPixabayImage(h.name)
            }))
          );
          setHotels(withImages);
        }
      } else {
        setUseMock(true);
        const mockHotels = [
          { name: "Grand Palace Hotel", price: 150, rating: 4.5, tag: "Popular", image: null },
          { name: "City View Inn", price: 85, rating: 4.2, tag: "Budget", image: null },
          { name: "Seaside Resort", price: 220, rating: 4.8, tag: "Luxury", image: null },
          { name: "Urban Boutique Hotel", price: 110, rating: 4.3, tag: "Boutique", image: null },
        ];
        
        const withImages = await Promise.all(
          mockHotels.map(async (h) => ({
            ...h,
            image: await getPixabayImage(h.name)
          }))
        );
        setHotels(withImages);
      }
      
      setLoading(false);
    }

    loadHotels();
  }, [city, countryCode]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-rose-100 text-rose-600 text-sm font-medium rounded-full">
            {hotels.length} Properties
          </span>
          {useMock && (
            <span className="px-2 py-1 bg-amber-100 text-amber-600 text-xs font-medium rounded-full">
              Suggested
            </span>
          )}
          <span className="text-gray-500 text-sm">in {city}</span>
        </div>
        <button className="text-rose-500 text-sm font-medium hover:underline">
          See all →
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {hotels.map((hotel, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer border border-gray-100"
            >
              <div className="relative h-36 overflow-hidden">
                {hotel.image ? (
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">
                    <span className="text-4xl">🏨</span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-md">
                    {hotel.tag || "Hotel"}
                  </span>
                </div>
                <button 
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-900 group-hover:text-rose-500 transition-colors truncate">
                  {hotel.name || "Hotel Name"}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400">★</span>
                    <span className="font-semibold text-gray-900">{hotel.rating || "4.5"}</span>
                    <span className="text-gray-400 text-sm">(128)</span>
                  </div>
                  <div>
                    <span className="text-lg font-bold text-rose-500">${hotel.price || "120"}</span>
                    <span className="text-gray-400 text-sm">/night</span>
                  </div>
                </div>
                <button className="mt-3 w-full py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}