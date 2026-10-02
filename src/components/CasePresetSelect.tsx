import { casePresets } from "@/lib/casePresets";
import type { CasePreset } from "@/types/CasePreset";

export function CasePresetSelect({ onPick }: { onPick: (preset: CasePreset) => void }) {
  return (
    <label className="field" htmlFor="preset">
      <span className="field-label">Start from a case</span>
      <select
        id="preset"
        className="field-input"
        defaultValue=""
        onChange={(event) => onPick(casePresets[Number(event.target.value)])}
      >
        <option value="" disabled>
          Choose a case to fill the fields
        </option>
        {casePresets.map((preset, index) => (
          <option key={preset.label} value={index}>
            {preset.label}
          </option>
        ))}
      </select>
    </label>
  );
}
