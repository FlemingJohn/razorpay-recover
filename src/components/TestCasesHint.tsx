import { testCases } from "@/lib/testCases";

export function TestCasesHint() {
  return (
    <div className="hint">
      <strong>Things to say on the call</strong>
      <ul className="hint-list">
        {testCases.map((item) => (
          <li key={item.say}>
            <em>{item.say}</em>: {item.result}
          </li>
        ))}
      </ul>
    </div>
  );
}
