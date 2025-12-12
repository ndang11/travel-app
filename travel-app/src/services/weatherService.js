import api from './api'

export const getCurrentWeather = async (q) => {
  const key = import.meta.env.VITE_WEATHER_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&units=metric&appid=${key}`
  const res = await api.get(url)
  return res.data
}

export const getForecast = async (lat, lon) => {
  const key = import.meta.env.VITE_WEATHER_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${key}`
  const res = await api.get(url)
  return res.data
}