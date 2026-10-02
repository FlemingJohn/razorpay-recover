export interface TimedLine {
  role: "assistant" | "user";
  text: string;
  startSeconds: number;
}
