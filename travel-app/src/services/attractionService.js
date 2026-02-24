const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_KEY;
const GEOAPIFY_GEOCODE_URL = "https://api.geoapify.com/v1/geocode";
const GEOAPIFY_PLACES_URL = "https://api.geoapify.com/v2/places";

/**
 * Get city coordinates from city name using geocoding
 * @param {string} city - City name
 * @returns {Promise<Object|null>} Coordinates or null
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
 * Get attractions by city name
 * @param {string} city - City name to search for attractions
 * @param {number} limit - Maximum number of results
 * @returns {Promise<Array>} Array of attraction objects
 */
export async function getAttractionsByCity(city, limit = 10) {
  if (!city) return [];

  // First get coordinates from city name
  const coords = await getCityCoordinates(city);
  
  if (!coords || !GEOAPIFY_KEY) {
    console.warn("Geoapify API unavailable, no attractions returned");
    return [];
  }

  try {
    const response = await fetch(
      `${GEOAPIFY_PLACES_URL}?categories=tourism&lat=${coords.lat}&lon=${coords.lon}&radius=10000&limit=${limit}&apiKey=${GEOAPIFY_KEY}`
    );

    if (!response.ok) {
      console.warn(`Geoapify places API error ${response.status}`);
      return [];
    }

    const data = await response.json();

    if (!data.features || !Array.isArray(data.features)) {
      return [];
    }

    return data.features
      .filter(item => item.properties?.name)
      .map((item) => ({
        id: item.properties.place_id,
        name: item.properties.name,
        category: item.properties.categories?.[0] || "tourism",
        lat: item.properties.lat,
        lon: item.properties.lon,
        address: item.properties.address_line1 || "",
        rating: item.properties.rating || null,
      }));
  } catch (error) {
    console.error("getAttractionsByCity error:", error);
    return [];
  }
}

/**
 * Get attractions by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {number} limit - Maximum number of results
 * @returns {Promise<Array>} Array of attraction objects
 */
export async function getAttractionsByCoords(lat, lon, limit = 10) {
  if (!lat || !lon) return [];

  if (!GEOAPIFY_KEY) {
    console.warn("Geoapify API key missing");
    return [];
  }

  try {
    const response = await fetch(
      `${GEOAPIFY_PLACES_URL}?categories=tourism&lat=${lat}&lon=${lon}&radius=10000&limit=${limit}&apiKey=${GEOAPIFY_KEY}`
    );

    if (!response.ok) {
      console.warn(`Geoapify places API error ${response.status}`);
      return [];
    }

    const data = await response.json();

    if (!data.features || !Array.isArray(data.features)) {
      return [];
    }

    return data.features
      .filter(item => item.properties?.name)
      .map((item) => ({
        id: item.properties.place_id,
        name: item.properties.name,
        category: item.properties.categories?.[0] || "tourism",
        lat: item.properties.lat,
        lon: item.properties.lon,
        address: item.properties.address_line1 || "",
        rating: item.properties.rating || null,
      }));
  } catch (error) {
    console.error("getAttractionsByCoords error:", error);
    return [];
  }
}
