"use client";

import { useState } from "react";
import type { Staff } from "../lib/data";

interface Props {
  staff: Staff[];
  defaultSubject?: string;
}

const subjects = [
  "Köpa transportbil",
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
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Fyll i ditt namn.";
    if (!phone.trim() && !email.trim()) e.phone = "Fyll i telefonnummer eller mejladress.";
    if (email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) e.email = "Mejladressen ser inte rätt ut.";
    if (!message.trim()) e.message = "Skriv några rader om ditt ärende.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const sellerForRouting = subject.includes("Reservdelar")
    ? staff.find((s) => s.role === "Reservdelar" && s.location.includes(location.includes("Syd") ? "Smista" : "Spånga"))
    : subject.includes("Verkstad")
      ? staff.find((s) => s.role.includes("Servicerådgivare") && s.location.includes(location.includes("Syd") ? "Smista" : "Spånga"))
      : staff.find((s) => s.role.includes("sälj") && s.location.includes(location.includes("Syd") ? "Smista" : "Spånga"));

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
        "",
        message,
        "",
        sellerForRouting ? `(Styras gärna till ${sellerForRouting.name}, ${sellerForRouting.role})` : ""
      ].filter(Boolean).join("\n")
    });
    window.location.href = `mailto:${to}?${params.toString()}`;
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
          <label htmlFor="cf-subject" className="field-label">Ärende *</label>
          <select id="cf-subject" className="field" value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjects.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="cf-location" className="field-label">Anläggning *</label>
          <select id="cf-location" className="field" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option>Syd (Smista)</option>
            <option>Norr (Spånga)</option>
          </select>
        </div>
        <div>
          <label htmlFor="cf-name" className="field-label">Mitt namn *</label>
          <input id="cf-name" className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          {errors.name && <p className="mt-1 text-xs font-medium text-brand-red">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-company" className="field-label">Företag</label>
          <input id="cf-company" className="field" value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="cf-phone" className="field-label">Mitt telefonnummer</label>
          <input id="cf-phone" className="field" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" />
          {errors.phone && <p className="mt-1 text-xs font-medium text-brand-red">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="field-label">Min mejladress</label>
          <input id="cf-email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} inputMode="email" autoComplete="email" />
          {errors.email && <p className="mt-1 text-xs font-medium text-brand-red">{errors.email}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="field-label">Mitt meddelande *</label>
          <textarea
            id="cf-message"
            className="field min-h-[130px] resize-y"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Beskriv ärendet: fordon, behov av service eller vad ni vill ha pris på."
          />
          {errors.message && <p className="mt-1 text-xs font-medium text-brand-red">{errors.message}</p>}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary">
          Skicka meddelande
        </button>
        <p className="text-xs leading-relaxed text-ink-500">
          Mejlet öppnas färdigt ifyllt i din e-postklient och går till rätt anläggningsadress.
          {sellerForRouting && ` Ärenden som "${subject}" routas normalt till ${sellerForRouting.name} (${sellerForRouting.role}).`}
        </p>
      </div>
    </form>
  );
}
