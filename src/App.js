import { useState } from "react";

// ══════════════════════════════════════════════════════════════════
//  ✏️  CONFIGURATIE — PAS DIT AAN NAAR JOUW GEGEVENS
// ══════════════════════════════════════════════════════════════════

const SESSIONS = [
  { id: 1, name: "Duo Scrims EU #1", date: "Zaterdag 15 Maart – 20:00", spots: 50, filled: 32, price: 4.00, active: true },
  { id: 2, name: "Duo Scrims EU #2", date: "Zondag 16 Maart – 19:00",   spots: 50, filled: 18, price: 4.00, active: true },
  { id: 3, name: "Cash Cup Qualifier", date: "Vrijdag 21 Maart – 21:00", spots: 50, filled: 50, price: 10.00, active: false },
];

const PAYMENT_METHODS = [
  {
    id: "bank",
    label: "Bank Transfer",
    badge: "0% fee",
    icon: "🏦",
    instructions: (price) => [
      `Bedrag: €${price.toFixed(2)}`,
      "IBAN: BE12 3456 7890 1234",       // ← jouw IBAN
      "Naam: PayTwoWin",
      "Mededeling: je Discord username",
    ],
  },
  {
    id: "paypal",
    label: "PayPal F&F",
    badge: "0% fee",
    icon: "💸",
    instructions: (price) => [
      `Bedrag: €${price.toFixed(2)}`,
      "PayPal: payments@paytwowin.gg",   // ← jouw PayPal email
      "Stuur als 'Vrienden & Familie'",
      "Notitie: je Discord username",
    ],
  },
  {
    id: "tikkie",
    label: "Tikkie",
    badge: "0% fee",
    icon: "📲",
    instructions: (price) => [
      `Bedrag: €${price.toFixed(2)}`,
      "Tikkie link: tikkie.me/paytwowin", // ← jouw Tikkie link
      "Vermeld je Discord username",
    ],
  },
];

const ADMIN_PASSWORD = "P2W_admin2024"; // ← verander dit naar jouw wachtwoord

// ══════════════════════════════════════════════════════════════════

