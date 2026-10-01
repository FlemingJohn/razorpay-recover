import { iconPaths } from "@/lib/iconPaths";
import type { IconName } from "@/types/IconName";

export function Icon({ name }: { name: IconName }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={iconPaths[name]} />
    </svg>
  );
}
