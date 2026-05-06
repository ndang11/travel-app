import React, { useEffect, useState } from "react";
import { getPixabayImage } from "../services/pixabayService";

const CATEGORY_ICONS = {
  Museum: "🏛️",
  Park: "🌳",
  Beach: "🏖️",
  "Historic Site": "🏰",
  "Shopping District": "🛍️",
  Zoo: "🦁",
  Tower: "🗼",
  Temple: "⛩️",
  Market: "🛒",
  Palace: "👑",
  Cathedral: "⛪",
  Garden: "🌺",
  Restaurant: "🍽️",
  Nightclub: "🎉",
  Aquarium: "🐠",
  Stadium: "🏟️",
  Library: "📚",
  Gallery: "🎨",
};

const ATTRACTIONS = [
  { name: "Museums", description: "Discover art, history, and culture", icon: "🏛️" },
  { name: "Parks", description: "Relax in beautiful green spaces", icon: "🌳" },
  { name: "Beaches", description: "Enjoy sun, sand, and sea", icon: "🏖️" },
  { name: "Historic Sites", description: "Explore ancient landmarks", icon: "🏰" },
  { name: "Shopping", description: "Shop local and international brands", icon: "🛍️" },
  { name: "Landmarks", description: "Iconic places you must visit", icon: "📸" },
];

const MOCK_ATTRACTIONS_DETAILS = {
  "Museums": [
    { name: "National Museum", address: "123 Museum Ave", hours: "9:00 AM - 6:00 PM", ticket: "$15", rating: 4.5, desc: "Explore extensive collections of art and artifacts from around the world. Features interactive exhibits and guided tours.", phone: "+1 234 567 890", website: "www.nationalmuseum.com" },
    { name: "Modern Art Gallery", address: "45 Arts District", hours: "10:00 AM - 8:00 PM", ticket: "$12", rating: 4.3, desc: "Contemporary artworks by local and international artists. Rotating exhibitions monthly.", phone: "+1 234 567 891", website: "www.modernartgallery.com" },
    { name: "History Museum", address: "78 Heritage Rd", hours: "9:00 AM - 5:00 PM", ticket: "$10", rating: 4.7, desc: "Journey through the region's rich historical past with artifacts and multimedia presentations.", phone: "+1 234 567 892", website: "www.historymuseum.com" },
  ],
  "Parks": [
    { name: "Central Park", address: "City Center", hours: "6:00 AM - 11:00 PM", ticket: "Free", rating: 4.8, desc: "A beautiful urban oasis with walking trails, gardens, and lakes. Perfect for jogging and picnics.", phone: "+1 234 567 893", website: "www.centralpark.com" },
    { name: "Botanical Gardens", address: "1 Garden Lane", hours: "8:00 AM - 6:00 PM", ticket: "$8", rating: 4.6, desc: "Exotic plants and serene walking paths. Guided tours available.", phone: "+1 234 567 894", website: "www.botanicalgardens.com" },
    { name: "Adventure Park", address: "55 Forest Way", hours: "9:00 AM - 7:00 PM", ticket: "$25", rating: 4.4, desc: "Outdoor activities including zip-lining, climbing walls, and tree top adventures.", phone: "+1 234 567 895", website: "www.adventurepark.com" },
  ],
  "Beaches": [
    { name: "Sunset Beach", address: "Coastal Highway", hours: "24 hours", ticket: "Free", rating: 4.9, desc: "Pristine golden sand beach with stunning sunset views. Beach volleyball and water sports available.", phone: "+1 234 567 896", website: "www.sunsetbeach.com" },
    { name: "Crystal Cove", address: "Bay Area", hours: "6:00 AM - 9:00 PM", ticket: "$5", rating: 4.7, desc: "Clear waters perfect for snorkeling and swimming. Equipment rentals available.", phone: "+1 234 567 897", website: "www.crystalcove.com" },
    { name: "Surf Beach", address: "Ocean Drive", hours: "24 hours", ticket: "Free", rating: 4.5, desc: "Popular spot for surfing enthusiasts of all levels. Surf lessons offered.", phone: "+1 234 567 898", website: "www.surfbeach.com" },
  ],
  "Historic Sites": [
    { name: "Ancient Fortress", address: "Hilltop Ave", hours: "8:00 AM - 6:00 PM", ticket: "$18", rating: 4.8, desc: "Well-preserved fortress with panoramic city views. Audio guides available in multiple languages.", phone: "+1 234 567 899", website: "www.ancientfortress.com" },
    { name: "Old Town", address: "Historic Quarter", hours: "24 hours", ticket: "Free", rating: 4.6, desc: "Charming cobblestone streets with centuries-old buildings. Walking tours available.", phone: "+1 234 567 900", website: "www.oldtown.com" },
    { name: "Royal Palace", address: "1 Palace Rd", hours: "9:00 AM - 5:00 PM", ticket: "$20", rating: 4.7, desc: "Magnificent palace showcasing royal heritage. Don't miss the crown jewels exhibition.", phone: "+1 234 567 901", website: "www.royalpalace.com" },
  ],
  "Shopping": [
    { name: "Grand Mall", address: "Shopping District", hours: "10:00 AM - 10:00 PM", ticket: "Free", rating: 4.4, desc: "Premium shopping with international brands. Food court and entertainment zone available.", phone: "+1 234 567 902", website: "www.grandmall.com" },
    { name: "Traditional Market", address: "Old Market St", hours: "7:00 AM - 7:00 PM", ticket: "Free", rating: 4.5, desc: "Local crafts, spices, and authentic souvenirs. Best for unique finds.", phone: "+1 234 567 903", website: "www.traditionalmarket.com" },
    { name: "Night Bazaar", address: "Evening Plaza", hours: "6:00 PM - 12:00 AM", ticket: "Free", rating: 4.3, desc: "Vibrant night market with street food and live entertainment.", phone: "+1 234 567 904", website: "www.nightbazaar.com" },
  ],
  "Landmarks": [
    { name: "Iconic Tower", address: "Skyline Blvd", hours: "9:00 AM - 11:00 PM", ticket: "$30", rating: 4.9, desc: "Panoramic city views from the observation deck. Sunset tickets available.", phone: "+1 234 567 905", website: "www.iconictower.com" },
    { name: "Famous Bridge", address: "River Front", hours: "24 hours", ticket: "Free", rating: 4.7, desc: "Historic bridge with stunning architecture. Best views at night.", phone: "+1 234 567 906", website: "www.famousbridge.com" },
    { name: "Cathedral", address: "Church Square", hours: "8:00 AM - 6:00 PM", ticket: "Free", rating: 4.8, desc: "Stunning gothic architecture and peaceful interior. Organ concerts weekly.", phone: "+1 234 567 907", website: "www.cathedral.com" },
  ],
};

