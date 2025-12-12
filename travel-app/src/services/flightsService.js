export async function getAirportInfo(iataCode) {
  const API_KEY = import.meta.env.VITE_AIRPORT_API_KEY;
  const url = `https://api.api-ninjas.com/v1/airports?iata=${iataCode}`;

  const response = await fetch(url, {
    headers: { "X-Api-Key": API_KEY },
  });

  if (!response.ok) throw new Error("API request failed");

  const data = await response.json();
  return data[0] || null;
}