import type { RequestStatus } from "@/types/RequestStatus";

const messages = {
  loading: "Loading",
  failed: "Could not load this page. Check your settings and try again.",
};

export function StateMessage({ status }: { status: Exclude<RequestStatus, "ready"> }) {
  return <p className="state-message">{messages[status]}</p>;
}
