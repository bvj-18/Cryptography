import { Link } from 'react-router-dom'

const HEX_FLOATS = [
  { t: '4B 65 79',  x: '7%',  y: '18%', d: 0,   s: 9  },
  { t: '53 48 41',  x: '14%', y: '62%', d: 1.8, s: 12 },
  { t: 'A3 F7 2C',  x: '76%', y: '22%', d: 0.5, s: 8  },
  { t: '0x1A4F',   x: '71%', y: '72%', d: 2.2, s: 7  },
  { t: '8F 4B 29',  x: '2%',  y: '44%', d: 3.1, s: 11 },
  { t: '256-bit',   x: '84%', y: '46%', d: 1,   s: 10 },
  { t: 'D4 E7 9C',  x: '44%', y: '6%',  d: 2.5, s: 8  },
  { t: '01001000',  x: '59%', y: '86%', d: 0.8, s: 14 },
  { t: '5A 2B 4F',  x: '29%', y: '77%', d: 4,   s: 9  },
  { t: '0xFF3C',   x: '91%', y: '58%', d: 1.3, s: 11 },
  { t: 'CF 89 11',  x: '54%', y: '93%', d: 3.5, s: 7  },
  { t: 'AES-256',   x: '17%', y: '89%', d: 0.3, s: 13 },
  { t: '1A2B3C4D',  x: '67%', y: '11%', d: 2.8, s: 10 },
  { t: '7F 00 01',  x: '39%', y: '32%', d: 1.9, s: 9  },
  { t: '0x4D6F73', x: '9%',  y: '30%', d: 4.3, s: 8  },
  { t: 'F2 A1 77',  x: '48%', y: '48%', d: 0.6, s: 15 },
  { t: '3C 9D 05',  x: '22%', y: '10%', d: 3.8, s: 10 },
]

function ShieldSVG() {
  return (
    <div className="shield-wrap">
      <div className="shield-orbit shield-orbit--outer" />
      <div className="shield-orbit shield-orbit--inner" />

      <svg className="shield-svg" viewBox="0 0 220 268" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow-med">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-strong">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="shield-fill" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%"   stopColor="#00e5ff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#004466" stopOpacity="0.08" />
          </linearGradient>
          <clipPath id="shield-clip">
            <path d="M110 14 L198 48 L198 138 C198 196 154 236 110 256 C66 236 22 196 22 138 L22 48 Z" />
          </clipPath>
        </defs>

        {/* outer shield */}
        <path
          d="M110 14 L198 48 L198 138 C198 196 154 236 110 256 C66 236 22 196 22 138 L22 48 Z"
          fill="url(#shield-fill)"
          stroke="#00e5ff"
          strokeWidth="1.8"
          filter="url(#glow-med)"
        />
        {/* inner edge */}
        <path
          d="M110 30 L182 58 L182 138 C182 188 146 222 110 240 C74 222 38 188 38 138 L38 58 Z"
          fill="none"
          stroke="rgba(0,229,255,0.2)"
          strokeWidth="1"
        />

        {/* grid inside shield */}
        <g clipPath="url(#shield-clip)" opacity="0.12">
          {[55, 85, 115, 145, 175, 210].map(y => (
            <line key={`h${y}`} x1="10" y1={y} x2="210" y2={y} stroke="#00e5ff" strokeWidth="0.6" />
          ))}
          {[45, 75, 110, 145, 175].map(x => (
            <line key={`v${x}`} x1={x} y1="10" x2={x} y2="258" stroke="#00e5ff" strokeWidth="0.6" />
          ))}
        </g>

        {/* lock body */}
        <rect x="83" y="132" width="54" height="46" rx="5"
          fill="rgba(0,229,255,0.12)" stroke="#00e5ff" strokeWidth="1.8"
          filter="url(#glow-med)" />
        {/* shackle */}
        <path d="M95 132 L95 116 Q95 100 110 100 Q125 100 125 116 L125 132"
          fill="none" stroke="#00e5ff" strokeWidth="2.4" strokeLinecap="round"
          filter="url(#glow-med)" />
        {/* keyhole */}
        <circle cx="110" cy="151" r="8.5" fill="#00e5ff" opacity="0.9" filter="url(#glow-strong)" />
        <rect x="107" y="157" width="6" height="11" rx="2.5" fill="#00e5ff" opacity="0.9" filter="url(#glow-strong)" />

        {/* corner accents */}
        <path d="M22 88 L8 88 L8 48 L22 48"   stroke="#00e5ff" strokeWidth="1" opacity="0.35" />
        <path d="M198 88 L212 88 L212 48 L198 48" stroke="#00e5ff" strokeWidth="1" opacity="0.35" />
      </svg>

      <div className="shield-scanline" />
      <span className="shield-tag shield-tag--1">AES-256</span>
      <span className="shield-tag shield-tag--2">SHA-512</span>
      <span className="shield-tag shield-tag--3">SECURE</span>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="hero">
      {/* floating hex background */}
      <div className="hero__hex-bg" aria-hidden="true">
        {HEX_FLOATS.map((f, i) => (
          <span
            key={i}
            className="hex-float"
            style={{ left: f.x, top: f.y, animationDelay: `${f.d}s`, animationDuration: `${f.s}s` }}
          >
            {f.t}
          </span>
        ))}
      </div>

      {/* corner brackets */}
      <div className="hero__corner tl" aria-hidden="true" />
      <div className="hero__corner tr" aria-hidden="true" />
      <div className="hero__corner bl" aria-hidden="true" />
      <div className="hero__corner br" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__left">
          <p className="hero__eyebrow">
            <span className="eyebrow-dot" />
            Advanced Encryption Suite
          </p>

          <h1 className="hero__heading">
            Comprehensive<br />
            <span className="hero__heading-cyan">Cryptography</span><br />
            Strategies for Security
          </h1>

          <p className="hero__sub">
            Unlock the power of modern cryptographic algorithms. Encrypt,
            decrypt, and hash with Caesar Cipher, Rail Fence, and SHA
            standards — all processed in your browser, with zero data stored.
          </p>

          <div className="hero__actions">
            <Link to="/tool" className="btn btn-primary">
              Try Encryption Tool
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
            <a href="#algorithms" className="btn btn-outline">Learn More</a>
          </div>
        </div>

        <div className="hero__right">
          <ShieldSVG />
        </div>
      </div>
    </section>
  )
}
