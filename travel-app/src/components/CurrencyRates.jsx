import React, { useEffect, useState } from 'react'
import { getRates } from '../services/currencyService'

export default function CurrencyRates({ base = 'USD' }) {
  const [rates, setRates] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)

    getRates(base)
      .then(data => {
        if (mounted) setRates(data)
      })
      .catch(err => {
        if (mounted) setError('Failed to load exchange rates')
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [base])

  if (loading) return <div className="p-4 border rounded">Loading rates...</div>
  if (error) return <div className="p-4 border rounded text-red-500">{error}</div>
  if (!rates || !rates.rates)
    return <div className="p-4 border rounded">No rates available</div>

  return (
    <div className="border p-4 rounded">
      <h4 className="font-semibold">Exchange rates (base {rates.base})</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
        {Object.entries(rates.rates)
          .slice(0, 8)
          .map(([code, value]) => (
            <div key={code} className="text-sm">
              <div className="font-medium">{code}</div>
              <div>{value.toFixed(3)}</div>
            </div>
          ))}
      </div>
    </div>
  )
}
