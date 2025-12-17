import React from "react";

export default function LanguageInfo({ country }) {
  const languages = country?.languages
    ? Object.values(country.languages)
    : [];

  return (
    <div className="bg-white rounded-lg shadow border p-6">
      <h3 className="text-xl font-bold mb-2">Languages</h3>

      {languages.length > 0 ? (
        <ul className="list-disc list-inside text-gray-700">
          {languages.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No language data available.</p>
      )}
    </div>
  );
}
