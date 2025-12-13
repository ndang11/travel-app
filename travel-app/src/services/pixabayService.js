const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY;

export async function getImage(query) {
  try {
    const res = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(
        query
      )}&image_type=photo&per_page=1`
    );
    const data = await res.json();
    return data.hits[0]?.webformatURL || null;
  } catch (error) {
    console.error("getImage error:", error);
    return null;
  }
}
