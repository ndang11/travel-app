const BASE_URL = "https://restcountries.com/v3.1";

/**
 * Search countries by name
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of country objects
 */
export async function searchCountries(query) {
  if (!query || query.trim().length < 2) return [];

  try {
    const response = await fetch(`${BASE_URL}/name/${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`Country search failed: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((country) => ({
      name: country.name.common,
      code: country.cca2,
      flag: country.flags?.png || country.flags?.svg || "",
    }));
  } catch (error) {
    console.error("searchCountries error:", error);
    return [];
  }
}

/**
 * Get country by code (cca2)
 * @param {string} code - Country code (e.g., "US") or country name
 * @returns {Promise<Object|null>} Country object or null
 */
export async function getCountryByCode(code) {
  if (!code) return null;

  try {
    // If it looks like a city name (not a country code), search by name instead
    if (code.length > 3 || !/^[A-Z]{2}$/i.test(code)) {
      // Try searching by name
      const searchResponse = await fetch(`${BASE_URL}/name/${encodeURIComponent(code)}?fullText=true`);
      
      if (!searchResponse.ok) {
        return null;
      }

      const data = await searchResponse.json();

      if (!Array.isArray(data) || data.length === 0) {
        return null;
      }

      return data[0];
    }

    // It's a country code
    const response = await fetch(`${BASE_URL}/alpha/${encodeURIComponent(code)}`);
    
    if (!response.ok) {
      throw new Error(`Country fetch failed: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return data[0];
  } catch (error) {
    console.error("getCountryByCode error:", error);
    return null;
  }
}

/**
 * Get country by full name
 * @param {string} name - Country name
 * @returns {Promise<Object|null>} Country object or null
 */
export async function getCountryByName(name) {
  if (!name) return null;

  try {
    const response = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}?fullText=true`);
    
    if (!response.ok) {
      throw new Error(`Country fetch failed: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return data[0];
  } catch (error) {
    console.error("getCountryByName error:", error);
    return null;
  }
}
