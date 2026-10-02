export function TextField(props: {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="field" htmlFor={props.id}>
      <span className="field-label">{props.label}</span>
      <input
        id={props.id}
        className="field-input"
        type={props.type ?? "text"}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </label>
  );
}
