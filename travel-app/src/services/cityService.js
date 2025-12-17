const BASE_URL = "https://api.api-ninjas.com/v1/city";
const API_KEY = import.meta.env.VITE_API_NINJAS_KEY;

/**
 * Search cities by name
 * @param {string} query
 * @returns {Promise<Array>}
 */
export async function searchCities(query) {
  if (!API_KEY) {
    console.error(" Missing VITE_API_NINJAS_KEY in .env");
    return [];
  }

  try {
    const res = await fetch(`${BASE_URL}?name=${query}&limit=6`, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    if (!res.ok) throw new Error("City API request failed");

    const data = await res.json();

    return data.map((city) => ({
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
      population: city.population,
    }));
  } catch (error) {
    console.error("City search error:", error);
    return [];
  }
}
