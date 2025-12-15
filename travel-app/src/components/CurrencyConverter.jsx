import React, { useEffect, useState } from "react";
import { getExchangeRate, detectUserCurrency, } from "../services/currencyService";

const SUPPORTED = [
  "USD",
  "EUR",
  "GBP",
  "CAD",
  "NGN",
  "XAF",
  "ZAR",
  "JPY",
  "CNY",
];

export default function CurrencyConverter({ currency }) {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setBaseCurrency(detectUserCurrency());
  }, []);

  useEffect(() => {
    async function fetchRate() {
      try {
        setLoading(true);
        setError(null);

        const result = await getExchangeRate(baseCurrency, currency);

        if (!result) throw new Error("Rate unavailable");

        setRate(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (currency && baseCurrency) fetchRate();
  }, [currency, baseCurrency]);

  if (loading) {
    return (
      <div className="h-28 bg-gray-100 rounded-lg animate-pulse" />
    );
  }

  if (error) {
    return (
      <div className="border rounded-lg p-4 text-red-600 bg-red-50">
        Currency unavailable
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Currency</h3>

        <select
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          {SUPPORTED.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <p className="text-gray-700 text-lg">
        1 {baseCurrency} ={" "}
        <span className="font-bold text-blue-600">
          {rate.toFixed(2)} {currency}
        </span>
      </p>
    </div>
  );
}
