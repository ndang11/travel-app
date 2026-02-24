import React, { useState } from "react";

// Common phrases in different languages
const PHRASES = {
  en: ["Hello", "Thank you", "Please", "Goodbye", "Yes", "No"],
  es: ["Hola", "Gracias", "Por favor", "Adiós", "Sí", "No"],
  fr: ["Bonjour", "Merci", "S'il vous plaît", "Au revoir", "Oui", "Non"],
  de: ["Hallo", "Danke", "Bitte", "Auf Wiedersehen", "Ja", "Nein"],
  it: ["Ciao", "Grazie", "Per favore", "Arrivederci", "Sì", "No"],
  ja: ["こんにちは", "ありがとう", "お願いします", "さようなら", "はい", "いいえ"],
  zh: ["你好", "谢谢", "请", "再见", "是", "不是"],
  ar: ["مرحبا", "شكرا", "من فضلك", "مع السلامة", "نعم", "لا"],
  pt: ["Olá", "Obrigado", "Por favor", "Adeus", "Sim", "Não"],
  ru: ["Привет", "Спасибо", "Пожалуйста", "До свидания", "Да", "Нет"],
};

// Get language code from full name
function getLangCode(langName, allLanguages) {
  const entry = Object.entries(allLanguages || {}).find(
    ([, name]) => name.toLowerCase() === langName.toLowerCase()
  );
  return entry ? entry[0] : langName.toLowerCase().slice(0, 2);
}

export default function LanguageInfo({ country }) {
  const languages = country?.languages ? Object.values(country.languages) : [];
  const [selectedLang, setSelectedLang] = useState(languages[0] || null);
  const [activeTab, setActiveTab] = useState("basics");

  // Get phrases for selected language
  const langCode = selectedLang ? getLangCode(selectedLang, country?.languages) : "en";
  const phrases = PHRASES[langCode] || PHRASES.en;

  return (
    <div className="space-y-4">
      {/* Language Selector */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
          <span className="text-xl">🗣️</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900">Languages Spoken</h3>
          <p className="text-xs text-slate-500">Primary languages in {country?.name?.common}</p>
        </div>
      </div>

      {/* Language Pills */}
      {languages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedLang === lang
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      )}

      {languages.length === 0 ? (
        <div className="text-center py-6 text-slate-500">
          <span className="text-3xl">🌍</span>
          <p className="mt-2">No language data available</p>
        </div>
      ) : (
        <>
          {/* Tab Navigation */}
          <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setActiveTab("basics")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                activeTab === "basics"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              📝 Basics
            </button>
            <button
              onClick={() => setActiveTab("phrases")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                activeTab === "phrases"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              💬 Phrases
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "basics" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4">
                  <p className="text-xs text-slate-500 uppercase mb-1">Official</p>
                  <p className="font-semibold text-slate-900">{languages[0]}</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
                  <p className="text-xs text-indigo-500 uppercase mb-1">Speakers</p>
                  <p className="font-semibold text-indigo-900">
                    {languages.length > 1 ? `${languages.length} languages` : "Primary"}
                  </p>
                </div>
              </div>

              {/* Language List */}
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-medium text-slate-500 uppercase mb-2">All Languages</p>
                <ul className="space-y-2">
                  {languages.map((lang, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400" />
                      <span className="text-sm text-slate-700">{lang}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "phrases" && (
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
              <p className="text-sm font-medium text-indigo-900 mb-3">
                Essential phrases in {selectedLang}
              </p>
              <div className="space-y-2">
                {phrases.map((phrase, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-white/70 rounded-lg px-3 py-2"
                  >
                    <span className="text-sm text-slate-600">{phrase}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(phrase)}
                      className="text-xs text-indigo-600 hover:text-indigo-700"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Country Info */}
      {country?.name?.common && (
        <div className="pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-500 text-center">
            Language information for <span className="font-medium text-slate-700">{country.name.common}</span>
          </p>
        </div>
      )}
    </div>
  );
}
