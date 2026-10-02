"use client";

import { useBrowserCall } from "@/hooks/useBrowserCall";
import { getBrowserCallPill } from "@/lib/getBrowserCallPill";
import type { Customer } from "@/types/Customer";
import { Drawer } from "./Drawer";
import { Icon } from "./Icon";
import { SpokenTranscript } from "./SpokenTranscript";
import { StatusPill } from "./StatusPill";
import { TestCasesHint } from "./TestCasesHint";

export function BrowserCallDrawer(props: {
  customer: Customer;
  onClose: () => void;
  onChanged: () => void;
}) {
  const { state, lines, errorMessage, start, stop } = useBrowserCall(props.customer.id, props.onChanged);
  const isBusy = state === "connecting" || state === "live";
  return (
    <Drawer title={`Talk as ${props.customer.name}`} canClose={!isBusy} onClose={props.onClose}>
      <p className="state-message">
        Your browser asks for the microphone. The agent will greet {props.customer.name} about the{" "}
        {props.customer.plan} payment. Answer as that customer.
      </p>
      <div className="call-heading">
        <StatusPill {...getBrowserCallPill(state)} />
        {isBusy ? (
          <button type="button" className="button button-danger" onClick={stop}>
            <Icon name="ban" />
            End call
          </button>
        ) : (
          <button type="button" className="button" onClick={start}>
            <Icon name="wave" />
            Start talking
          </button>
        )}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <SpokenTranscript lines={lines} />
      <TestCasesHint />
    </Drawer>
  );
}
