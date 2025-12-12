import api from './api'

export const getTopAttractions = async (place) => {
  
  const key = import.meta.env.VITE_PLACES_API_KEY
  const url = `https://api.example.com/places/attractions?place=${encodeURIComponent(place)}&key=${key}`
  const res = await api.get(url)
  return res.data
}