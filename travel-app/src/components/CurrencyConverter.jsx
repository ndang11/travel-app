import React, { useEffect, useState } from "react";
import { getExchangeRate } from "../services/currencyService";

export default function CurrencyConverter({ currency }) {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    async function fetchRate() {
      const data = await getExchangeRate("USD", currency);
      setRate(data);
    }
    fetchRate();
  }, [currency]);

  if (!rate) return <p>Currency unavailable</p>;

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold text-lg">Currency</h3>
      <p>1 USD = {rate.toFixed(2)} {currency}</p>
    </div>
  );
}
