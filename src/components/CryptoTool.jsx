import { useState } from 'react'

/* ─────────────────────────────────────────────────────────────
   ALGORITHM IMPLEMENTATIONS
───────────────────────────────────────────────────────────── */

// Caesar Cipher
function caesarEncrypt(text, shift) {
  const s = ((shift % 26) + 26) % 26
  return text.replace(/[a-zA-Z]/g, ch => {
    const base = ch >= 'a' ? 97 : 65
    return String.fromCharCode(((ch.charCodeAt(0) - base + s) % 26) + base)
  })
}
function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, -shift)
}

// Rail Fence Cipher
function railFenceEncrypt(text, rails) {
  if (rails < 2) return text
  const fence = Array.from({ length: rails }, () => [])
  let rail = 0, dir = 1
  for (const ch of text) {
    fence[rail].push(ch)
    if (rail === 0) dir = 1
    else if (rail === rails - 1) dir = -1
    rail += dir
  }
  return fence.flat().join('')
}

function railFenceDecrypt(text, rails) {
  if (rails < 2) return text
  const n = text.length
  const indices = Array(n).fill(0)
  let rail = 0, dir = 1
  for (let i = 0; i < n; i++) {
    indices[i] = rail
    if (rail === 0) dir = 1
    else if (rail === rails - 1) dir = -1
    rail += dir
  }
  const counts = Array(rails).fill(0)
  for (const r of indices) counts[r]++
  const rows = []
  let pos = 0
  for (let r = 0; r < rails; r++) {
    rows.push(text.slice(pos, pos + counts[r]).split(''))
    pos += counts[r]
  }
  const ptrs = Array(rails).fill(0)
  let result = ''
  for (const r of indices) {
    result += rows[r][ptrs[r]++]
  }
  return result
}

// Rail Fence visualization
function buildRailVisualization(text, rails) {
  if (rails < 2 || !text) return ''
  const grid = Array.from({ length: rails }, () => Array(text.length).fill(' '))
  let rail = 0, dir = 1
  for (let i = 0; i < text.length; i++) {
    grid[rail][i] = text[i]
    if (rail === 0) dir = 1
    else if (rail === rails - 1) dir = -1
    rail += dir
  }
  return grid.map(row => row.join('')).join('\n')
}

