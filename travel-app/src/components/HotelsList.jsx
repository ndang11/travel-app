import React from "react";

export default function HotelsList({ city }) {
  return (
    <div className="bg-white rounded-lg shadow border p-6">
      <h3 className="text-xl font-bold mb-2">Hotels in {city}</h3>
      <p className="text-gray-600 text-sm">
        Hotel listings will appear here.
      </p>

      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="border rounded p-3 flex flex-col gap-1"
          >
            <div className="h-32 bg-gray-200 rounded"></div>
            <h4 className="font-semibold mt-2">Hotel Name</h4>
            <p className="text-xs text-gray-500">★★★★☆</p>
            <span className="text-sm font-bold text-green-600">
              From $120 / night
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
