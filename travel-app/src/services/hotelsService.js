
import api from './api'

export const searchHotels = async (city, checkin, checkout) => {
  const key = import.meta.env.VITE_HOTELS_API_KEY
  const url = `https://api.example.com/hotels/search?city=${encodeURIComponent(city)}&checkin=${checkin}&checkout=${checkout}&key=${key}`
  const res = await api.get(url)
  return res.data
}