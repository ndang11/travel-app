import api from './api'

export const getRates = async (base = 'USD') => {
  const key = import.meta.env.VITE_EXCHANGE_API_KEY
  const url = `https://api.exchangerate.host/latest?base=${base}`
  const res = await api.get(url)
  return res.data
}