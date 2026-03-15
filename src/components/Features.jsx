import { Link } from 'react-router-dom'

const ALGORITHMS = [
  {
    id: 'caesar',
    color: 'cyan',
    tag: 'Classical',
    iconLabel: 'A→Z',
    title: 'Caesar Cipher',
    desc: 'One of the oldest substitution ciphers. Each letter in the plaintext is shifted by a fixed number — the key. Simple, foundational, and a perfect introduction to symmetric encryption.',
    meta: 'Shift key: 0 – 25',
  },
  {
    id: 'railfence',
    color: 'green',
    tag: 'Transposition',
    iconLabel: '≋',
    title: 'Rail Fence Cipher',
    desc: 'A transposition cipher that writes plaintext in a zig-zag pattern across multiple "rails", then reads each row in order. The original order is shuffled without changing the characters.',
    meta: 'Rails: configurable',
  },
  {
    id: 'sha',
    color: 'blue',
    tag: 'One-Way Hash',
    iconLabel: '#',
    title: 'SHA Hashing',
    desc: 'Secure Hash Algorithms (SHA-1, SHA-256, SHA-512) produce a fixed-length irreversible digest of any input. Collision-resistant and the backbone of modern data integrity verification.',
    meta: 'Web Crypto API',
  },
]

function AlgorithmCard({ color, tag, iconLabel, title, desc, meta }) {
  return (
    <article className={`alg-card alg-card--${color}`}>
      <div className="alg-card__topbar" />
      <div className="alg-card__header">
        <div className="alg-card__icon">{iconLabel}</div>
        <span className="alg-card__tag">{tag}</span>
      </div>
      <h3 className="alg-card__title">{title}</h3>
      <p className="alg-card__desc">{desc}</p>
      <div className="alg-card__footer">
        <span className="alg-card__meta">{meta}</span>
        <Link to="/tool" className="alg-card__cta">Try it →</Link>
      </div>
    </article>
  )
}

export default function Features() {
  return (
    <section id="algorithms" className="features-section">
      <div className="section-hdr">
        <span className="section-eyebrow">// Algorithms</span>
        <h2 className="section-title">
          Cryptography <span className="accent">Concepts</span>
        </h2>
        <p className="section-sub">
          Three core algorithms — each with distinct properties and real-world security applications.
        </p>
      </div>

      <div id="features" className="alg-grid">
        {ALGORITHMS.map(a => <AlgorithmCard key={a.id} {...a} />)}
      </div>
    </section>
  )
}
