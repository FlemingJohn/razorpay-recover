"use client";

import { useBrowserCall } from "@/hooks/useBrowserCall";
import { getBrowserCallPill } from "@/lib/getBrowserCallPill";
import type { Customer } from "@/types/Customer";
import { Drawer } from "./Drawer";
import { Icon } from "./Icon";
import { LiveCallView } from "./LiveCallView";
import { SpokenTranscript } from "./SpokenTranscript";
import { StatusPill } from "./StatusPill";
import { TestCasesHint } from "./TestCasesHint";

export function BrowserCallDrawer(props: {
  customer: Customer;
  onClose: () => void;
  onChanged: () => void;
}) {
  const call = useBrowserCall(props.customer.id, props.onChanged);
  const isBusy = call.state === "connecting" || call.state === "live";
  return (
    <Drawer title={`Talk as ${props.customer.name}`} canClose={!isBusy} onClose={props.onClose}>
      <p className="state-message">
        Your browser asks for the microphone. The agent will greet {props.customer.name} about the{" "}
        {props.customer.plan} payment. Answer as that customer.
      </p>
      <div className="call-heading">
        <StatusPill {...getBrowserCallPill(call.state)} />
        {isBusy ? (
          <button type="button" className="button button-danger" onClick={call.stop}>
            <Icon name="ban" />
            End call
          </button>
        ) : (
          <button type="button" className="button" onClick={call.start}>
            <Icon name="wave" />
            Start talking
          </button>
        )}
      </div>
      {call.errorMessage && <p className="error-message">{call.errorMessage}</p>}
      {isBusy ? (
        <LiveCallView state={call.state} speaker={call.speaker} volume={call.volume} lines={call.lines} />
      ) : (
        <SpokenTranscript lines={call.lines} />
      )}
      <TestCasesHint />
    </Drawer>
  );
}
