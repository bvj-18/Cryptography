const STATS = [
  { value: '3',   suffix: '',      label: 'Algorithms' },
  { value: '512', suffix: '-bit',  label: 'Max SHA Length' },
  { value: '100', suffix: '%',     label: 'Client-Side' },
  { value: '0',   suffix: ' logs', label: 'Data Stored' },
]

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-inner">
        {STATS.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-value">
              {s.value}
              <span className="stat-suffix">{s.suffix}</span>
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
