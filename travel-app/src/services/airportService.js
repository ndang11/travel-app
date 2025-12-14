const API_KEY = import.meta.env.VITE_API_NINJAS_KEY;
const BASE_URL = "https://api.api-ninjas.com/v1/airports";

export async function getAirports(countryCode) {
  if (!countryCode) return [];

  try {
    const res = await fetch(`${BASE_URL}?country=${countryCode}`, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    if (!res.ok) throw new Error("Airports not found");

    return await res.json();
  } catch (error) {
    console.error("getAirports error:", error);
    return [];
  }
}
