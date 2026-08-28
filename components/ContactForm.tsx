"use client";

import { useState } from "react";
import type { Staff } from "../lib/data";

interface Props {
  staff: Staff[];
  defaultSubject?: string;
}

const subjects = [
  "Köpa transportbil",
  "Begär offert",
  "Boka provkörning",
  "Sälja transportbil",
  "Min beställda bil",
  "Verkstad/service",
  "Reservdelar",
  "Tillbehör",
  "Ekonomi (faktura & betalningsfrågor)"
];

export default function ContactForm({ staff, defaultSubject }: Props) {
  const [subject, setSubject] = useState(defaultSubject ?? subjects[0]);
  const [location, setLocation] = useState("Syd (Smista)");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [prefer, setPrefer] = useState("Telefon");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Skriv ditt namn så vet vi vem vi pratar med.";
    if (!phone.trim() && !email.trim()) e.phone = "Lämna telefonnummer eller mejl så kan vi nå dig.";
    if (email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) e.email = "Kolla mejladressen – den ser inte helt rätt ut.";
    if (!message.trim()) e.message = "Skriv några rader om ärendet så kan vi förbereda svaret.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const sellerForRouting = subject.includes("Reservdelar")
    ? staff.find((s) => s.role === "Reservdelar" && s.location.includes(location.includes("Syd") ? "Smista" : "Spånga"))
    : subject.includes("Verkstad")
      ? staff.find((s) => s.role.includes("Servicerådgivare") && s.location.includes(location.includes("Syd") ? "Smista" : "Spånga"))
      : staff.find((s) => s.role.toLowerCase().includes("sälj") && s.location.includes(location.includes("Syd") ? "Smista" : "Spånga"));

  const send = () => {
    if (!validate()) return;
    const to = location.includes("Syd") ? "info.smista@kihlstroms.se" : "info.norr@kihlstroms.se";
    const params = new URLSearchParams({
      subject: `[${subject}] [${location}] ${name}${company ? ` – ${company}` : ""}`,
      body: [
        `Ärende: ${subject}`,
        `Anläggning: ${location}`,
        `Namn: ${name}`,
        company ? `Företag: ${company}` : "",
        `Telefon: ${phone}`,
        `Mejl: ${email}`,
        `Vill bli kontaktad via: ${prefer}`,
        "",
        message,
        "",
        sellerForRouting ? `(Styras gärna till ${sellerForRouting.name}, ${sellerForRouting.role})` : ""
      ].filter(Boolean).join("\n")
    });
    window.location.href = `mailto:${to}?${params.toString()}`;
    setSent(true);
  };

  return (
    <form
      className="card p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-subject" className="field-label">Vad gäller ärendet? *</label>
          <select id="cf-subject" className="field" value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjects.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="cf-location" className="field-label">Närmaste anläggning *</label>
          <select id="cf-location" className="field" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option>Syd (Smista)</option>
            <option>Norr (Spånga)</option>
          </select>
        </div>
        <div>
          <label htmlFor="cf-name" className="field-label">Mitt namn *</label>
          <input id="cf-name" className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="För- och efternamn" />
          {errors.name && <p className="mt-1 text-xs font-medium text-brand-red">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-company" className="field-label">Företag</label>
          <input id="cf-company" className="field" value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" placeholder="Företagets namn" />
        </div>
        <div>
          <label htmlFor="cf-phone" className="field-label">Telefon</label>
          <input id="cf-phone" className="field" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" placeholder="07X-XXX XX XX" />
          {errors.phone && <p className="mt-1 text-xs font-medium text-brand-red">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="field-label">Mejl</label>
          <input id="cf-email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} inputMode="email" autoComplete="email" placeholder="namn@foretag.se" />
          {errors.email && <p className="mt-1 text-xs font-medium text-brand-red">{errors.email}</p>}
        </div>
        <div className="sm:col-span-2">
          <span className="field-label">Hur vill du bli kontaktad?</span>
          <div className="flex gap-4">
            {["Telefon", "Mejl"].map((option) => (
              <label key={option} className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink-700">
                <input type="radio" name="prefer" checked={prefer === option} onChange={() => setPrefer(option)} className="h-4 w-4 accent-[#1B5FAA]" />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="field-label">Meddelande *</label>
          <textarea
            id="cf-message"
            className="field min-h-[130px] resize-y"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              subject.includes("Verkstad")
                ? "Berätta om fordonet: reg.nr, vad som behöver göras och när det passar."
                : subject.includes("Reservdelar")
                  ? "Reg.nr eller VIN och vilken del du söker."
                  : "Vilken bil eller vilket behov gäller det? Beskriv gärna körning, last och önskad leveranstid."
            }
          />
          {errors.message && <p className="mt-1 text-xs font-medium text-brand-red">{errors.message}</p>}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary">
          Skicka – svar samma arbetsdag
        </button>
        <p className="text-xs leading-relaxed text-ink-500">
          Ärendet läggs färdigt skrivet i din e-postklient och går till {location.includes("Syd") ? "Smista" : "Spånga"}-anläggningen.
          {sellerForRouting && ` Ärenden som detta hanteras normalt av ${sellerForRouting.name} (${sellerForRouting.role}).`}
        </p>
      </div>

      {sent && (
        <p className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800" role="status">
          Klart – mejlet är förberett i din e-postklient. Tryck på Skicka där, så återkommer vi oftast samma arbetsdag.
          Ring gärna växeln 08-19 56 26 om det brådskar.
        </p>
      )}
    </form>
  );
}
