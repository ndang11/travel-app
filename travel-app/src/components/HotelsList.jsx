import React, { useEffect, useState } from 'react'
import { searchHotels } from '../services/hotelsService'

export default function HotelsList({ city }){
  const [hotels, setHotels] = useState([])
  useEffect(() => {
    if (!city) return
    searchHotels(city).then(d => setHotels(d?.results || [])).catch(()=>{})
  }, [city])

  return (
    <div>
      <h4 className="text-lg font-semibold mb-3">Hotels</h4>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels.map(h => (
          <li key={h.id} className="border p-3 rounded">
            <div className="font-semibold">{h.name}</div>
            <div className="text-sm text-gray-600">{h.address}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}