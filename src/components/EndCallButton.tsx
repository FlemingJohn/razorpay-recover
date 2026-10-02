"use client";

import { useEndCall } from "@/hooks/useEndCall";
import { Icon } from "./Icon";

export function EndCallButton(props: { callId: string; onEnded: () => void }) {
  const { isEnding, errorMessage, endCall } = useEndCall(props.onEnded);
  return (
    <div className="end-call">
      <button
        type="button"
        className="button button-danger"
        disabled={isEnding}
        onClick={() => endCall(props.callId)}
      >
        <Icon name="ban" />
        {isEnding ? "Ending" : "End call"}
      </button>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
}
