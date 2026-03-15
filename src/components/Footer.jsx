export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            <span className="logo-bracket">&#x27E8;</span>
            <span className="logo-text">Crypto</span>
            <span className="logo-accent">Lab</span>
            <span className="logo-bracket">&#x27E9;</span>
          </a>
          <p className="footer__tagline">
            Browser-based cryptography tools for education and security exploration.
            Zero data stored, fully client-side.
          </p>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h4 className="footer__col-hd">Navigation</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#algorithms">Algorithms</a></li>
              <li><a href="#features">Features</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-hd">Tools</h4>
            <ul>
              <li><a href="/tool">Encryption Tool</a></li>
              <li><a href="/tool">Caesar Cipher</a></li>
              <li><a href="/tool">Rail Fence</a></li>
              <li><a href="/tool">SHA Hash</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {year} CryptoLab — All operations are client-side &amp; private.</span>
        <span className="footer__built">Built with React + Vite</span>
      </div>
    </footer>
  )
}
