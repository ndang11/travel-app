const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
const BASE_URL = "https://pixabay.com/api/";

if (!API_KEY) {
  console.warn("Pixabay API key is missing. Set VITE_PIXABAY_API_KEY in .env file");
}

/**
 * Get images from Pixabay based on a search query
 * @param {string} query - Search query
 * @param {number} count - Number of images to return (min 3)
 * @returns {Promise<Array>} Array of image URLs
 */
export async function getPixabayImages(query, count = 3) {
  if (!query) return [];
  
  if (!API_KEY) {
    console.warn("Pixabay API key missing");
    return [];
  }

  // Pixabay requires minimum 3 images
  const minCount = Math.max(3, count);

  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${minCount}`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Pixabay API error: ${response.status}`);
    }

    const data = await response.json();
    const images = data.hits?.map(hit => hit.webformatURL) || [];
    
    // Return only the requested count
    return images.slice(0, count);
  } catch (error) {
    console.error("getPixabayImages error:", error);
    return [];
  }
}

/**
 * Get a single image from Pixabay
 * @param {string} query - Search query
 * @returns {Promise<string|null>} Image URL or null
 */
export async function getPixabayImage(query) {
  const images = await getPixabayImages(query, 1);
  return images[0] || null;
}

/**
 * Get random destination images
 * @returns {Promise<Array>} Array of image URLs
 */
export async function getDestinationImages() {
  const destinations = ["Paris", "Tokyo", "New York", "London", "Dubai"];
  const query = destinations[Math.floor(Math.random() * destinations.length)];
  return getPixabayImages(query, 6);
}
