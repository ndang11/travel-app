const COUNTRIES_BASE = "https://restcountries.com/v3.1";
const CITIES_BASE = "https://api.api-ninjas.com/v1/city";
const API_KEY = import.meta.env.VITE_API_NINJAS_KEY;

export async function searchLocations(query) {
  if (!query || query.trim().length < 3) return [];

  const safeQuery = encodeURIComponent(query.trim());
  const results = [];

  try {
    const res = await fetch(`${COUNTRIES_BASE}/name/${safeQuery}`);
    if (res.ok) {
      const data = await res.json();
      results.push(
        ...data.map((c) => ({
          type: "country",
          name: c.name.common,
          code: c.cca2,
          flag: c.flags?.png,
        }))
      );
    }
  } catch {}

  if (!API_KEY) return results;

  try {
    const res = await fetch(
      `${CITIES_BASE}?name=${safeQuery}&limit=5`,
      { headers: { "X-Api-Key": API_KEY } }
    );

    if (res.ok) {
      const data = await res.json();
      results.push(
        ...data.map((c) => ({
          type: "city",
          name: c.name,
          country: c.country,
          lat: c.latitude,
          lon: c.longitude,
          population: c.population,
        }))
      );
    }
  } catch {}

  return results;
}