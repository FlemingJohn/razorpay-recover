import type { SpokenLine } from "./SpokenLine";

export interface VapiCallbacks {
  onStarted: () => void;
  onEnded: () => void;
  onLine: (line: SpokenLine) => void;
  onFailed: (message: string) => void;
}
