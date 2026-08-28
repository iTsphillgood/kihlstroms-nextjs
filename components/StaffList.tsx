import type { Staff } from "../lib/data";

export default function StaffList({ people }: { people: Staff[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {people.map((person) => {
        const initials = person.name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("");
        return (
          <li key={person.name} className="card flex gap-4 p-5">
            <span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink-100 text-sm font-extrabold text-ink-600"
              aria-hidden="true"
            >
              {initials}
            </span>
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-ink-900">{person.name}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">{person.role}</p>
              <p className="text-xs text-ink-500">{person.location}</p>
              <p className="mt-2 line-clamp-2 text-sm text-ink-600">{person.bio}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <a href={`mailto:${person.email}`} className="link">
                  {person.email}
                </a>
                <a href={person.phoneHref} className="font-semibold text-ink-800 hover:text-brand-blue">
                  {person.phone}
                </a>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