export default function AttractionsList({ city }) {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [attractionImage, setAttractionImage] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    if (!city) return;

    async function loadImages() {
      setLoading(true);
      const results = {};

      for (const attraction of ATTRACTIONS) {
        try {
          const img = await getPixabayImage(`${city} ${attraction.name}`);
          results[attraction.name] = img;
        } catch {
          results[attraction.name] = null;
        }
      }

      setImages(results);
      setLoading(false);
    }

    loadImages();
  }, [city]);

  const handleExplore = async (attractionName) => {
    const details = MOCK_ATTRACTIONS_DETAILS[attractionName] || [];
    if (details.length === 0) return;
    
    const firstAttraction = details[0];
    setSelectedAttraction(firstAttraction);
    setShowDetailModal(true);
    setLoadingDetail(true);
    
    try {
      const img = await getPixabayImage(`${city} ${firstAttraction.name}`);
      setAttractionImage(img);
    } catch {
      setAttractionImage(null);
    }
    
    setLoadingDetail(false);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedAttraction(null);
    setAttractionImage(null);
  };

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ATTRACTIONS.map((_, i) => (
          <div key={i} className="h-72 bg-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ATTRACTIONS.map(({ name, description, icon }) => (
          <div
            key={name}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <div className="relative h-44 overflow-hidden">
              {images[name] ? (
                <img
                  src={images[name]}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl">{icon}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-white font-bold text-lg">{name}</span>
                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white">
                  {icon}
                </span>
              </div>
            </div>

            <div className="p-4">
              <p className="text-gray-600 text-sm">{description}</p>
              <div className="mt-3 flex items-center justify-between">
                <button 
                  onClick={() => handleExplore(name)}
                  className="px-4 py-2 bg-rose-500 text-white font-semibold text-sm rounded-lg hover:bg-rose-600 transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-rose-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDetailModal && selectedAttraction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {loadingDetail ? (
              <div className="p-12 text-center">
                <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500">Loading attraction details...</p>
              </div>
            ) : (
              <>
                <div className="relative h-64 overflow-hidden rounded-t-3xl">
                  {attractionImage ? (
                    <img
                      src={attractionImage}
                      alt={selectedAttraction.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">
                      <span className="text-6xl">🏛️</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedAttraction.name}</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 text-lg">★ {selectedAttraction.rating}</span>
                      <span className="text-white/80">| {selectedAttraction.ticket}</span>
                    </div>
                  </div>
                  <button 
                    onClick={closeDetailModal}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">About</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedAttraction.desc}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="font-semibold text-gray-900">{selectedAttraction.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Hours</p>
                          <p className="font-semibold text-gray-900">{selectedAttraction.hours}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="font-semibold text-gray-900">{selectedAttraction.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Website</p>
                          <p className="font-semibold text-rose-500">{selectedAttraction.website}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button className="flex-1 py-3 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 transition">
                      Get Tickets
                    </button>
                    <button className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition">
                      Save to Favorites
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}