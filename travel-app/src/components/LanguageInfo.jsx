import React from 'react'

export default function LanguageInfo({ country }){
  // In real app fetch from REST Countries API
  const langs = country?.languages || ['English']
  return (
    <div className="border p-4 rounded">
      <h4 className="font-semibold">Languages</h4>
      <ul className="mt-2">
        {langs.map(l => <li key={l}>{l}</li>)}
      </ul>
    </div>
  )
}