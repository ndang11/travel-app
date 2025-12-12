import React, { useEffect, useState } from 'react'
import { getCurrentWeather } from '../services/weatherService'

export default function WeatherWidget({ place }){
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    let mounted = true
    if (!place) return
    getCurrentWeather(place).then(data => mounted && setWeather(data)).catch(()=>{})
    return () => { mounted = false }
  }, [place])

  if (!weather) return <div className="p-4 border rounded">Loading weather...</div>

  return (
    <div className="p-4 border rounded">
      <div className="text-xl font-semibold">{weather.name}</div>
      <div className="text-3xl">{Math.round(weather.main.temp)}°C</div>
      <div className="text-sm">{weather.weather[0].description}</div>
    </div>
  )
}