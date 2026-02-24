import React, { useEffect, useState } from "react";
import { getExchangeRate, detectUserCurrency } from "../services/currencyService";

// Currency data with flags and names
const CURRENCIES = [
  { code: "USD", flag: "🇺🇸", name: "US Dollar" },
  { code: "EUR", flag: "🇪🇺", name: "Euro" },
  { code: "GBP", flag: "🇬🇧", name: "British Pound" },
  { code: "CAD", flag: "🇨🇦", name: "Canadian Dollar" },
  { code: "NGN", flag: "🇳🇬", name: "Nigerian Naira" },
  { code: "XAF", flag: "🇨🇲", name: "CFA Franc" },
  { code: "ZAR", flag: "🇿🇦", name: "South African Rand" },
  { code: "JPY", flag: "🇯🇵", name: "Japanese Yen" },
  { code: "CNY", flag: "🇨🇳", name: "Chinese Yuan" },
  { code: "AUD", flag: "🇦🇺", name: "Australian Dollar" },
  { code: "CHF", flag: "🇨🇭", name: "Swiss Franc" },
  { code: "INR", flag: "🇮🇳", name: "Indian Rupee" },
];

// Get currency flag/name from code
function getCurrencyInfo(code) {
  return CURRENCIES.find((c) => c.code === code) || { code, flag: "💱", name: code };
}

export default function CurrencyConverter({ currency }) {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [swapCurrencies, setSwapCurrencies] = useState(false);

  useEffect(() => {
    setBaseCurrency(detectUserCurrency());
  }, []);

  useEffect(() => {
    async function fetchRate() {
      try {
        setLoading(true);
        setError(null);

        const from = swapCurrencies ? currency : baseCurrency;
        const to = swapCurrencies ? baseCurrency : currency;

        const result = await getExchangeRate(from, to);

        if (!result) throw new Error("Rate unavailable");

        setRate(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (currency && baseCurrency) fetchRate();
  }, [currency, baseCurrency, swapCurrencies]);

  const baseInfo = getCurrencyInfo(baseCurrency);
  const targetInfo = getCurrencyInfo(currency);

  // Conversion amounts
  const amounts = [1, 10, 50, 100, 500];

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
          <div className="h-8 w-20 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="h-32 bg-slate-100 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl p-4 bg-red-50 border border-red-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-lg">⚠️</span>
          </div>
          <div>
            <p className="font-medium text-red-700">Currency unavailable</p>
            <p className="text-xs text-red-500">Unable to fetch exchange rate</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Currency Selector */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <label className="text-xs font-medium text-slate-500 mb-1 block">From</label>
          <select
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} - {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <button
          onClick={() => setSwapCurrencies(!swapCurrencies)}
          className="mt-5 p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
          title="Swap currencies"
        >
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </button>

        <div className="flex-1">
          <label className="text-xs font-medium text-slate-500 mb-1 block">To</label>
          <div className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
            <span className="mr-1">{targetInfo.flag}</span>
            <span>{targetInfo.code}</span>
          </div>
        </div>
      </div>

      {/* Main Rate Display */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
        <div className="text-center">
          <p className="text-sm text-slate-600 mb-1">Current Exchange Rate</p>
          <p className="text-2xl font-bold text-slate-900">
            1 {baseInfo.code} =
          </p>
          <p className="text-3xl font-black text-indigo-600">
            {rate.toFixed(2)} {targetInfo.code}
          </p>
        </div>
      </div>

      {/* Quick Conversions */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-500">Quick conversions</p>
        <div className="grid grid-cols-2 gap-2">
          {amounts.map((amount) => (
            <div
              key={amount}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 border border-slate-100"
            >
              <span className="text-sm text-slate-600">{amount} {baseInfo.code}</span>
              <span className="text-sm font-semibold text-slate-900">
                {(amount * rate).toFixed(2)} {targetInfo.code}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Currency Info */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-lg">{baseInfo.flag}</span>
          <span className="text-sm text-slate-600">{baseInfo.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">{targetInfo.flag}</span>
          <span className="text-sm text-slate-600">{targetInfo.name}</span>
        </div>
      </div>
    </div>
  );
}
