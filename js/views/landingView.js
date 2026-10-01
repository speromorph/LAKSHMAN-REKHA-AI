/**
 * LAKSHMAN REKHA AI - Landing Page View
 * Introduces the digital protective boundary metaphor with the brand logo,
 * core value propositions, and live interactive boundary simulation.
 */

export function renderLandingView(store, t) {
  return `
    <div class="landing-page animate-fade-in" style="max-width: 1200px; margin: 0 auto; padding: 20px 0 60px 0;">
      <!-- Hero Section -->
      <section class="landing-hero" style="text-align: center; padding: 40px 20px 50px 20px; position: relative;">
        <div class="hero-logo-wrap" style="display: inline-block; position: relative; margin-bottom: 24px;">
          <div style="position: absolute; inset: -15px; border-radius: 50%; background: radial-gradient(circle, var(--rekha-gold-glow) 0%, transparent 70%); filter: blur(10px); animation: rekhaPulse 4s infinite;"></div>
          <img src="assets/logo.png" alt="Lakshman Rekha AI Brand Logo" style="width: 150px; height: 150px; border-radius: 24px; position: relative; z-index: 2; box-shadow: 0 12px 35px rgba(0,0,0,0.6); border: 2px solid var(--border-gold);" />
        </div>

        <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: var(--radius-full); background: var(--rekha-gold-subtle); border: 1px solid var(--border-gold); color: var(--rekha-gold-light); font-size: 0.85rem; font-weight: 700; margin-bottom: 18px; text-transform: uppercase; letter-spacing: 0.06em;">
          <span class="status-pulse-dot"></span>
          ${t.brand.tagline}
        </div>

        <h1 style="font-size: clamp(2.4rem, 5vw, 3.8rem); line-height: 1.15; font-weight: 800; margin-bottom: 20px; background: linear-gradient(135deg, #ffffff 40%, var(--rekha-gold-light) 80%, var(--accent-cyan) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          ${t.brand.name}
        </h1>

        <p style="font-size: clamp(1.1rem, 2vw, 1.35rem); color: var(--text-secondary); max-width: 780px; margin: 0 auto 32px auto; line-height: 1.6;">
          "${t.brand.statement}"
        </p>

        <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; margin-bottom: 48px;">
          <button class="btn btn-primary" id="btn-hero-launch" style="padding: 14px 28px; font-size: 1rem; border-radius: var(--radius-lg);">
            <i data-lucide="shield-check"></i>
            Launch Security Console
          </button>
          <button class="btn btn-secondary" id="btn-hero-demo" style="padding: 14px 26px; font-size: 1rem; border-radius: var(--radius-lg);">
            <i data-lucide="play-circle"></i>
            Experience Guided Demo (2 Min)
          </button>
        </div>

        <!-- Central Metaphor Visual Card -->
        <div style="background: linear-gradient(135deg, rgba(16,28,51,0.95), rgba(8,13,24,0.98)); border: 2px solid var(--border-gold); border-radius: var(--radius-xl); padding: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.6), 0 0 35px var(--rekha-gold-glow); max-width: 900px; margin: 0 auto; text-align: left; position: relative; overflow: hidden;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 1.6rem;">🛡️</span>
              <div>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--rekha-gold-light);">${t.boundary.title}</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted);">${t.boundary.subtitle}</p>
              </div>
            </div>
            <span class="badge badge-safe" style="padding: 6px 14px; font-size: 0.8rem;">PERIMETER ENFORCED</span>
          </div>

          <!-- Conceptual Architecture Flow Diagram -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; text-align: center;">
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 8px;">
              <div style="font-size: 1.2rem; margin-bottom: 4px;">👤</div>
              <div style="font-size: 0.78rem; font-weight: 700;">USER INPUT</div>
              <div style="font-size: 0.68rem; color: var(--text-muted);">Unfiltered Text</div>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; color: var(--rekha-gold); font-weight: 800;">➔</div>
            <div style="background: rgba(245,158,11,0.08); border: 1.5px solid var(--border-gold); border-radius: var(--radius-md); padding: 12px 8px; box-shadow: 0 0 15px var(--rekha-gold-glow);">
              <div style="font-size: 1.2rem; margin-bottom: 4px;">🛡️</div>
              <div style="font-size: 0.78rem; font-weight: 800; color: var(--rekha-gold-light);">LAKSHMAN REKHA</div>
              <div style="font-size: 0.68rem; color: var(--status-safe);">Inspection & Shield</div>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; color: var(--rekha-gold); font-weight: 800;">➔</div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 8px;">
              <div style="font-size: 1.2rem; margin-bottom: 4px;">✨</div>
              <div style="font-size: 0.78rem; font-weight: 700;">SANITIZED AI</div>
              <div style="font-size: 0.68rem; color: var(--text-muted);">Privacy Minimized</div>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; color: var(--rekha-gold); font-weight: 800;">➔</div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 8px;">
              <div style="font-size: 1.2rem; margin-bottom: 4px;">✅</div>
              <div style="font-size: 0.78rem; font-weight: 700;">VERIFIED SAFE</div>
              <div style="font-size: 0.68rem; color: var(--status-safe);">Human Controlled</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3 Core Pillars -->
      <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-top: 40px; padding: 0 20px;">
        <!-- Card 1: Security -->
        <div class="card" style="border-top: 3px solid var(--status-danger);">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(244,63,94,0.15); display: flex; align-items: center; justify-content: center; color: var(--status-danger); margin-bottom: 16px;">
            <i data-lucide="shield-alert" style="width: 24px; height: 24px;"></i>
          </div>
          <h3 style="font-size: 1.2rem; margin-bottom: 10px;">Adversarial Security</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 16px;">
            Detects and blocks prompt injections, jailbreaks, malicious tool invocations, and unauthorized exfiltration in English and Hindi.
          </p>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.82rem; color: var(--text-muted);">
            <li>✓ Prompt Injection Neutralizer</li>
            <li>✓ Bilingual (English & Hindi) Shield</li>
            <li>✓ Zero-Exfiltration Guarantee</li>
          </ul>
        </div>

        <!-- Card 2: Privacy -->
        <div class="card" style="border-top: 3px solid var(--accent-cyan);">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(6,182,212,0.15); display: flex; align-items: center; justify-content: center; color: var(--accent-cyan); margin-bottom: 16px;">
            <i data-lucide="lock" style="width: 24px; height: 24px;"></i>
          </div>
          <h3 style="font-size: 1.2rem; margin-bottom: 10px;">Zero-Leak Privacy</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 16px;">
            Interprets PII, Aadhaar, PAN, phone numbers, and secrets like API keys. Automatically redacts or minimizes data before third-party transmission.
          </p>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.82rem; color: var(--text-muted);">
            <li>✓ Autonomous Token Redaction</li>
            <li>✓ Context Minimization Engine</li>
            <li>✓ Private Life Mode & Incognito</li>
          </ul>
        </div>

        <!-- Card 3: Trust & Control -->
        <div class="card" style="border-top: 3px solid var(--rekha-gold);">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: var(--rekha-gold-subtle); display: flex; align-items: center; justify-content: center; color: var(--rekha-gold-light); margin-bottom: 16px;">
            <i data-lucide="check-check" style="width: 24px; height: 24px;"></i>
          </div>
          <h3 style="font-size: 1.2rem; margin-bottom: 10px;">Trust & Agent Gateway</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 16px;">
            Fact-checks AI responses, flags hallucinations with evidence, and enforces strict human approval before AI agents send messages or delete files.
          </p>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.82rem; color: var(--text-muted);">
            <li>✓ Transparent Trust Scoring</li>
            <li>✓ AI Agent Permission Gateway</li>
            <li>✓ Secure WhatsApp Confirmation</li>
          </ul>
        </div>
      </section>
    </div>
  `;
}
