const COUNTRIES_BASE = "https://restcountries.com/v3.1";
const CITIES_BASE = "https://api.api-ninjas.com/v1/city";
const GEOAPIFY_GEOCODE = "https://api.geoapify.com/v1/geocode";
const API_KEY = import.meta.env.VITE_API_NINJAS_KEY;
const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

export async function searchLocations(query) {
  if (!query || query.trim().length < 2) return [];

  const safeQuery = encodeURIComponent(query.trim());
  const results = [];
  const seenNames = new Set();

  try {
    const res = await fetch(`${COUNTRIES_BASE}/name/${safeQuery}?limit=5`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        data.forEach((c) => {
          const key = c.name.common.toLowerCase();
          if (!seenNames.has(key)) {
            seenNames.add(key);
            results.push({
              type: "country",
              name: c.name.common,
              code: c.cca2,
              flag: c.flags?.png || c.flags?.svg,
            });
          }
        });
      }
    }
  } catch {}

  let citiesFound = false;
  if (API_KEY) {
    try {
      const res = await fetch(
        `${CITIES_BASE}?name=${safeQuery}&limit=5`,
        { headers: { "X-Api-Key": API_KEY } }
      );

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          citiesFound = true;
          data.forEach((c) => {
            const key = `${c.name.toLowerCase()}-${c.country.toLowerCase()}`;
            if (!seenNames.has(key)) {
              seenNames.add(key);
              results.push({
                type: "city",
                name: c.name,
                country: c.country,
                lat: c.latitude,
                lon: c.longitude,
                population: c.population,
              });
            }
          });
        }
      }
    } catch (err) {
      console.log("City search unavailable:", err.message);
    }
  }

  if (!citiesFound && GEOAPIFY_KEY) {
    try {
      const res = await fetch(
        `${GEOAPIFY_GEOCODE}/autocomplete?text=${safeQuery}&format=json&limit=5&apiKey=${GEOAPIFY_KEY}`
      );

      if (res.ok) {
        const data = await res.json();
        if (data?.results) {
          data.results.forEach((r) => {
            if (r.result_type === "city" || r.result_type === "town") {
              const key = `${r.city?.toLowerCase() || r.name?.toLowerCase()}-${r.country?.toLowerCase()}`;
              if (!seenNames.has(key) && (r.city || r.name)) {
                seenNames.add(key);
                results.push({
                  type: "city",
                  name: r.city || r.name,
                  country: r.country,
                  lat: r.lat,
                  lon: r.lon,
                });
              }
            }
          });
        }
      }
    } catch {}
  }

  return results.slice(0, 10);
}