export function makeCallFileName(
  customerName: string,
  createdAt: string,
  extension: string,
): string {
  const name = customerName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const date = new Date(createdAt).toISOString().slice(0, 16).replace("T", "-").replace(":", "");
  return `call-${name || "customer"}-${date}.${extension}`;
}
