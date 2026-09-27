"use client";

import { useState } from "react";

export default function Accordion({ items }: { items: { title: string; content: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-black/15">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title} className="border-b border-black/15">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="text-sm tracking-widest">{item.title.toUpperCase()}</span>
              <span className={`text-lg transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            {isOpen && <p className="pb-5 text-sm text-black/60">{item.content}</p>}
          </div>
        );
      })}
    </div>
  );
}
