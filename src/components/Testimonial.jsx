import { Link } from 'react-router-dom'

export default function Testimonial() {
  return (
    <section className="cta-band">
      <div className="cta-band__glow" aria-hidden="true" />

      <div className="cta-band__inner">
        <span className="cta-band__badge">// Encryption Ready</span>

        <h2 className="cta-band__heading">
          Ready to explore{' '}
          <span className="accent">encryption</span>?
        </h2>

        <p className="cta-band__sub">
          Experiment with cipher algorithms in real time. Observe how classical
          and modern techniques transform your plaintext into secure ciphertext —
          entirely inside your browser.
        </p>

        <Link to="/tool" className="btn btn-primary btn--lg">
          Open Encryption Tool
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
