// import React from 'react'
// import { Link } from 'react-router-dom'

// export default function DestinationCard({ destination }){
//   return (
//     <article className="border rounded overflow-hidden shadow-sm">
//       <img src={destination.image} alt={destination.name} className="w-full h-44 object-cover" />
//       <div className="p-4">
//         <h3 className="text-lg font-semibold">{destination.name}</h3>
//         <p className="text-sm text-gray-600">{destination.summary}</p>
//         <Link to={`/destination/${destination.code}`} className="mt-3 inline-block text-indigo-600">View</Link>
//       </div>
//     </article>
//   )
// }

import { Link } from "react-router-dom";

export default function DestinationCard({ destination }) {
  return (
    <Link
      to={`/destination/${destination.code}`}
      className="block rounded overflow-hidden shadow hover:scale-105 transition"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-bold text-xl">
          {destination.name}
        </h3>
        <p className="text-gray-600">
          {destination.summary}
        </p>
      </div>
    </Link>
  );
}

