import { useState } from "react";

const INITIAL_REVIEWS = [
  {
    user: "Anna",
    rating: 5,
    comment: "Amazing city! Great food and friendly people.",
  },
  {
    user: "John",
    rating: 4,
    comment: "Beautiful attractions, but traffic can be heavy.",
  },
];

export default function CityReviews({ city }) {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  function submitReview(e) {
    e.preventDefault();
    setReviews([
      ...reviews,
      { user: "Guest", rating, comment },
    ]);
    setComment("");
  }

  const avgRating =
    reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">
        ⭐ Reviews for {city} ({avgRating.toFixed(1)})
      </h2>

      {reviews.map((r, i) => (
        <div key={i} className="bg-white p-4 rounded shadow">
          <div className="font-semibold">{r.user}</div>
          <div className="text-yellow-500">
            {"★".repeat(r.rating)}
          </div>
          <p className="text-gray-600">{r.comment}</p>
        </div>
      ))}

      <form onSubmit={submitReview} className="space-y-3">
        <select
          value={rating}
          onChange={(e) => setRating(+e.target.value)}
          className="border rounded px-3 py-2"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} Stars
            </option>
          ))}
        </select>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full border rounded p-3"
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Review
        </button>
      </form>
    </section>
  );
}