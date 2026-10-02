export function ToggleField(props: {
  id: string;
  label: string;
  hint: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="toggle-field" htmlFor={props.id}>
      <input
        id={props.id}
        type="checkbox"
        checked={props.checked}
        onChange={(event) => props.onChange(event.target.checked)}
      />
      <span className="toggle-text">
        <span className="field-label">{props.label}</span>
        <span className="field-hint">{props.hint}</span>
      </span>
    </label>
  );
}
