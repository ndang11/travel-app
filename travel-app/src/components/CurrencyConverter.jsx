import React, { useEffect, useState } from "react";
import { getExchangeRate, detectUserCurrency } from "../services/currencyService";

const SUPPORTED = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
];

const CURRENCY_SYMBOLS = {
  USD: "$", EUR: "€", GBP: "£", CAD: "C$", AUD: "A$", 
  JPY: "¥", CNY: "¥", INR: "₹", SGD: "S$", NGN: "₦", 
  ZAR: "R", CHF: "CHF", THB: "฿", MXN: "MX$", BRL: "R$"
};

export default function CurrencyConverter({ currency }) {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(100);

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
        setError("Unable to load rates");
      } finally {
        setLoading(false);
      }
    }

    if (currency && baseCurrency) fetchRate();
  }, [currency, baseCurrency]);

  const convertedAmount = (amount * (rate || 0)).toFixed(2);
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  const baseSymbol = CURRENCY_SYMBOLS[baseCurrency] || baseCurrency;

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 animate-pulse">
        <div className="h-4 bg-gray-300 w-1/2 rounded mb-4" />
        <div className="h-12 bg-gray-300 rounded" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 text-center">
        <span className="text-4xl block mb-2">💱</span>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-500">From</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl">
              {SUPPORTED.find(c => c.code === baseCurrency)?.flag || "🏳️"}
            </span>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="font-bold text-gray-900 bg-transparent border-none outline-none cursor-pointer"
            >
              {SUPPORTED.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>

        <div className="text-right">
          <span className="text-sm text-gray-500">To</span>
          <div className="flex items-center gap-2 mt-1 justify-end">
            <span className="text-2xl">🏳️</span>
            <span className="font-bold text-gray-900">{currency}</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl p-5">
        <div className="text-center mb-4">
          <p className="text-gray-500 text-sm">Exchange Rate</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            1 {baseCurrency} = <span className="text-rose-500">{rate?.toFixed(2)} {currency}</span>
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm">
            <span className="text-gray-500">{baseSymbol}{amount}</span>
            <span className="text-gray-300">→</span>
            <span className="font-bold text-gray-900">{symbol}{convertedAmount}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[50, 100, 500, 1000].map((val) => (
          <button
            key={val}
            onClick={() => setAmount(val)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              amount === val
                ? "bg-rose-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {baseSymbol}{val}
          </button>
        ))}
      </div>
    </div>
  );
}