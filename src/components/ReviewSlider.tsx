"use client";

import { useState } from "react";
import { reviews } from "@/lib/data";

export default function ReviewSlider() {
  const [i, setI] = useState(0);
  const review = reviews[i];

  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="mb-4 text-champagne tracking-widest">★★★★★</p>
      <p className="font-display text-2xl md:text-3xl leading-snug text-bone">“{review.text}”</p>
      <p className="mt-6 text-sm uppercase tracking-widest text-bone/50">— {review.name}</p>

      <div className="mt-8 flex justify-center gap-2">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Review ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-1.5 w-6 rounded-full transition-colors ${
              idx === i ? "bg-champagne" : "bg-bone/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
