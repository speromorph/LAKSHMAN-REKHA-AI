/**
 * LAKSHMAN REKHA AI - Settings & Enterprise Roadmap View
 * Configures strictness levels, language, AI providers (Mock/Gemini/OpenAI),
 * accessibility, and displays the 4-Phase Enterprise Governance Roadmap.
 */

export function renderSettingsView(store, t) {
  const { language, theme, highContrast, privacyStrictness } = store.state;

  return `
    <div class="settings-view animate-fade-in" style="max-width: 1000px; margin: 0 auto;">
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 1.5rem; margin-bottom: 6px; display: flex; align-items: center; gap: 10px;">
          <i data-lucide="settings" style="color: var(--rekha-gold-light);"></i>
          ${t.nav.settings} & Boundary Governance
        </h2>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">
          Tune perimeter strictness, AI provider keys, accessibility modes, and inspect enterprise roadmap.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- Strictness Policies -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">
              <i data-lucide="shield" style="color: var(--status-safe);"></i>
              Perimeter Strictness & Privacy Threshold
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <label for="setting-privacy-strictness" style="font-weight: 600; font-size: 0.88rem;">Privacy Enforcement Mode:</label>
              <select id="setting-privacy-strictness" style="background: var(--bg-secondary); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 10px 12px; color: var(--text-primary);">
                <option value="Standard" ${privacyStrictness === 'Standard' ? 'selected' : ''}>Standard (Warn on PII)</option>
                <option value="Strict" ${privacyStrictness === 'Strict' ? 'selected' : ''}>Strict (Auto-Redact All Secrets & IDs)</option>
                <option value="Maximum" ${privacyStrictness === 'Maximum' ? 'selected' : ''}>Maximum (Zero-Exfiltration & Minimal Fluff)</option>
              </select>
            </div>

            <div style="display: flex; flex-direction: column; gap: 6px;">
              <label for="setting-agent-enforcement" style="font-weight: 600; font-size: 0.88rem;">Agent Action Guard:</label>
              <select id="setting-agent-enforcement" style="background: var(--bg-secondary); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 10px 12px; color: var(--text-primary);">
                <option value="human_in_loop" selected>Human-in-the-Loop (Mandatory Approval)</option>
                <option value="read_only">Strict Sandbox (All External Actions Blocked)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- AI Provider Integration (Abstraction Layer) -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">
              <i data-lucide="cpu" style="color: var(--accent-cyan);"></i>
              Foundation AI Engine Configuration
            </span>
            <span class="badge badge-safe">MODULAR PROVIDER ABSTRACTION</span>
          </div>

          <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 16px;">
            Lakshman Rekha AI runs in <strong>Mock Demo Mode</strong> out-of-the-box for instant hackathon evaluation without requiring external API keys. You may optionally attach real Gemini or OpenAI credentials:
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <label for="setting-ai-provider" style="font-weight: 600; font-size: 0.86rem;">Active Engine:</label>
              <select id="setting-ai-provider" style="background: var(--bg-secondary); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 10px 12px; color: var(--text-primary);">
                <option value="mock" selected>Mock AI Engine (Offline Hackathon Mode)</option>
                <option value="gemini">Google Gemini 1.5 Flash</option>
                <option value="openai">OpenAI GPT-4o-mini</option>
              </select>
            </div>

            <div style="display: flex; flex-direction: column; gap: 6px;">
              <label for="setting-api-key" style="font-weight: 600; font-size: 0.86rem;">Optional API Key (Client-side, Never Logged):</label>
              <input type="password" id="setting-api-key" placeholder="AIza... or sk-..." style="background: var(--bg-secondary); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 10px 12px; color: var(--text-primary); font-family: monospace;" />
            </div>
          </div>
        </div>

        <!-- Display & Accessibility -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">
              <i data-lucide="palette" style="color: var(--rekha-gold-light);"></i>
              Accessibility & Localization
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <label for="setting-language-select" style="font-weight: 600; font-size: 0.86rem;">Interface Language:</label>
              <select id="setting-language-select" style="background: var(--bg-secondary); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 10px 12px; color: var(--text-primary);">
                <option value="en" ${language === 'en' ? 'selected' : ''}>English (US)</option>
                <option value="hi" ${language === 'hi' ? 'selected' : ''}>हिंदी (Hindi)</option>
              </select>
            </div>

            <div style="display: flex; flex-direction: column; gap: 6px;">
              <label style="font-weight: 600; font-size: 0.86rem;">Color Scheme:</label>
              <div style="display: flex; gap: 10px;">
                <button class="btn btn-secondary btn-sm" id="btn-toggle-theme-setting" style="flex: 1;">
                  Theme: ${theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
                <button class="btn btn-secondary btn-sm" id="btn-toggle-contrast-setting" style="flex: 1;">
                  Contrast: ${highContrast ? '⚡ High Contrast' : 'Standard'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 23: FUTURE ROADMAP -->
        <div class="card" style="border: 1px solid var(--border-gold);">
          <div class="card-header">
            <span class="card-title">
              <i data-lucide="map" style="color: var(--rekha-gold-light);"></i>
              Product Evolution & Enterprise Roadmap
            </span>
            <span class="status-pill active" style="font-size: 0.7rem;">VISION 2026-2027</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 8px;">
            <div style="padding: 14px; background: rgba(245,158,11,0.08); border: 1px solid var(--border-gold); border-radius: var(--radius-md);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="color: var(--rekha-gold-light);">Phase 1</strong>
                <span class="badge badge-safe">DELIVERED</span>
              </div>
              <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 4px;">Personal AI Security</div>
              <p style="font-size: 0.76rem; color: var(--text-secondary);">Prompt injection defense, PII redaction, bilingual filters, private sessions, voice assistant.</p>
            </div>

            <div style="padding: 14px; background: rgba(245,158,11,0.08); border: 1px solid var(--border-gold); border-radius: var(--radius-md);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="color: var(--rekha-gold-light);">Phase 2</strong>
                <span class="badge badge-safe">DELIVERED</span>
              </div>
              <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 4px;">AI Agent Security</div>
              <p style="font-size: 0.76rem; color: var(--text-secondary);">Autonomous action gatekeeper, WhatsApp message authorization, destructive command blocking.</p>
            </div>

            <div style="padding: 14px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="color: var(--accent-cyan);">Phase 3</strong>
                <span class="badge badge-medium">Q4 2026</span>
              </div>
              <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 4px;">Enterprise Governance</div>
              <p style="font-size: 0.76rem; color: var(--text-secondary);">Shadow AI discovery, central employee policy enforcement, SOC2 & GDPR automated compliance logs.</p>
            </div>

            <div style="padding: 14px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="color: var(--accent-purple);">Phase 4</strong>
                <span class="badge badge-low">2027</span>
              </div>
              <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 4px;">Cross-Platform Mesh</div>
              <p style="font-size: 0.76rem; color: var(--text-secondary);">Browser extension proxy, Slack & Teams bot perimeter, on-device local small language model (SLM) gateway.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
