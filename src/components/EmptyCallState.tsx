export function EmptyCallState() {
  return (
    <div className="empty-state">
      <svg className="empty-art" viewBox="0 0 200 140" aria-hidden="true">
        <rect className="art-soft" x="62" y="14" width="76" height="112" rx="16" />
        <rect className="art-line" x="62" y="14" width="76" height="112" rx="16" />
        <path className="art-line" d="M88 40h24" />
        <circle className="art-accent" cx="100" cy="84" r="16" />
        <path className="art-white" d="M93 80h14M93 88h9" />
        <path className="art-line" d="M30 70c10-10 10-30 0-40M170 70c-10-10-10-30 0-40" />
        <path className="art-line" d="M16 82c16-16 16-48 0-64M184 82c-16-16-16-48 0-64" />
      </svg>
      <h2 className="card-title">No calls yet</h2>
      <p className="state-message">
        Press Call now or Talk in browser on the Customers page, and the call appears here with its
        summary, recording and transcript.
      </p>
    </div>
  );
}
