import api from "./api";
import { getAmadeusToken } from "./amadeusAuth";

export async function getHotels(cityCode) {
  try {
    const token = await getAmadeusToken();

    const res = await api.get(
      "/v1/reference-data/locations/hotels/by-city",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          cityCode,
          radius: 20,
          radiusUnit: "KM",
          hotelSource: "ALL",
        },
      }
    );

    return res.data.data;
  } catch (error) {
    console.error("Hotel fetch error:", error);
    return [];
  }
}