"use client";

import { useRef, useState } from "react";
import { findActiveLineIndex } from "@/lib/findActiveLineIndex";
import type { TimedLine } from "@/types/TimedLine";

export function useAudioSync(lines: TimedLine[]) {
  const audioReference = useRef<HTMLAudioElement>(null);
  const [currentSeconds, setCurrentSeconds] = useState(0);

  function trackTime() {
    setCurrentSeconds(audioReference.current?.currentTime ?? 0);
  }

  function seekTo(seconds: number) {
    const audio = audioReference.current;
    if (!audio) {
      return;
    }
    audio.currentTime = seconds;
    audio.play();
  }

  return {
    audioReference,
    activeIndex: findActiveLineIndex(lines, currentSeconds),
    trackTime,
    seekTo,
  };
}
