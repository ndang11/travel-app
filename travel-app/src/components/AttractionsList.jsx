import React, { useEffect, useState } from 'react'
import { getTopAttractions } from '../services/placesService'

export default function AttractionsList({ place }){
  const [items, setItems] = useState([])
  useEffect(() => {
    if (!place) return
    getTopAttractions(place).then(d => setItems(d?.results || [])).catch(()=>{})
  }, [place])

  return (
    <div>
      <h4 className="text-lg font-semibold mb-3">Top Attractions</h4>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(at => (
          <li key={at.id} className="border p-3 rounded">
            <div className="font-semibold">{at.name}</div>
            <div className="text-sm text-gray-600">{at.vicinity || at.description}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}