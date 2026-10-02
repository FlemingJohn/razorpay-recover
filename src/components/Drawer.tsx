"use client";

import { useEffect, type ReactNode } from "react";
import { Icon } from "./Icon";

export function Drawer(props: {
  title: string;
  canClose: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && props.canClose) {
        props.onClose();
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [props]);

  return (
    <div className="drawer-backdrop" onClick={() => props.canClose && props.onClose()}>
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label={props.title}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="drawer-header">
          <h2 className="drawer-title">{props.title}</h2>
          <button
            type="button"
            className="icon-button"
            aria-label="Close"
            disabled={!props.canClose}
            onClick={props.onClose}
          >
            <Icon name="close" />
          </button>
        </header>
        <div className="drawer-body">{props.children}</div>
      </aside>
    </div>
  );
}
