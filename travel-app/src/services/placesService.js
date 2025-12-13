import axios from "axios";

const API_KEY = import.meta.env.VITE_PLACES_API_KEY;
const BASE_URL = "https://api.yourplacesprovider.com"; // Replace with real places API

export const getTopAttractions = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/places/attractions`, {
      params: {
        place: city,
        key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching attractions:", error);
    return [];
  }
};
