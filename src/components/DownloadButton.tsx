import { Icon } from "./Icon";

export function DownloadButton(props: { href: string; label: string; detail: string }) {
  return (
    <a className="download-button" href={props.href} download>
      <span className="download-icon">
        <Icon name="download" />
      </span>
      <span className="download-text">
        <span className="download-label">{props.label}</span>
        <span className="download-detail">{props.detail}</span>
      </span>
    </a>
  );
}
