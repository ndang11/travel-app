import React, { useState } from "react";

const COMMON_PHRASES = {
  en: [
    { english: "Hello", local: "Hello" },
    { english: "Thank you", local: "Thank you" },
    { english: "Please", local: "Please" },
    { english: "Excuse me", local: "Excuse me" },
    { english: "Yes/No", local: "Yes/No" },
  ],
  es: [
    { english: "Hello", local: "Hola" },
    { english: "Thank you", local: "Gracias" },
    { english: "Please", local: "Por favor" },
    { english: "Excuse me", local: "Disculpe" },
    { english: "Yes/No", local: "Sí/No" },
  ],
  fr: [
    { english: "Hello", local: "Bonjour" },
    { english: "Thank you", local: "Merci" },
    { english: "Please", local: "S'il vous plaît" },
    { english: "Excuse me", local: "Excusez-moi" },
    { english: "Yes/No", local: "Oui/Non" },
  ],
  de: [
    { english: "Hello", local: "Hallo" },
    { english: "Thank you", local: "Danke" },
    { english: "Please", local: "Bitte" },
    { english: "Excuse me", local: "Entschuldigung" },
    { english: "Yes/No", local: "Ja/Nein" },
  ],
  it: [
    { english: "Hello", local: "Ciao" },
    { english: "Thank you", local: "Grazie" },
    { english: "Please", local: "Per favore" },
    { english: "Excuse me", local: "Scusi" },
    { english: "Yes/No", local: "Sì/No" },
  ],
  ja: [
    { english: "Hello", local: "こんにちは" },
    { english: "Thank you", local: "ありがとう" },
    { english: "Please", local: "お願いします" },
    { english: "Excuse me", local: "すみません" },
    { english: "Yes/No", local: "はい/いいえ" },
  ],
  zh: [
    { english: "Hello", local: "你好" },
    { english: "Thank you", local: "谢谢" },
    { english: "Please", local: "请" },
    { english: "Excuse me", local: "打扰一下" },
    { english: "Yes/No", local: "是/否" },
  ],
  ar: [
    { english: "Hello", local: "مرحبا" },
    { english: "Thank you", local: "شكرا" },
    { english: "Please", local: "من فضلك" },
    { english: "Excuse me", local: "عفوا" },
    { english: "Yes/No", local: "نعم/لا" },
  ],
  pt: [
    { english: "Hello", local: "Olá" },
    { english: "Thank you", local: "Obrigado" },
    { english: "Please", local: "Por favor" },
    { english: "Excuse me", local: "Com licença" },
    { english: "Yes/No", local: "Sim/Não" },
  ],
  ru: [
    { english: "Hello", local: "Привет" },
    { english: "Thank you", local: "Спасибо" },
    { english: "Please", local: "Пожалуйста" },
    { english: "Excuse me", local: "Извините" },
    { english: "Yes/No", local: "Да/Нет" },
  ],
};

export default function LanguageInfo({ country }) {
  const languages = country?.languages
    ? Object.values(country.languages)
    : [];
  
  const mainLang = languages[0]?.toLowerCase() || "en";
  const phrases = COMMON_PHRASES[mainLang] || COMMON_PHRASES.en;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>🗣️</span> Languages Spoken
        </h3>
        <div className="flex flex-wrap gap-2">
          {languages.length > 0 ? (
            languages.map((lang) => (
              <span
                key={lang}
                className="px-4 py-2 bg-gradient-to-r from-rose-100 to-amber-100 text-gray-700 font-medium rounded-full"
              >
                {lang}
              </span>
            ))
          ) : (
            <span className="text-gray-500">No language data available</span>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>📝</span> Common Phrases
        </h3>
        <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
          {phrases.map((phrase, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
            >
              <span className="text-gray-600">{phrase.english}</span>
              <span className="font-semibold text-gray-900">{phrase.local}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-xl p-4">
          <span className="text-2xl block mb-2">🗺️</span>
          <p className="text-sm text-gray-600">Driving Side</p>
          <p className="font-bold text-gray-900">
            {country?.car?.side === "right" ? "Right-hand drive" : "Left-hand drive"}
          </p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4">
          <span className="text-2xl block mb-2">🔌</span>
          <p className="text-sm text-gray-600">Power Plugs</p>
          <p className="font-bold text-gray-900">
            {country?.idd?.root 
              ? `+${country.idd.root}${country.idd.suffixes?.[0] || ""}` 
              : "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
}