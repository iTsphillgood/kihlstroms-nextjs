"use client";

import { useState } from "react";

/**
 * Bild från märkets officiella svenska CDN (originallänk) med lokal fallback
 * om CDN:et inte svarar.
 */
export default function SmartImg({
  src,
  fallback,
  alt,
  className,
  eager = false
}: {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [current, setCurrent] = useState(src);
  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      onError={() => {
        if (fallback && current !== fallback) setCurrent(fallback);
      }}
    />
  );
}
