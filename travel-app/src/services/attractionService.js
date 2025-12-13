const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export async function getAttractions(lat, lon) {
  try {
    if (!API_KEY) {
      throw new Error("Missing Geoapify API key");
    }

    const url = `https://api.geoapify.com/v2/places?categories=tourism.sights,tourism.attraction&filter=circle:${lon},${lat},10000&limit=9&apiKey=${API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch attractions");

    const data = await res.json();

    return data.features.map((item) => ({
      id: item.properties.place_id,
      name: item.properties.name || "Attraction",
      address: item.properties.formatted,
      image:
        item.properties.datasource?.raw?.image ||
        "https://images.unsplash.com/photo-1502920514313-52581002a659",
    }));
  } catch (err) {
    console.error("Geoapify attraction error:", err);
    return [];
  }
}
