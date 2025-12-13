// src/services/airportService.js
const BASE_URL = "https://api.api-ninjas.com/v1/airports";
const API_KEY = import.meta.env.VITE_API_NINJAS_KEY;

/**
 * Fetch airports by ISO country code.
 * @param {string} countryCode - ISO 3166-1 alpha-2 code, e.g., "FR"
 * @returns {Promise<Array>} Array of airports
 */
export async function getAirports(countryCode) {
  try {
    const res = await fetch(`${BASE_URL}?country=${countryCode.toUpperCase()}`, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    if (!res.ok) throw new Error(`Airports not found: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getAirports error:", error);
    return [];
  }
}
