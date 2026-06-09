type Option = { label: string; value: string };

export function ThemedSelect({ label, options }: { label: string; options: Option[] }) {
  const first = options[0];
  return (
    <details className="themed-select">
      <summary className="themed-select-summary"><span>{label}</span><b>{first?.label}</b></summary>
      <div className="themed-select-list">
        {options.map((option) => (
          <button type="button" key={option.value}>{option.label}</button>
        ))}
      </div>
    </details>
  );
}
