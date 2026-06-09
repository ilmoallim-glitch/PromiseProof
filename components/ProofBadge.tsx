export function ProofBadge({ label, tone = 'green' }: { label: string; tone?: 'green' | 'blue' | 'gold' | 'pink' | 'red' }) {
  return <span className={`badge ${tone}`}>● {label}</span>;
}
