import { getInitials } from "@/lib/getInitials";

export function CustomerAvatar({ name }: { name: string }) {
  return <span className="avatar">{getInitials(name)}</span>;
}
