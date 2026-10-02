import type { SpokenLine } from "./SpokenLine";
import type { Speaker } from "./Speaker";

export interface VapiCallbacks {
  onStarted: () => void;
  onEnded: () => void;
  onLine: (line: SpokenLine) => void;
  onSpeaker: (speaker: Speaker) => void;
  onVolume: (level: number) => void;
  onFailed: (message: string) => void;
}
