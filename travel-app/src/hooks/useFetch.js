import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFetch(url, options = null, dependencies = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return
    let mounted = true
    setLoading(true)
    axios.get(url, options)
      .then(res => mounted && setData(res.data))
      .catch(err => mounted && setError(err))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, dependencies)

  return { data, loading, error }
}