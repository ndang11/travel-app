// import axios from "axios";

// const API_KEY = import.meta.env.VITE_HOTELS_API_KEY;
// const BASE_URL = "https://api.yourhotelsprovider.com"; // Replace with real hotels API

// export const searchHotels = async ({ city, checkin, checkout }) => {
//   if (!city || !checkin || !checkout) return [];

//   try {
//     const response = await axios.get(`${BASE_URL}/hotels/search`, {
//       params: {
//         city,
//         checkin,
//         checkout,
//         key: API_KEY,
//       },
//     });
//     return response.data.results; 
//   } catch (error) {
//     console.error("Error fetching hotels:", error);
//     return [];
//   }
// };

import api from "./api";


const KEY = import.meta.env.VITE_AMADEUS_API_KEY;


export const getHotels = async (cityCode) => {
const { data } = await api.get(
"https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city", {
headers: { Authorization: `Bearer ${KEY}` },
params: { cityCode },
}
);
return data.data;
};