// SHA-512 via Web Crypto API
async function sha512Hash(text) {
  const encoded = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-512', encoded)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────── */

const ALGORITHMS = [
  { value: 'caesar',    label: 'Caesar Cipher' },
  { value: 'railfence', label: 'Rail Fence Cipher' },
  { value: 'sha512',    label: 'SHA-512 Hash' },
]

export default function CryptoTool() {
  const [inputText,    setInputText]    = useState('')
  const [algorithm,    setAlgorithm]    = useState('caesar')
  const [key,          setKey]          = useState(3)
  const [output,       setOutput]       = useState('')
  const [visualization,setVisualization]= useState('')
  const [copied,       setCopied]       = useState(false)
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState('')

  const isSHA     = algorithm === 'sha512'
  const isRail    = algorithm === 'railfence'
  const keyLabel  = isRail ? 'Number of Rails' : 'Shift Value'
  const keyMin    = isRail ? 2 : 1

  function setErr(msg) { setError(msg); setOutput('') }

  async function handleEncrypt() {
    setError('')
    setVisualization('')
    if (!inputText.trim()) { setErr('Please enter some text first.'); return }

    if (isSHA) {
      setLoading(true)
      try {
        const hash = await sha512Hash(inputText)
        setOutput(hash)
      } catch { setErr('SHA-512 hashing failed.') }
      setLoading(false)
      return
    }
    if (isRail) {
      const r = parseInt(key, 10)
      if (isNaN(r) || r < 2) { setErr('Rails must be 2 or more.'); return }
      const enc = railFenceEncrypt(inputText, r)
      setOutput(enc)
      setVisualization(buildRailVisualization(inputText, r))
      return
    }
    // Caesar
    const s = parseInt(key, 10)
    if (isNaN(s)) { setErr('Enter a valid shift number.'); return }
    setOutput(caesarEncrypt(inputText, s))
  }

  function handleDecrypt() {
    setError('')
    setVisualization('')
    if (!inputText.trim()) { setErr('Please enter some text first.'); return }
    if (isSHA) { setErr('SHA-512 is a one-way hash — decryption is not possible.'); return }

    if (isRail) {
      const r = parseInt(key, 10)
      if (isNaN(r) || r < 2) { setErr('Rails must be 2 or more.'); return }
      const dec = railFenceDecrypt(inputText, r)
      setOutput(dec)
      setVisualization(buildRailVisualization(dec, r))
      return
    }
    const s = parseInt(key, 10)
    if (isNaN(s)) { setErr('Enter a valid shift number.'); return }
    setOutput(caesarDecrypt(inputText, s))
  }

  function handleClear() {
    setInputText('')
    setOutput('')
    setVisualization('')
    setError('')
    setKey(3)
  }

  async function handleCopy() {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { setErr('Clipboard access denied.') }
  }

  return (
    <div className="tool-page">
      {/* grid bg */}
      <div className="tool-page__grid" aria-hidden="true" />

      <div className="tool-card">

        {/* ── Header ── */}
        <div className="tool-card__header">
          <span className="tool-card__eyebrow">// Cryptography Suite</span>
          <h1 className="tool-card__title">
            <span className="accent">Crypto</span>graphy Tool
          </h1>
          <p className="tool-card__sub">
            Encrypt, decrypt, and hash text using classic and modern algorithms.
            All operations run entirely in your browser.
          </p>
        </div>

        <div className="tool-grid">

          {/* ── Left column: Input + controls ── */}
          <div className="tool-col">

            {/* Input */}
            <div className="tool-field">
              <label className="tool-label">
                <span className="label-tag">01</span> Plain / Cipher Text
              </label>
              <textarea
                className="tool-textarea"
                rows={7}
                placeholder="Enter text here…"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
              />
            </div>

            {/* Algorithm */}
            <div className="tool-field">
              <label className="tool-label">
                <span className="label-tag">02</span> Algorithm
              </label>
              <div className="tool-select-wrap">
                <select
                  className="tool-select"
                  value={algorithm}
                  onChange={e => { setAlgorithm(e.target.value); setOutput(''); setVisualization(''); setError('') }}
                >
                  {ALGORITHMS.map(a => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </select>
                <span className="select-chevron">▾</span>
              </div>
            </div>

            {/* Key */}
            <div className="tool-field">
              <label className={`tool-label${isSHA ? ' tool-label--dim' : ''}`}>
                <span className="label-tag">03</span> {keyLabel}
              </label>
              <input
                type="number"
                className="tool-input"
                min={keyMin}
                max={isRail ? 20 : 25}
                value={key}
                disabled={isSHA}
                onChange={e => setKey(e.target.value)}
              />
              {isSHA && (
                <p className="tool-hint">Key not applicable for hashing algorithms.</p>
              )}
            </div>

            {/* Action buttons */}
            <div className="tool-actions">
              <button className="tbtn tbtn--primary" onClick={handleEncrypt} disabled={loading}>
                {loading ? '…' : (isSHA ? 'Hash' : 'Encrypt')}
                {!loading && (
                  <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              <button className="tbtn tbtn--outline" onClick={handleDecrypt} disabled={isSHA || loading}>
                Decrypt
                <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                  <path fillRule="evenodd" d="M14.5 1A4.5 4.5 0 0010 5.5V9H3a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V5.5a3 3 0 116 0v2.75a.75.75 0 001.5 0V5.5A4.5 4.5 0 0014.5 1z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="tbtn tbtn--ghost" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>

          {/* ── Right column: Output ── */}
          <div className="tool-col">

            {/* Output box */}
            <div className="tool-field tool-field--grow">
              <label className="tool-label">
                <span className="label-tag">04</span> Output
              </label>
              <div className={`tool-output${output ? ' tool-output--active' : ''}${error ? ' tool-output--error' : ''}`}>
                {error ? (
                  <span className="output-error">{error}</span>
                ) : output ? (
                  <span className="output-text">{output}</span>
                ) : (
                  <span className="output-placeholder">Result will appear here…</span>
                )}
              </div>
              <button
                className={`tbtn tbtn--copy${copied ? ' tbtn--copied' : ''}${!output ? ' tbtn--disabled' : ''}`}
                onClick={handleCopy}
                disabled={!output}
              >
                {copied
                  ? (<>✓ Copied!</>)
                  : (<>
                      <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                        <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                        <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                      </svg>
                      Copy Output
                    </>)
                }
              </button>
            </div>

            {/* Rail Fence visualization */}
            {isRail && visualization && (
              <div className="tool-field">
                <label className="tool-label">
                  <span className="label-tag">05</span> Rail Pattern Visualization
                </label>
                <pre className="tool-viz">{visualization}</pre>
              </div>
            )}

            {/* Algorithm info panel */}
            <div className="algo-info">
              {algorithm === 'caesar' && (
                <>
                  <h4 className="algo-info__title">Caesar Cipher</h4>
                  <p className="algo-info__body">
                    Each letter is shifted by the key value. A shift of 3 turns
                    <code> A → D</code>, <code>B → E</code>, etc. Letters wrap around
                    the alphabet; non-letter characters are preserved.
                  </p>
                </>
              )}
              {algorithm === 'railfence' && (
                <>
                  <h4 className="algo-info__title">Rail Fence Cipher</h4>
                  <p className="algo-info__body">
                    Text is written in a zigzag across <em>N</em> rails, then read
                    row by row. The visualization above shows exactly which
                    character lands on each rail.
                  </p>
                </>
              )}
              {algorithm === 'sha512' && (
                <>
                  <h4 className="algo-info__title">SHA-512</h4>
                  <p className="algo-info__body">
                    A one-way cryptographic hash function producing a 512-bit
                    (128 hex character) digest. Identical inputs always produce
                    identical hashes; the original text cannot be recovered.
                    Powered by the browser's native <code>Web Crypto API</code>.
                  </p>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
