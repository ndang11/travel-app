const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
const BASE_URL = "https://pixabay.com/api/";

export async function getPixabayImage(query) {
  try {
    const res = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
        query
      )}&image_type=photo&per_page=3&safesearch=true`
    );

    if (!res.ok) throw new Error("Pixabay fetch failed");

    const data = await res.json();

    return data.hits?.[0]?.webformatURL || null;
  } catch (error) {
    console.error("Pixabay error:", error);
    return null;
  }
}
