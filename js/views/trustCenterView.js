/**
 * LAKSHMAN REKHA AI - Trust Center View
 * Provides transparent verification of factual statements, evaluates confidence,
 * detects potential hallucinations, and displays corroborating evidence.
 */

export function renderTrustCenterView(store, t) {
  return `
    <div class="trust-center-view animate-fade-in" style="max-width: 1000px; margin: 0 auto;">
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 1.5rem; margin-bottom: 6px; display: flex; align-items: center; gap: 10px;">
          <i data-lucide="check-check" style="color: var(--rekha-gold-light);"></i>
          ${t.nav.trustCenter} & Factual Verifier
        </h2>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">
          Cross-examine AI output against known ground truths to detect hallucinations and unsupported assertions.
        </p>
      </div>

      <!-- Presets -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 16px 20px; margin-bottom: 20px;">
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 10px; text-transform: uppercase;">
          ⚡ Load Sample AI Responses for Audit:
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-secondary btn-sm btn-trust-preset" data-text="The Eiffel Tower was completed in 1889 for the Exposition Universelle. Studies show that 100% of Parisian architects supported it from day one without opposition.">
            ⚠️ Mixed Factual & Absolute Claim
          </button>
          <button class="btn btn-secondary btn-sm btn-trust-preset" data-text="RSA encryption relies on the computational difficulty of factoring the product of two large prime numbers. It was publicly described in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman.">
            ✅ Verified Technical Fact
          </button>
          <button class="btn btn-secondary btn-sm btn-trust-preset" data-text="New quantum breakthrough completely guarantees unhackable encryption across all consumer devices by tomorrow morning.">
            🚨 Hallucination / Exaggeration
          </button>
        </div>
      </div>

      <!-- Input Card -->
      <div class="card" style="margin-bottom: 24px;">
        <label for="trust-input-text" style="display: block; font-weight: 600; font-size: 0.88rem; margin-bottom: 8px;">
          AI Output Text to Fact-Check:
        </label>
        <textarea id="trust-input-text" rows="4" style="width: 100%; background: var(--bg-secondary); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 12px 16px; color: var(--text-primary); font-size: 0.95rem; resize: vertical; outline: none; margin-bottom: 16px;" placeholder="Paste an AI-generated paragraph or factual claim to verify..."></textarea>
        
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="btn btn-secondary" id="btn-trust-clear">Clear</button>
          <button class="btn btn-primary" id="btn-trust-run">
            <i data-lucide="check-circle"></i>
            Evaluate Trust & Verify Claims
          </button>
        </div>
      </div>

      <!-- Results Container -->
      <div id="trust-results-container" style="display: none;"></div>
    </div>
  `;
}
