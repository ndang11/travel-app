const API_KEY = import.meta.env.VITE_AVIATIONSTACK_KEY;
const BASE_URL = "https://api.aviationstack.com/v1/airports";

if (!API_KEY) {
  console.warn("AviationStack API key is missing. Set VITE_AVIATIONSTACK_KEY in .env file");
}

/**
 * Get airports by country name
 * @param {string} countryName - Country name
 * @param {number} limit - Maximum number of results
 * @returns {Promise<Array>} Array of airport objects
 */
export async function getAirportsByCountry(countryName, limit = 10) {
  if (!countryName) {
    console.warn("Country name is required");
    return [];
  }

  if (!API_KEY) {
    console.warn("AviationStack API key missing");
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}?access_key=${API_KEY}&country_name=${encodeURIComponent(countryName)}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`Airport API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.data || !Array.isArray(data.data)) {
      return [];
    }

    return data.data;
  } catch (error) {
    console.error("getAirportsByCountry error:", error);
    return [];
  }
}

/**
 * Search airports by name or code
 * @param {string} query - Search query
 * @param {number} limit - Maximum results
 * @returns {Promise<Array>} Array of matching airports
 */
export async function searchAirports(query, limit = 10) {
  if (!query) return [];

  if (!API_KEY) {
    console.warn("AviationStack API key missing");
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}?access_key=${API_KEY}&search=${encodeURIComponent(query)}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`Airport search API error: ${response.status}`);
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("searchAirports error:", error);
    return [];
  }
}
