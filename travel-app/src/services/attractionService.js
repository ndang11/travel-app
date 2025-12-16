const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

if (!GEOAPIFY_KEY) {
  console.error("Missing Geoapify API key");
}

export async function getAttractionsByCity(city) {
  try {
    const res = await fetch(
      `https://api.geoapify.com/v2/places?categories=tourism&text=${city}&limit=9&apiKey=${GEOAPIFY_KEY}`
    );

    if (!res.ok) throw new Error("Geoapify request failed");

    const data = await res.json();

    return data.features.map((item) => ({
      id: item.properties.place_id,
      name: item.properties.name,
      category: item.properties.categories?.[0],
      distance: item.properties.distance,
      lat: item.properties.lat,
      lon: item.properties.lon,
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    }));
  } catch (err) {
    console.error("Attractions error:", err);
    return [];
  }
}
