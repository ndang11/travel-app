import axios from "axios";

const API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;

let tokenCache = null;
let tokenExpiry = null;

export async function getAmadeusToken() {
  if (tokenCache && Date.now() < tokenExpiry) {
    return tokenCache;
  }

  try {
    const res = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    tokenCache = res.data.access_token;
    tokenExpiry = Date.now() + res.data.expires_in * 1000;

    return tokenCache;
  } catch (error) {
    console.error("Amadeus Auth Error:", error.response?.data || error);
    throw new Error("Failed to authenticate with Amadeus");
  }
}
