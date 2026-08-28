"use client";

import { useState } from "react";

export default function StockImg({
  src,
  fallback,
  alt,
  className
}: {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
}) {
  const [current, setCurrent] = useState(src);
  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setCurrent(fallback)}
    />
  );
}
