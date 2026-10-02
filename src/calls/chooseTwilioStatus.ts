export function chooseTwilioStatus(vapiStatus: string): "canceled" | "completed" {
  return vapiStatus === "in-progress" ? "completed" : "canceled";
}
