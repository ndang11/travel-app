import { getAmadeusToken } from "../services/amadeusAuth";

export async function getHotels(cityCode) {
  try {
    const token = await getAmadeusToken();

    const res = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=20&radiusUnit=KM&hotelSource=ALL`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Hotel fetch failed: ${res.status}`);
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Hotel fetch error:", error);
    return [];
  }
}