const BASE_URL = "https://restcountries.com/v3.1";

export async function searchCountries(query) {
  if (!query) return [];

  try {
    const res = await fetch(`${BASE_URL}/name/${query}`);
    if (!res.ok) throw new Error("Countries not found");

    const data = await res.json();

    return data.map((c) => ({
      name: c.name.common,
      code: c.cca2,
      flag: c.flags?.png || "",
    }));
  } catch (error) {
    console.error("searchCountries error:", error);
    return [];
  }
}

export async function getCountryByCode(code) {
  try {
    const res = await fetch(`${BASE_URL}/alpha/${code}`);
    if (!res.ok) throw new Error("Country not found");

    const data = await res.json();
    return data[0];
  } catch (error) {
    console.error("getCountryByCode error:", error);
    return null;
  }
}

export async function getCountryByName(name) {
  try {
    const res = await fetch(`${BASE_URL}/name/${name}?fullText=true`);
    if (!res.ok) throw new Error("Country not found");

    const data = await res.json();
    return data[0];
  } catch (error) {
    console.error("getCountryByName error:", error);
    return null;
  }
}
