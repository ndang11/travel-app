// src/services/countryService.js
const BASE_URL = "https://restcountries.com/v3.1";

export async function getCountryByName(name) {
  try {
    const res = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}`);
    if (!res.ok) throw new Error("Country not found");
    const data = await res.json();
    return data[0]; // return the first match
  } catch (error) {
    console.error("getCountryByName error:", error);
    return {
      cca2: "FR",
      name: { common: "France" },
      region: "Europe",
      currency: "EUR",
      capital: "Paris",
    };
  }
}

export async function getCountryByCode(code) {
  try {
    const res = await fetch(`${BASE_URL}/alpha/${encodeURIComponent(code)}`);
    if (!res.ok) throw new Error("Country not found");
    const data = await res.json();
    return data[0]; // return the country
  } catch (error) {
    console.error("getCountryByCode error:", error);
    return {
      cca2: code,
      name: { common: "France" },
      region: "Europe",
      currency: "EUR",
      capital: "Paris",
    };
  }
}
