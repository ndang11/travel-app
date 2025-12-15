import React, { useEffect, useState } from "react";
import { getCountryByCode } from "../services/countryService";

export default function LanguageInfo({ countryCode }) {
  const [languages, setLanguages] = useState([]);
  const [flag, setFlag] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLanguages() {
      if (!countryCode) return;
      try {
        setLoading(true);
        const countryData = await getCountryByCode(countryCode);

        setFlag(countryData.flags?.png || countryData.flags?.svg);

        const langs = countryData?.languages
          ? Object.values(countryData.languages)
          : ["English"];
        setLanguages(langs);
      } catch (err) {
        console.error("Failed to fetch languages:", err);
        setLanguages(["English"]);
      } finally {
        setLoading(false);
      }
    }

    fetchLanguages();
  }, [countryCode]);

  if (loading) {
    return (
      <div className="border p-4 rounded bg-gray-100 animate-pulse">
        <div className="h-6 w-6 bg-gray-300 rounded-full mb-2"></div>
        <div className="h-4 bg-gray-300 w-24 mb-2 rounded"></div>
        <div className="h-4 bg-gray-300 w-32 rounded"></div>
      </div>
    );
  }

  return (
    <div className="border p-4 rounded bg-white shadow">
      <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
        {flag && <img src={flag} alt="flag" className="w-6 h-4 object-cover" />}
        Languages
      </h4>
      <ul className="mt-2 list-disc list-inside space-y-1">
        {languages.map((lang) => (
          <li key={lang} className="flex items-center gap-2">
            <img src={flag} alt="flag" className="w-4 h-3 object-cover" />
            <span>{lang}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
