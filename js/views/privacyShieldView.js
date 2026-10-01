/**
 * LAKSHMAN REKHA AI - Privacy Shield View
 * Features real-time PII and secret detection, autonomous token redaction,
 * and the "Where Your Data Goes" boundary architecture visualizer.
 */

export function renderPrivacyShieldView(store, t) {
  return `
    <div class="privacy-shield-view animate-fade-in" style="max-width: 1000px; margin: 0 auto;">
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 1.5rem; margin-bottom: 6px; display: flex; align-items: center; gap: 10px;">
          <i data-lucide="lock" style="color: var(--accent-cyan);"></i>
          ${t.nav.privacyShield} & Redaction Engine
        </h2>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">
          Intercept personally identifiable information (PII) and secret credentials before external transmission.
        </p>
      </div>

      <!-- Section 29: "WHERE YOUR DATA GOES" Boundary Architecture Visualizer -->
      <div class="card" style="margin-bottom: 24px; border: 1.5px solid var(--border-gold); background: linear-gradient(135deg, rgba(16,28,51,0.95), rgba(8,13,24,0.98));">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <h3 style="font-size: 1.05rem; color: var(--rekha-gold-light); display: flex; align-items: center; gap: 8px;">
            <i data-lucide="git-commit"></i>
            Where Your Data Goes: The Lakshman Rekha Boundary
          </h3>
          <span class="badge badge-safe">ZERO-EXFILTRATION</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; align-items: center; text-align: center;">
          <div style="padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
            <div style="font-size: 1.3rem;">👤</div>
            <div style="font-weight: 700; font-size: 0.8rem;">USER</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Names, Keys, PII</div>
          </div>
          <div style="color: var(--rekha-gold); font-size: 1.2rem; font-weight: 800;">➔</div>
          
          <div style="padding: 12px; background: rgba(245,158,11,0.12); border: 1.5px solid var(--border-gold); border-radius: var(--radius-md); box-shadow: 0 0 15px var(--rekha-gold-glow);">
            <div style="font-size: 1.3rem;">🛡️</div>
            <div style="font-weight: 800; font-size: 0.82rem; color: var(--rekha-gold-light);">LAKSHMAN REKHA</div>
            <div style="font-size: 0.68rem; color: var(--status-safe);">PII Intercepted</div>
          </div>
          <div style="color: var(--rekha-gold); font-size: 1.2rem; font-weight: 800;">➔</div>

          <div style="padding: 12px; background: rgba(16,185,129,0.08); border: 1px solid var(--status-safe-border); border-radius: var(--radius-md);">
            <div style="font-size: 1.3rem;">💻</div>
            <div style="font-weight: 700; font-size: 0.8rem; color: var(--status-safe);">LOCAL PROCESSING</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Masking & Tokens</div>
          </div>
          <div style="color: var(--rekha-gold); font-size: 1.2rem; font-weight: 800;">➔</div>

          <div style="padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
            <div style="font-size: 1.3rem;">☁️</div>
            <div style="font-weight: 700; font-size: 0.8rem;">EXTERNAL AI</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">Only [TOKENS] Sent</div>
          </div>
        </div>
      </div>

      <!-- Presets for Testing -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 16px 20px; margin-bottom: 20px;">
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 10px; text-transform: uppercase;">
          ⚡ Load Sensitive Data Presets:
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-secondary btn-sm btn-priv-preset" data-text="Rahul Sharma's email is rahul@gmail.com and his phone is +91 9876543210.">
            👤 Name + Email + Phone
          </button>
          <button class="btn btn-secondary btn-sm btn-priv-preset" data-text="OpenAI API key: sk-live99438290124810294812 and password: SuperSecretPass123">
            🔑 API Key + Password
          </button>
          <button class="btn btn-secondary btn-sm btn-priv-preset" data-text="Customer Aadhaar card is 5432 9876 1234, PAN card ABCDE1234F, UPI id rahul@okaxis">
            🇮🇳 Indian Govt IDs & UPI
          </button>
          <button class="btn btn-secondary btn-sm btn-priv-preset" data-text="My name is Rahul Sharma, I live in Mumbai and I'm an engineering student. My professor gave me this assignment. Explain recursion.">
            📉 Data Minimization Example
          </button>
        </div>
      </div>

      <!-- Input Card -->
      <div class="card" style="margin-bottom: 24px;">
        <label for="priv-input-text" style="display: block; font-weight: 600; font-size: 0.88rem; margin-bottom: 8px;">
          Input Text Containing Sensitive Details:
        </label>
        <textarea id="priv-input-text" rows="4" style="width: 100%; background: var(--bg-secondary); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 12px 16px; color: var(--text-primary); font-size: 0.95rem; resize: vertical; outline: none; margin-bottom: 16px;" placeholder="Enter or paste text with personal details, passwords, or credentials..."></textarea>
        
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="btn btn-secondary" id="btn-priv-clear">Clear</button>
          <button class="btn btn-primary" id="btn-priv-run">
            <i data-lucide="shield-check"></i>
            Detect & Redact Sensitive Entities
          </button>
        </div>
      </div>

      <!-- Privacy Results Container -->
      <div id="priv-results-container" style="display: none;"></div>
    </div>
  `;
}