const usePayments = () => {
  const [payments, setPayments] = useState([
    { id: "demo1", session: 1, discord: "xXFraggerXx#0001", duo: "", method: "bank",   price: 4.00, status: "pending",  submitted: "14 Mrt 18:23" },
    { id: "demo2", session: 1, discord: "Snipeking99#4521",  duo: "", method: "paypal", price: 4.00, status: "approved", submitted: "14 Mrt 17:10" },
    { id: "demo3", session: 2, discord: "DuoGod_Luca#2211", duo: "", method: "tikkie", price: 4.00, status: "pending",  submitted: "14 Mrt 19:01" },
  ]);
  const approve = (id) => setPayments(p => p.map(x => x.id === id ? { ...x, status: "approved" } : x));
  const reject  = (id) => setPayments(p => p.map(x => x.id === id ? { ...x, status: "rejected" } : x));
  const add = (entry) => setPayments(p => [...p, {
    ...entry,
    id: "p" + Date.now(),
    submitted: new Date().toLocaleString("nl-BE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
  }]);
  return { payments, approve, reject, add };
};

// ─── CSS ──────────────────────────────────────────────────────────
const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #050810; --surface: #0d1220; --surface2: #131929; --border: #1e2d4a;
    --blue: #1a6fff; --blue-glow: #1a6fff44; --blue-bright: #4d93ff;
    --gold: #ffc947; --green: #1aff8c; --red: #ff3d3d;
    --text: #e8edf7; --muted: #5a6a8a;
    --font-head: 'Barlow Condensed', sans-serif; --font-body: 'Barlow', sans-serif;
  }
  body { background: var(--bg); }
  .app { min-height: 100vh; display: flex; flex-direction: column; }
  .header {
    border-bottom: 1px solid var(--border);
    background: linear-gradient(180deg, #090e1a 0%, transparent 100%);
    padding: 0 24px; display: flex; align-items: center; justify-content: space-between;
    height: 64px; position: sticky; top: 0; z-index: 50; backdrop-filter: blur(12px);
  }
  .logo { font-family: var(--font-head); font-size: 26px; font-weight: 900; letter-spacing: 1px; color: var(--text); }
  .logo span { color: var(--blue-bright); }
  .nav { display: flex; gap: 8px; }
  .nav-btn {
    background: none; border: 1px solid transparent; color: var(--muted);
    font-family: var(--font-head); font-size: 14px; font-weight: 600;
    letter-spacing: 1px; text-transform: uppercase; padding: 7px 16px;
    border-radius: 4px; cursor: pointer; transition: all .2s;
  }
  .nav-btn:hover { color: var(--text); border-color: var(--border); }
  .nav-btn.active { color: var(--blue-bright); border-color: var(--blue); background: var(--blue-glow); }
  .main { flex: 1; padding: 32px 24px; max-width: 900px; margin: 0 auto; width: 100%; }
  .section-title {
    font-family: var(--font-head); font-size: 32px; font-weight: 900;
    letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px;
    background: linear-gradient(90deg, #fff, var(--blue-bright));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .section-sub { color: var(--muted); font-size: 14px; margin-bottom: 28px; }
  .sessions-grid { display: grid; gap: 14px; }
  .session-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 8px;
    padding: 20px 22px; display: flex; align-items: center; justify-content: space-between;
    cursor: pointer; transition: all .2s; position: relative; overflow: hidden;
  }
  .session-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: var(--blue); opacity: 0; transition: opacity .2s;
  }
  .session-card:hover:not(.disabled) { border-color: var(--blue); background: var(--surface2); }
  .session-card:hover:not(.disabled)::before { opacity: 1; }
  .session-card.selected { border-color: var(--blue); background: var(--surface2); }
  .session-card.selected::before { opacity: 1; }
  .session-card.disabled { opacity: .45; cursor: not-allowed; }
  .session-name { font-family: var(--font-head); font-size: 20px; font-weight: 800; }
  .session-date { color: var(--muted); font-size: 13px; margin-top: 3px; }
  .session-right { text-align: right; }
  .session-price { font-family: var(--font-head); font-size: 28px; font-weight: 900; color: var(--gold); }
  .session-spots { font-size: 12px; color: var(--muted); margin-top: 3px; }
  .full-badge {
    background: #ff3d3d22; color: var(--red); border: 1px solid var(--red);
    font-family: var(--font-head); font-size: 11px; font-weight: 700;
    letter-spacing: 1px; padding: 3px 10px; border-radius: 3px;
  }
  .spots-bar { margin-top: 10px; height: 3px; background: var(--border); border-radius: 2px; }
  .spots-fill { height: 100%; background: var(--blue); border-radius: 2px; }
  .steps { display: flex; gap: 0; margin-bottom: 28px; }
  .step {
    flex: 1; display: flex; align-items: center; gap: 10px; padding: 12px 0;
    border-bottom: 2px solid var(--border); color: var(--muted);
    font-family: var(--font-head); font-size: 14px; font-weight: 700;
    letter-spacing: 1px; text-transform: uppercase;
  }
  .step.active { border-bottom-color: var(--blue); color: var(--blue-bright); }
  .step.done { border-bottom-color: var(--green); color: var(--green); }
  .step-num {
    width: 24px; height: 24px; border-radius: 50%; border: 1.5px solid currentColor;
    display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;
  }
  .methods-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; }
  .method-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 8px;
    padding: 18px; text-align: center; cursor: pointer; transition: all .2s;
  }
  .method-card:hover { border-color: var(--blue); background: var(--surface2); }
  .method-card.selected { border-color: var(--blue); background: var(--blue-glow); }
  .method-icon { font-size: 28px; margin-bottom: 8px; }
  .method-label { font-family: var(--font-head); font-size: 16px; font-weight: 800; }
  .method-badge {
    display: inline-block; margin-top: 6px;
    background: #1aff8c22; color: var(--green); border: 1px solid var(--green);
    font-size: 11px; font-weight: 700; letter-spacing: 1px; padding: 2px 8px; border-radius: 3px;
  }
  .instructions-box {
    background: var(--surface); border: 1px solid var(--blue); border-radius: 8px;
    padding: 20px; margin-bottom: 24px;
  }
  .instructions-title {
    font-family: var(--font-head); font-size: 13px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--blue-bright); margin-bottom: 14px;
  }
  .instruction-row {
    display: flex; align-items: baseline; gap: 10px;
    padding: 9px 0; border-bottom: 1px solid var(--border); font-size: 15px;
  }
  .instruction-row:last-child { border-bottom: none; }
  .instruction-bullet { color: var(--blue); font-weight: 700; flex-shrink: 0; }
  .form-group { margin-bottom: 18px; }
  .form-label {
    display: block; font-family: var(--font-head); font-size: 13px; font-weight: 700;
    letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px;
  }
  .form-input {
    width: 100%; background: var(--surface); border: 1px solid var(--border);
    border-radius: 6px; padding: 12px 16px; color: var(--text); font-size: 15px;
    font-family: var(--font-body); transition: border-color .2s; outline: none;
  }
  .form-input:focus { border-color: var(--blue); }
  .form-input::placeholder { color: var(--muted); }
  .btn {
    font-family: var(--font-head); font-size: 16px; font-weight: 800;
    letter-spacing: 1.5px; text-transform: uppercase; border: none;
    border-radius: 6px; padding: 14px 28px; cursor: pointer; transition: all .2s;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-primary { background: var(--blue); color: #fff; box-shadow: 0 0 24px var(--blue-glow); }
  .btn-primary:hover { background: var(--blue-bright); transform: translateY(-1px); }
  .btn-primary:disabled { opacity: .4; cursor: not-allowed; transform: none; }
  .btn-secondary { background: var(--surface2); border: 1px solid var(--border); color: var(--muted); }
  .btn-secondary:hover { border-color: var(--blue); color: var(--text); }
  .btn-sm { font-size: 12px; padding: 7px 14px; }
  .btn-approve { background: #1aff8c22; border: 1px solid var(--green); color: var(--green); }
  .btn-approve:hover { background: var(--green); color: #000; }
  .btn-reject { background: #ff3d3d22; border: 1px solid var(--red); color: var(--red); }
  .btn-reject:hover { background: var(--red); color: #fff; }
  .success-box {
    background: var(--surface); border: 1px solid var(--green); border-radius: 12px;
    padding: 40px; text-align: center;
  }
  .success-icon { font-size: 52px; margin-bottom: 16px; }
  .success-title { font-family: var(--font-head); font-size: 32px; font-weight: 900; color: var(--green); margin-bottom: 10px; }
  .success-sub { color: var(--muted); line-height: 1.6; }
  .admin-login {
    max-width: 380px; margin: 60px auto;
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 36px;
  }
  .admin-login-title { font-family: var(--font-head); font-size: 26px; font-weight: 900; margin-bottom: 24px; text-align: center; }
  .stats-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 28px; }
  .stat-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 8px;
    padding: 16px; text-align: center;
  }
  .stat-val { font-family: var(--font-head); font-size: 32px; font-weight: 900; color: var(--blue-bright); }
  .stat-label { font-size: 12px; color: var(--muted); margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }
  .payments-table { width: 100%; border-collapse: collapse; }
  .payments-table th {
    font-family: var(--font-head); font-size: 12px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; color: var(--muted); padding: 10px 14px;
    border-bottom: 1px solid var(--border); text-align: left;
  }
  .payments-table td { padding: 13px 14px; border-bottom: 1px solid var(--border); font-size: 14px; }
  .payments-table tr:hover td { background: var(--surface2); }
  .status-badge {
    font-family: var(--font-head); font-size: 11px; font-weight: 700;
    letter-spacing: 1px; padding: 3px 10px; border-radius: 3px; text-transform: uppercase;
  }
  .status-pending  { background: #ffc94722; color: var(--gold); border: 1px solid var(--gold); }
  .status-approved { background: #1aff8c22; color: var(--green); border: 1px solid var(--green); }
  .status-rejected { background: #ff3d3d22; color: var(--red); border: 1px solid var(--red); }
  .filter-row { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
  .filter-btn {
    font-family: var(--font-head); font-size: 13px; font-weight: 700; letter-spacing: 1px;
    padding: 6px 16px; border-radius: 4px; border: 1px solid var(--border);
    background: none; color: var(--muted); cursor: pointer; transition: all .2s;
  }
  .filter-btn.active { background: var(--blue-glow); border-color: var(--blue); color: var(--blue-bright); }
  .actions-row { display: flex; gap: 8px; }
  select { font-family: var(--font-head); }
`;

// ─── PLAYER FLOW ──────────────────────────────────────────────────
function PlayerFlow({ addPayment }) {
  const [step, setStep] = useState(1);
  const [session, setSession] = useState(null);
  const [method, setMethod] = useState(null);
  const [discord, setDiscord] = useState("");
  const [duo, setDuo] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [done, setDone] = useState(false);

  const selectedSession = SESSIONS.find(s => s.id === session);
  const selectedMethod  = PAYMENT_METHODS.find(m => m.id === method);

  const submit = () => {
    if (!discord || !confirmed) return;
    addPayment({ session, discord: discord.trim(), duo: duo.trim(), method, price: selectedSession.price, status: "pending" });
    setDone(true);
  };

  const reset = () => { setStep(1); setSession(null); setMethod(null); setDiscord(""); setDuo(""); setConfirmed(false); setDone(false); };

  if (done) return (
    <div className="success-box">
      <div className="success-icon">✅</div>
      <div className="success-title">Betaling Ingediend!</div>
      <p className="success-sub">
        Je aanmelding voor <strong>{selectedSession?.name}</strong> is ontvangen.<br />
        Een admin controleert je betaling en geeft je spot vrij.<br />
        <span style={{ color: "var(--gold)" }}>Je ontvangt een bevestiging via Discord.</span>
      </p>
      <div style={{ marginTop: 28 }}>
        <button className="btn btn-secondary" onClick={reset}>Nieuwe Aanmelding</button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="steps">
        {[{ n: 1, l: "Sessie" }, { n: 2, l: "Betaling" }, { n: 3, l: "Bevestig" }].map(s => (
          <div key={s.n} className={`step ${step === s.n ? "active" : step > s.n ? "done" : ""}`}>
            <div className="step-num">{step > s.n ? "✓" : s.n}</div>
            {s.l}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <div className="section-title">Kies Sessie</div>
          <div className="section-sub">Selecteer de scrim sessie waarvoor je wil inschrijven</div>
          <div className="sessions-grid">
            {SESSIONS.map(s => (
              <div
                key={s.id}
                className={`session-card ${!s.active ? "disabled" : ""} ${session === s.id ? "selected" : ""}`}
                onClick={() => s.active && setSession(session === s.id ? null : s.id)}
              >
                <div>
                  <div className="session-name">{s.name}</div>
                  <div className="session-date">📅 {s.date}</div>
                  <div className="spots-bar" style={{ width: 180, marginTop: 10 }}>
                    <div className="spots-fill" style={{ width: `${(s.filled / s.spots) * 100}%` }} />
                  </div>
                </div>
                <div className="session-right">
                  {!s.active ? <div className="full-badge">VOLZET</div> : (
                    <>
                      <div className="session-price">€{s.price.toFixed(2)}</div>
                      <div className="session-spots">{s.spots - s.filled} / {s.spots} spots vrij</div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <button className="btn btn-primary" disabled={!session} onClick={() => setStep(2)}>Doorgaan →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="section-title">Betaalmethode</div>
          <div className="section-sub">Alle methodes zijn <strong style={{ color: "var(--green)" }}>100% fee-vrij</strong></div>
          <div className="methods-grid">
            {PAYMENT_METHODS.map(m => (
              <div key={m.id} className={`method-card ${method === m.id ? "selected" : ""}`} onClick={() => setMethod(m.id)}>
                <div className="method-icon">{m.icon}</div>
                <div className="method-label">{m.label}</div>
                <div className="method-badge">{m.badge}</div>
              </div>
            ))}
          </div>
          {method && (
            <div className="instructions-box">
              <div className="instructions-title">📋 Betaalinstructies — {selectedMethod.label}</div>
              {selectedMethod.instructions(selectedSession.price).map((line, i) => (
                <div key={i} className="instruction-row">
                  <span className="instruction-bullet">→</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn btn-secondary" onClick={() => setStep(1)}>← Terug</button>
            <button className="btn btn-primary" disabled={!method} onClick={() => setStep(3)}>Betaald →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="section-title">Bevestig Aanmelding</div>
          <div className="section-sub">Vul je gegevens in zodat de admin je betaling kan verifiëren</div>
          <div className="form-group">
            <label className="form-label">Discord Username *</label>
            <input className="form-input" placeholder="bijv. FragMaster#1234" value={discord} onChange={e => setDiscord(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Duo Partner Discord (optioneel)</label>
            <input className="form-input" placeholder="bijv. DuoKing#5678" value={duo} onChange={e => setDuo(e.target.value)} />
          </div>
          <div className="instructions-box" style={{ marginBottom: 20 }}>
            <div className="instructions-title">📋 Overzicht</div>
            <div className="instruction-row"><span className="instruction-bullet">→</span><span>Sessie: <strong>{selectedSession.name}</strong></span></div>
            <div className="instruction-row"><span className="instruction-bullet">→</span><span>Bedrag: <strong style={{ color: "var(--gold)" }}>€{selectedSession.price.toFixed(2)}</strong></span></div>
            <div className="instruction-row"><span className="instruction-bullet">→</span><span>Methode: <strong>{selectedMethod.label}</strong></span></div>
          </div>
          <div className="form-group" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input type="checkbox" id="conf" style={{ width: 18, height: 18, accentColor: "var(--blue)", cursor: "pointer" }}
              checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />
            <label htmlFor="conf" style={{ cursor: "pointer", fontSize: 14 }}>
              Ik heb de betaling van <strong style={{ color: "var(--gold)" }}>€{selectedSession.price.toFixed(2)}</strong> verstuurd via <strong>{selectedMethod.label}</strong>
            </label>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn btn-secondary" onClick={() => setStep(2)}>← Terug</button>
            <button className="btn btn-primary" disabled={!discord || !confirmed} onClick={submit}>✓ Aanmelding Insturen</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────
function AdminPanel({ payments, approve, reject }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [filter, setFilter] = useState("all");
  const [sessionFilter, setSessionFilter] = useState("all");
  const [pwErr, setPwErr] = useState(false);

  const login = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwErr(false); }
    else { setPwErr(true); setPw(""); }
  };

  if (!authed) return (
    <div className="admin-login">
      <div className="admin-login-title">🔐 Admin Login</div>
      <div className="form-group">
        <label className="form-label">Wachtwoord</label>
        <input
          className="form-input" type="password" placeholder="••••••••"
          value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          style={pwErr ? { borderColor: "var(--red)" } : {}}
        />
        {pwErr && <div style={{ color: "var(--red)", fontSize: 13, marginTop: 6 }}>Verkeerd wachtwoord</div>}
      </div>
      <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={login}>Inloggen</button>
    </div>
  );

  const filtered = payments
    .filter(p => filter === "all" || p.status === filter)
    .filter(p => sessionFilter === "all" || p.session === Number(sessionFilter));

  const pending  = payments.filter(p => p.status === "pending").length;
  const approved = payments.filter(p => p.status === "approved").length;
  const revenue  = payments.filter(p => p.status === "approved").reduce((a, p) => a + p.price, 0);

  return (
    <div>
      <div className="section-title">Admin Panel</div>
      <div className="section-sub">Beheer betalingen en bevestig inschrijvingen</div>
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-val" style={{ color: "var(--gold)" }}>{pending}</div>
          <div className="stat-label">In Behandeling</div>
        </div>
        <div className="stat-card">
          <div className="stat-val" style={{ color: "var(--green)" }}>{approved}</div>
          <div className="stat-label">Goedgekeurd</div>
        </div>
        <div className="stat-card">
          <div className="stat-val">€{revenue.toFixed(2)}</div>
          <div className="stat-label">Totaal Ontvangen</div>
        </div>
      </div>
      <div className="filter-row">
        {["all", "pending", "approved", "rejected"].map(f => (
          <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
            {f === "all" ? "Alles" : f === "pending" ? "In Behandeling" : f === "approved" ? "Goedgekeurd" : "Afgewezen"}
          </button>
        ))}
        <div style={{ borderLeft: "1px solid var(--border)", margin: "0 4px" }} />
        <select
          value={sessionFilter} onChange={e => setSessionFilter(e.target.value)}
          style={{
            background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)",
            borderRadius: 4, padding: "6px 12px", fontSize: 13, cursor: "pointer",
          }}
        >
          <option value="all">Alle Sessies</option>
          {SESSIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
        <table className="payments-table">
          <thead>
            <tr>
              <th>Discord</th><th>Sessie</th><th>Methode</th><th>Bedrag</th><th>Ingediend</th><th>Status</th><th>Acties</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--muted)", padding: 32 }}>Geen betalingen gevonden</td></tr>
            ) : filtered.map(p => (
              <tr key={p.id}>
                <td>
                  <strong>{p.discord}</strong>
                  {p.duo && <div style={{ fontSize: 12, color: "var(--muted)" }}>duo: {p.duo}</div>}
                </td>
                <td style={{ color: "var(--muted)" }}>{SESSIONS.find(s => s.id === p.session)?.name}</td>
                <td>{PAYMENT_METHODS.find(m => m.id === p.method)?.icon} {PAYMENT_METHODS.find(m => m.id === p.method)?.label}</td>
                <td style={{ color: "var(--gold)", fontWeight: 700 }}>€{p.price.toFixed(2)}</td>
                <td style={{ color: "var(--muted)", fontSize: 13 }}>{p.submitted}</td>
                <td><span className={`status-badge status-${p.status}`}>{p.status}</span></td>
                <td>
                  {p.status === "pending" && (
                    <div className="actions-row">
                      <button className="btn btn-sm btn-approve" onClick={() => approve(p.id)}>✓</button>
                      <button className="btn btn-sm btn-reject" onClick={() => reject(p.id)}>✗</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>
        ⚠️ Controleer altijd de betaling in je bank/PayPal/Tikkie app <strong>voordat</strong> je goedkeurt.
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("player");
  const { payments, approve, reject, add } = usePayments();

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <header className="header">
          <div className="logo">👑 PAY<span>TWO</span>WIN</div>
          <nav className="nav">
            <button className={`nav-btn ${tab === "player" ? "active" : ""}`} onClick={() => setTab("player")}>Inschrijven</button>
            <button className={`nav-btn ${tab === "admin" ? "active" : ""}`} onClick={() => setTab("admin")}>Admin</button>
          </nav>
        </header>
        <main className="main">
          {tab === "player"
            ? <PlayerFlow addPayment={add} />
            : <AdminPanel payments={payments} approve={approve} reject={reject} />
          }
        </main>
      </div>
    </>
  );
}
