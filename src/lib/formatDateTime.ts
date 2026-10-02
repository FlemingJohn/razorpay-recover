export function formatDateTime(isoDate: string): string {
  return new Date(isoDate).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}
