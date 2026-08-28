"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export interface HeroSlide {
  id: string;
  brand: string;
  brandColor: string;
  eyebrow: string;
  title: string;
  text: string;
  price?: string;
  priceNote?: string;
  image: string;
  imageFallback?: string;
  imageAlt: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  facts: string[];
}

const AUTOPLAY_MS = 6500;

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number) => setIndex(((next % slides.length) + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (paused || typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const t = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement && regionRef.current?.contains(document.activeElement)) {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const slide = slides[index];

  return (
    <section
      ref={regionRef}
      aria-roledescription="karusell"
      aria-label="Aktuella erbjudanden och märken"
      className="relative overflow-hidden bg-ink-950 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
        touchStartX.current = null;
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55] transition-[background] duration-700"
        style={{ background: `radial-gradient(120% 90% at 78% 8%, ${slide.brandColor}55 0%, transparent 55%), radial-gradient(90% 80% at 8% 95%, #0a1820cc 0%, transparent 60%)` }}
        aria-hidden="true"
      />

      <div className="container-site relative grid gap-8 px-4 pb-14 pt-12 sm:px-6 md:pb-20 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14 lg:px-8">
        <div key={slide.id} className="order-2 animate-slide-in lg:order-1">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]"
              style={{ backgroundColor: slide.brandColor }}
            >
              {slide.brand}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-300">{slide.eyebrow}</span>
          </div>

          <h1 className="mt-5 max-w-xl text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-200 sm:text-base">{slide.text}</p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {slide.facts.map((fact) => {
              const [value, ...rest] = fact.split("|");
              return (
                <div key={fact}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-400">{rest.join(" ").trim()}</dt>
                  <dd className="text-lg font-bold text-white">{value.trim()}</dd>
                </div>
              );
            })}
          </dl>

          {slide.price && (
            <div className="mt-7">
              <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {slide.price}
                {slide.priceNote && <span className="ml-2 align-middle text-xs font-medium text-ink-300">{slide.priceNote}</span>}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={slide.primary.href} className="btn-primary">
              {slide.primary.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href={slide.secondary.href} className="btn-light">
              {slide.secondary.label}
            </Link>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/15">
            {slides.map((s, i) => (
              <img
                key={s.id + s.image}
                src={s.image}
                alt={s.imageAlt}
                className={`aspect-[16/10] w-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "absolute inset-0 opacity-0"}`}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                aria-hidden={i !== index}
                onError={(e) => {
                  const img = e.currentTarget;
                  if (s.imageFallback && !img.src.endsWith(s.imageFallback)) {
                    img.src = s.imageFallback;
                  }
                }}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" aria-hidden="true" />
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex gap-2" role="tablist" aria-label="Välj bild">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`${s.brand}: ${s.title}`}
                  onClick={() => go(i)}
                  className={`group relative h-1.5 overflow-hidden rounded-full transition-all ${
                    i === index ? "w-10 bg-white/30" : "w-5 bg-white/25 hover:bg-white/50"
                  }`}
                >
                  {i === index && (
                    <span
                      key={`p-${index}-${paused}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-white"
                      style={{
                        animation: paused ? "none" : `heroProgress ${AUTOPLAY_MS}ms linear forwards`,
                        width: paused ? "100%" : undefined
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-inset ring-white/30 transition hover:bg-white/10"
                aria-label="Föregående bild"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M13 8H3m0 0 4-4m-4 4 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-inset ring-white/30 transition hover:bg-white/10"
                aria-label="Nästa bild"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
