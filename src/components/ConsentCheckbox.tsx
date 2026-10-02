export function ConsentCheckbox(props: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="consent" htmlFor="permission">
      <input
        id="permission"
        type="checkbox"
        checked={props.checked}
        onChange={(event) => props.onChange(event.target.checked)}
      />
      <span>I own this number or have clear permission to call it and send it messages.</span>
    </label>
  );
}
