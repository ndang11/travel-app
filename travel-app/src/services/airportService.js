const API_KEY = import.meta.env.VITE_AVIATIONSTACK_KEY;
const BASE_URL = "http://api.aviationstack.com/v1/airports";

export async function getAirports({ countryName, cityName }) {
  if (!API_KEY) {
    console.error(" Missing AviationStack API key. Add VITE_AVIATIONSTACK_KEY in .env");
    return [];
  }

  if (!countryName && !cityName) {
    console.warn("Either countryName or cityName is required");
    return [];
  }

  try {
    let url = `${BASE_URL}?access_key=${API_KEY}&limit=10`;
    if (countryName) url += `&country_name=${encodeURIComponent(countryName)}`;
    if (cityName) url += `&city=${encodeURIComponent(cityName)}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`AviationStack request failed: ${res.status}`);

    const data = await res.json();

    return (data?.data || []).map((airport) => ({
      name: airport.airport_name,
      city: airport.city,
      iata: airport.iata_code,
      icao: airport.icao_code,
      latitude: airport.latitude,
      longitude: airport.longitude,
      timezone: airport.timezone,
    }));
  } catch (error) {
    console.error("getAirports error:", error);
    return [];
  }
}
