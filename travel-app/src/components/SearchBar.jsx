import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useDebounce from '../hooks/useDebounce'

export default function SearchBar(){
  const [term, setTerm] = useState('')
  const debounced = useDebounce(term, 450)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (debounced && debounced.length > 2) {
      navigate(`/search?q=${encodeURIComponent(debounced)}`)
    }
  }, [debounced])

  return (
    <div className="w-96">
      <input
        value={term}
        onChange={e => setTerm(e.target.value)}
        placeholder="Search city, country..."
        className="w-full border rounded px-3 py-2"
      />
    </div>
  )
}