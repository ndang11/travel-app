import axios from "axios";

const AMADEUS_API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const AMADEUS_API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;
const AMADEUS_BASE_URL = import.meta.env.VITE_AMADEUS_BASE_URL || "https://test.api.amadeus.com";

let accessToken = null;
let tokenExpiry = null;

// Demo hotel data (fallback)
const demoHotels = [
  {
    hotelId: "HT001",
    name: "Grand Palace Hotel",
    price: { amount: 120, currency: "USD" },
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    amenities: ["WIFI", "POOL", "SPA", "GYM", "RESTAURANT"],
    address: { cityName: "New York" },
  },
  {
    hotelId: "HT002",
    name: "City View Inn",
    price: { amount: 80, currency: "USD" },
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210b7?w=400&h=300&fit=crop",
    amenities: ["WIFI", "BREAKFAST", "PARKING"],
    address: { cityName: "New York" },
  },
  {
    hotelId: "HT003",
    name: "Seaside Resort",
    price: { amount: 200, currency: "USD" },
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
    amenities: ["WIFI", "POOL", "BEACH", "RESTAURANT", "BAR"],
    address: { cityName: "Miami" },
  },
  {
    hotelId: "HT004",
    name: "Mountain Lodge",
    price: { amount: 95, currency: "USD" },
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=300&fit=crop",
    amenities: ["WIFI", "PARKING", "HIKING_TRAILS"],
    address: { cityName: "Denver" },
  },
  {
    hotelId: "HT005",
    name: "Urban Boutique Hotel",
    price: { amount: 150, currency: "USD" },
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    amenities: ["WIFI", "GYM", "BAR", "ROOM_SERVICE"],
    address: { cityName: "Los Angeles" },
  },
  {
    hotelId: "HT006",
    name: "Cozy Stay Hotel",
    price: { amount: 65, currency: "USD" },
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
    amenities: ["WIFI", "PARKING"],
    address: { cityName: "Chicago" },
  },
];

/**
 * Get Amadeus access token
 */
async function getAccessToken() {
  if (!AMADEUS_API_KEY || !AMADEUS_API_SECRET) {
    console.warn("Amadeus API credentials missing");
    return null;
  }

  // Check if token is still valid
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await axios.post(
      `${AMADEUS_BASE_URL}/v1/security/oauth2/token`,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: AMADEUS_API_KEY,
        client_secret: AMADEUS_API_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in - 60) * 1000;
    return accessToken;
  } catch (error) {
    console.error("Amadeus auth error:", error.message);
    return null;
  }
}

/**
 * Search hotels by city
 * @param {string} city - City name
 * @returns {Promise<Array>} Array of hotel objects
 */
export async function searchHotels(city) {
  if (!city) {
    console.warn("City is required for hotel search");
    return demoHotels;
  }

  const token = await getAccessToken();

  if (!token) {
    console.warn("Amadeus API unavailable, using demo hotels");
    return demoHotels.map(h => ({ ...h, address: { cityName: city } }));
  }

  try {
    // First, get city code
    const cityResponse = await axios.get(
      `${AMADEUS_BASE_URL}/v1/reference-data/locations/cities`,
      {
        params: { keyword: city, max: 1 },
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const cityCode = cityResponse.data?.[0]?.iataCode;
    if (!cityCode) {
      console.warn("City not found, using demo hotels");
      return demoHotels.map(h => ({ ...h, address: { cityName: city } }));
    }

    // Search hotels
    const hotelResponse = await axios.get(
      `${AMADEUS_BASE_URL}/v2/shopping/hotel-offers`,
      {
        params: {
          cityCode,
          radius: "50",
          radiusUnit: "KM",
          paymentPolicy: "NONE",
          include: "HOTEL",
          sort: "PRICE",
        },
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const offers = hotelResponse.data?.data || [];
    return offers.map((offer) => ({
      hotelId: offer.hotel?.hotelId,
      name: offer.hotel?.name,
      price: offer.offers?.[0]?.price,
      rating: offer.hotel?.rating,
      image: offer.hotel?.images?.[0]?.url,
      amenities: offer.hotel?.amenities,
      address: offer.hotel?.address,
    }));
  } catch (error) {
    console.error("Hotel search error:", error.message);
    return demoHotels.map(h => ({ ...h, address: { cityName: city } }));
  }
}

/**
 * Get hotel details by ID
 * @param {string} hotelId - Hotel ID
 * @returns {Promise<Object>} Hotel details
 */
export async function getHotelById(hotelId) {
  if (!hotelId) return null;

  const token = await getAccessToken();

  if (!token) {
    return demoHotels.find(h => h.hotelId === hotelId) || demoHotels[0];
  }

  try {
    const response = await axios.get(
      `${AMADEUS_BASE_URL}/v1/shopping/hotel-offers/by-hotel/${hotelId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const offer = response.data?.data;
    if (!offer) return demoHotels[0];

    return {
      hotelId: offer.hotel?.hotelId,
      name: offer.hotel?.name,
      price: offer.offers?.[0]?.price,
      rating: offer.hotel?.rating,
      image: offer.hotel?.images?.[0]?.url,
      amenities: offer.hotel?.amenities,
      address: offer.hotel?.address,
      description: offer.hotel?.description,
    };
  } catch (error) {
    console.error("Get hotel error:", error.message);
    return demoHotels.find(h => h.hotelId === hotelId) || demoHotels[0];
  }
}

// Legacy function for compatibility
export async function getHotels(cityCode) {
  return searchHotels(cityCode);
}
