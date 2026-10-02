export function NumberField(props: {
  id: string;
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="field" htmlFor={props.id}>
      <span className="field-label">{props.label}</span>
      <input
        id={props.id}
        className="field-input"
        type="number"
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={(event) => props.onChange(Number(event.target.value))}
      />
      <span className="field-hint">{props.hint}</span>
    </label>
  );
}
