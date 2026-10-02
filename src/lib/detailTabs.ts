import type { DetailTab } from "@/types/DetailTab";
import type { IconName } from "@/types/IconName";

export const detailTabs: { id: DetailTab; label: string; icon: IconName }[] = [
  { id: "overview", label: "Overview", icon: "overview" },
  { id: "conversation", label: "Conversation", icon: "chat" },
];
