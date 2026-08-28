"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileCTA() {
  const pathname = usePathname();
  if (pathname === "/kontakt") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-lifted backdrop-blur md:hidden">
      <div className="grid grid-cols-3 divide-x divide-ink-100 text-center text-[13px] font-bold">
        <a href="tel:+468195626" className="flex flex-col items-center gap-1 py-2.5 text-ink-800">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 5c0-.6.4-1 1-1h2.6c.5 0 .9.3 1 .8l.8 3c.1.4 0 .8-.4 1l-1.6 1c.9 2.1 2.6 3.8 4.7 4.7l1-1.6c.2-.3.6-.5 1-.4l3 .8c.5.1.8.5.8 1V19c0 .6-.4 1-1 1h-1C9.8 20 4 14.2 4 7V5Z" fill="currentColor" />
          </svg>
          Ring
        </a>
        <Link href="/lager" className="flex flex-col items-center gap-1 py-2.5 text-ink-800">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 13h2l1.6-4.4A2 2 0 0 1 8.5 7h7a2 2 0 0 1 1.9 1.6L19 13h2M5.5 13h13a1.5 1.5 0 0 1 1.5 1.5V17h-2.8M6.3 17H3.5v-2.5A1.5 1.5 0 0 1 5 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7.5" cy="17" r="1.8" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="16.5" cy="17" r="1.8" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          Lager
        </Link>
        <Link href="/kontakt#meddelande" className="flex flex-col items-center gap-1 bg-brand-blue py-2.5 text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9Z" stroke="currentColor" strokeWidth="1.6" />
            <path d="m4.5 8 6.6 4.6a1.5 1.5 0 0 0 1.8 0L19.5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Offert
        </Link>
      </div>
    </div>
  );
}
