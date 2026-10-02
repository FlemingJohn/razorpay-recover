import type { RedactionLevel } from "@/types/RedactionLevel";

export const redactionLevels: {
  value: RedactionLevel;
  label: string;
  categories: string[];
}[] = [
  { value: "off", label: "Off", categories: [] },
  { value: "card", label: "Card details only (recommended)", categories: ["pci"] },
  { value: "personal", label: "Personal details (names, places, ID numbers)", categories: ["pii"] },
  { value: "both", label: "Card and personal details", categories: ["pci", "pii"] },
];
