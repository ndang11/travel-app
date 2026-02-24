const API_KEY = import.meta.env.VITE_PLACES_API_KEY;
const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_KEY;
const GEOAPIFY_GEOCODE_URL = "https://api.geoapify.com/v1/geocode";
const GEOAPIFY_PLACES_URL = "https://api.geoapify.com/v2/places";

/**
 * Get city coordinates from city name
 */
async function getCityCoordinates(city) {
  if (!GEOAPIFY_KEY) return null;

  try {
    const response = await fetch(
      `${GEOAPIFY_GEOCODE_URL}/search?text=${encodeURIComponent(city)}&format=json&apiKey=${GEOAPIFY_KEY}`
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (!data?.results?.[0]) return null;

    return {
      lat: data.results[0].lat,
      lon: data.results[0].lon,
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

/**
 * Get places by category and city
 * @param {string} city - City name
 * @param {string} category - Category (restaurants, cafes, bars, shopping)
 * @param {number} limit - Number of results
 * @returns {Promise<Array>} Array of place objects
 */
export const getPlaces = async (city, category = "restaurants", limit = 10) => {
  if (!city) return [];

  // Get coordinates for the city
  const coords = await getCityCoordinates(city);
  
  if (!coords || !GEOAPIFY_KEY) {
    console.warn("Geoapify API unavailable for places");
    return [];
  }

  const categoryMap = {
    restaurants: "catering.restaurant",
    cafes: "catering.cafe",
    bars: "catering.bar",
    shopping: "commercial.shopping_mall",
  };

  try {
    const response = await fetch(
      `${GEOAPIFY_PLACES_URL}?categories=${categoryMap[category]}&lat=${coords.lat}&lon=${coords.lon}&radius=5000&limit=${limit}&apiKey=${GEOAPIFY_KEY}`
    );

    if (!response.ok) {
      console.warn(`Places API error ${response.status}`);
      return [];
    }

    const data = await response.json();
    
    if (!data.features || !Array.isArray(data.features)) {
      return [];
    }

    return data.features
      .filter(item => item.properties?.name)
      .map((item) => ({
        name: item.properties.name,
        type: category,
        rating: item.properties.rating || null,
        address: item.properties.address_line1 || item.properties.city || "",
        lat: item.properties.lat,
        lon: item.properties.lon,
      }));
  } catch (error) {
    console.error("getPlaces error:", error);
    return [];
  }
};

/**
 * Get top attractions for a city
 */
export const getTopAttractions = async (city, limit = 10) => {
  if (!city) return [];

  const coords = await getCityCoordinates(city);
  
  if (!coords || !GEOAPIFY_KEY) {
    return [];
  }

  try {
    const response = await fetch(
      `${GEOAPIFY_PLACES_URL}?categories=tourism&lat=${coords.lat}&lon=${coords.lon}&radius=10000&limit=${limit}&apiKey=${GEOAPIFY_KEY}`
    );

    if (!response.ok) return [];

    const data = await response.json();
    
    if (!data.features) return [];

    return data.features
      .filter(item => item.properties?.name)
      .map((item) => ({
        name: item.properties.name,
        type: "attraction",
        rating: item.properties.rating || null,
        address: item.properties.address_line1 || "",
        lat: item.properties.lat,
        lon: item.properties.lon,
      }));
  } catch (error) {
    console.error("getTopAttractions error:", error);
    return [];
  }
};

export const getRestaurants = async (city, limit = 10) => getPlaces(city, "restaurants", limit);
export const getCafes = async (city, limit = 10) => getPlaces(city, "cafes", limit);
export const getBars = async (city, limit = 10) => getPlaces(city, "bars", limit);
export const getShoppingPlaces = async (city, limit = 10) => getPlaces(city, "shopping", limit);
