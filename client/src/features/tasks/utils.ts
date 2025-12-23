import type { TodoStatus } from "@shared/api-types";

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Returns an HTML `datetime-local` value like `YYYY-MM-DDTHH:mm` in local time.
 */
export function toDateTimeLocalValue(date: Date): string {
  return [
    date.getFullYear(),
    "-",
    pad2(date.getMonth() + 1),
    "-",
    pad2(date.getDate()),
    "T",
    pad2(date.getHours()),
    ":",
    pad2(date.getMinutes()),
  ].join("");
}

export function nowDateTimeLocalMinValue(): string {
  return toDateTimeLocalValue(new Date());
}

export function isoToDateTimeLocalValue(iso: string): string {
  return toDateTimeLocalValue(new Date(iso));
}

/**
 * Convert an HTML `datetime-local` value (local time, no timezone) to a UTC ISO string.
 * Example input:  "2025-12-23T14:30"
 * Example output: "2025-12-23T09:00:00.000Z" (depending on your local offset)
 */
export function dateTimeLocalToUtcIso(value: string): string {
  const [datePart, timePart] = value.split("T");
  if (!datePart || !timePart) return new Date(value).toISOString();

  const [y, m, d] = datePart.split("-").map((n) => Number(n));
  const [hh, mm] = timePart.split(":").map((n) => Number(n));

  // Treat as local time.
  return new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, 0, 0).toISOString();
}

export function formatDueDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  const today = new Date(now);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const dayLabel = isSameDay(date, today)
    ? "Today"
    : isSameDay(date, tomorrow)
      ? "Tomorrow"
      : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const timeLabel = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${dayLabel}, ${timeLabel}`;
}

export function statusColor(status: TodoStatus): { badge: string; text: string } {
  switch (status) {
    case "completed":
      return { badge: "bg-green-100 text-green-700", text: "text-green-700" };
    case "inprogress":
      return { badge: "bg-blue-100 text-blue-700", text: "text-blue-700" };
    case "cancelled":
      return { badge: "bg-red-100 text-red-700", text: "text-red-700" };
    case "pending":
    default:
      return { badge: "bg-yellow-100 text-yellow-700", text: "text-yellow-700" };
  }
}


