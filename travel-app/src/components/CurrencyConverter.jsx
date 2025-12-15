import React, { useEffect, useState } from "react";
import { getExchangeRate } from "../services/currencyService";

export default function CurrencyConverter({
  currency,
  baseCurrency = "USD",
}) {
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        setLoading(true);
        setError(null);

        const data = await getExchangeRate(baseCurrency, currency);

        if (!data) throw new Error("Rate unavailable");

        setRate(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (currency) fetchRate();
  }, [currency, baseCurrency]);

  if (loading) {
    return (
      <div className="h-24 bg-gray-100 rounded-lg animate-pulse" />
    );
  }

  if (error) {
    return (
      <div className="border rounded-lg p-4 text-red-600">
        Currency unavailable
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h3 className="font-semibold text-lg mb-2">Currency</h3>
      <p className="text-gray-700">
        1 {baseCurrency} ={" "}
        <span className="font-bold">
          {rate.toFixed(2)} {currency}
        </span>
      </p>
    </div>
  );
}
