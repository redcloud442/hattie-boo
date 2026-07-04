const TZ = "Asia/Manila";

export function formatEventDate(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: TZ,
  }).format(d);
}

export function formatEventTime(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: TZ,
  }).format(d);
}

export type DateParts = {
  weekday: string;
  month: string;
  day: string;
  year: string;
  time: string;
};

// Structured pieces for the "Day · Date · Time" invitation row.
export function getDateParts(d: Date): DateParts {
  const p = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-US", { ...opts, timeZone: TZ }).format(d);
  return {
    weekday: p({ weekday: "long" }),
    month: p({ month: "short" }),
    day: p({ day: "numeric" }),
    year: p({ year: "numeric" }),
    time: formatEventTime(d),
  };
}

// Formats a Date as a `YYYY-MM-DDTHH:mm` string in the event timezone,
// suitable for an <input type="datetime-local"> value.
export function toDatetimeLocalValue(d: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TZ,
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

export function roleLabel(role: string): string {
  switch (role) {
    case "ninong":
      return "Ninong";
    case "ninang":
      return "Ninang";
    default:
      return "Guest";
  }
}
