const API_KEY = import.meta.env.VITE_AVIATIONSTACK_KEY;
const BASE_URL = "https://api.aviationstack.com/v1/airports";

export async function getAirportsByCountry(countryName, limit = 10) {
  try {
    if (!API_KEY) {
      console.error("Missing AviationStack API key");
      return [];
    }

    if (!countryName) {
      console.warn("⚠️ Country name is required");
      return [];
    }

    const url = `${BASE_URL}?access_key=${API_KEY}&country_name=${encodeURIComponent(
      countryName
    )}&limit=${limit}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("AviationStack request failed");
    }

    const data = await res.json();

    if (!data?.data) {
      throw new Error("Invalid AviationStack response");
    }

    return data.data;
  } catch (error) {
    console.error("getAirportsByCountry error:", error.message);
    return [];
  }
}
