"use client";

import { useState } from "react";
import type { Location } from "../lib/data";

export default function ServiceForm({ locations }: { locations: Location[] }) {
  const [reg, setReg] = useState("");
  const [locationName, setLocationName] = useState(locations[0]?.name ?? "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const location = locations.find((l) => l.name === locationName) ?? locations[0];

  const send = () => {
    const e: Record<string, string> = {};
    if (!reg.trim()) e.reg = "Ange registreringsnummer så hittar vi rätt fordon.";
    if (!name.trim()) e.name = "Skriv ditt namn.";
    if (!phone.trim()) e.phone = "Ange telefonnummer så kan servicerådgivaren nå dig.";
    if (!message.trim()) e.message = "Beskriv ärendet kort – vad ska göras?";
    setErrors(e);
    if (Object.keys(e).length) return;

    const params = new URLSearchParams({
      subject: `[Verkstad/service] [${location?.name ?? ""}] ${name} – ${reg.toUpperCase()}`,
      body: [
        `Registreringsnummer: ${reg.toUpperCase()}`,
        `Anläggning: ${location?.name ?? ""}`,
        `Namn: ${name}`,
        `Företag:`,
        `Telefon: ${phone}`,
        "",
        "Ärende:",
        message,
        "",
        "Önskad tid / dag:",
        ""
      ].join("\n")
    });
    window.location.href = `mailto:${location?.email ?? "info.smista@kihlstroms.se"}?${params.toString()}`;
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
          <label htmlFor="sf-reg" className="field-label">Registreringsnummer *</label>
          <input
            id="sf-reg"
            className="field uppercase placeholder:normal-case"
            value={reg}
            onChange={(e) => setReg(e.target.value)}
            placeholder="ABC 123"
          />
          {errors.reg && <p className="mt-1 text-xs font-medium text-brand-red">{errors.reg}</p>}
        </div>
        <div>
          <label htmlFor="sf-loc" className="field-label">Anläggning *</label>
          <select id="sf-loc" className="field" value={locationName} onChange={(e) => setLocationName(e.target.value)}>
            {locations.map((l) => (
              <option key={l.id}>{l.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sf-name" className="field-label">Namn *</label>
          <input id="sf-name" className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="För- och efternamn" />
          {errors.name && <p className="mt-1 text-xs font-medium text-brand-red">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="sf-phone" className="field-label">Telefon *</label>
          <input id="sf-phone" className="field" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" placeholder="07X-XXX XX XX" />
          {errors.phone && <p className="mt-1 text-xs font-medium text-brand-red">{errors.phone}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="sf-msg" className="field-label">Ärende *</label>
          <textarea
            id="sf-msg"
            className="field min-h-[110px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Service, felkod, ljud, däck, skada – eller något annat som behöver ses över."
          />
          {errors.message && <p className="mt-1 text-xs font-medium text-brand-red">{errors.message}</p>}
        </div>
      </div>
      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary">Boka serviceärende</button>
        <p className="text-xs leading-relaxed text-ink-500">
          Servicerådgivaren på vald anläggning återkommer med tidsförslag – oftast samma arbetsdag.
        </p>
      </div>
      {sent && (
        <p className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800" role="status">
          Bokningen är förberedd i din e-postklient – tryck Skicka där. Bråttom? Ring verkstaden direkt på 08-19 56 26.
        </p>
      )}
    </form>
  );
}
