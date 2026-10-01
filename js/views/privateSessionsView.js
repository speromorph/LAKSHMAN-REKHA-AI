/**
 * LAKSHMAN REKHA AI - Private Sessions & Private Life Mode View
 * Controls ephemeral conversation modes, isolates emotional/personal data,
 * and enables instantaneous cryptographic purge of temporary memory buffers.
 */

export function renderPrivateSessionsView(store, t) {
  const { isPrivateLifeMode, isIncognitoSession, privateMessages } = store.state;

  return `
    <div class="private-sessions-view animate-fade-in" style="max-width: 1000px; margin: 0 auto;">
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 1.5rem; margin-bottom: 6px; display: flex; align-items: center; gap: 10px;">
          <i data-lucide="eye-off" style="color: var(--status-safe);"></i>
          ${t.nav.privateSessions} & Private Life Mode 🔒
        </h2>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">
          Preserve your dignity, emotional reflections, and confidential deliberations away from corporate LLM memory banks.
        </p>
      </div>

      <!-- Mode Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 24px;">
        <!-- Card 1: Private Life Mode -->
        <div class="card" style="border: 1.5px solid ${isPrivateLifeMode ? 'var(--status-danger)' : 'var(--border-subtle)'}; background: ${isPrivateLifeMode ? 'rgba(244,63,94,0.06)' : 'var(--bg-surface)'};">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(244,63,94,0.15); color: var(--status-danger); display: flex; align-items: center; justify-content: center;">
                <i data-lucide="heart" style="width: 20px;"></i>
              </div>
              <div>
                <h3 style="font-size: 1.1rem; font-weight: 700;">Private Life Mode 🔒</h3>
                <span style="font-size: 0.72rem; color: var(--text-muted);">Family, Mental Health, Career</span>
              </div>
            </div>
            <button class="btn ${isPrivateLifeMode ? 'btn-danger' : 'btn-secondary'} btn-sm" id="btn-toggle-plm">
              ${isPrivateLifeMode ? 'Deactivate' : 'Activate Mode'}
            </button>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
            Designed for personal thoughts, relationships, and vulnerable inquiries. Suppresses permanent memory accretion and strips identifying vectors.
          </p>
          <div style="font-size: 0.76rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 4px;">
            <div>✓ Long-term memory extraction: <strong>BLOCKED</strong></div>
            <div>✓ AI Personalization training: <strong>DISABLED</strong></div>
            <div>✓ Processing tier: <strong style="color: var(--status-safe);">Local boundary first</strong></div>
          </div>
        </div>

        <!-- Card 2: Incognito AI Session -->
        <div class="card" style="border: 1.5px solid ${isIncognitoSession ? 'var(--accent-purple)' : 'var(--border-subtle)'}; background: ${isIncognitoSession ? 'rgba(139,92,246,0.06)' : 'var(--bg-surface)'};">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(139,92,246,0.15); color: var(--accent-purple); display: flex; align-items: center; justify-content: center;">
                <i data-lucide="glasses" style="width: 20px;"></i>
              </div>
              <div>
                <h3 style="font-size: 1.1rem; font-weight: 700;">Incognito AI Session</h3>
                <span style="font-size: 0.72rem; color: var(--text-muted);">Zero-Disk Ephemeral Chat</span>
              </div>
            </div>
            <button class="btn ${isIncognitoSession ? 'btn-danger' : 'btn-secondary'} btn-sm" id="btn-toggle-incog">
              ${isIncognitoSession ? 'End Session' : 'Start Incognito'}
            </button>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
            Nothing typed or spoken is stored into local storage or server databases. All buffers vanish upon closing.
          </p>
          <div style="font-size: 0.76rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 4px;">
            <div>✓ Persistent chat database: <strong>OFF</strong></div>
            <div>✓ Voice transcripts retained: <strong>NEVER</strong></div>
            <div>✓ Ephemeral buffer count: <strong>${privateMessages.length} messages</strong></div>
          </div>
        </div>
      </div>

      <!-- Processing Architecture Distinction -->
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <span class="card-title">
            <i data-lucide="cpu" style="color: var(--accent-cyan);"></i>
            Architectural Transparency: Local Processing vs External AI
          </span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div style="padding: 16px; background: rgba(16,185,129,0.06); border: 1px solid var(--status-safe-border); border-radius: var(--radius-md);">
            <div style="font-weight: 700; color: var(--status-safe); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <i data-lucide="shield-check" style="width: 16px;"></i>
              Local In-Browser Processing (Strictly Within Your Device)
            </div>
            <ul style="font-size: 0.82rem; color: var(--text-secondary); list-style: none; display: flex; flex-direction: column; gap: 6px;">
              <li>• PII entity detection and tokenization</li>
              <li>• Prompt injection and jailbreak pattern matching</li>
              <li>• Masking and scrubbing of API keys / passwords</li>
              <li>• Ephemeral memory buffer encryption</li>
            </ul>
          </div>

          <div style="padding: 16px; background: rgba(245,158,11,0.06); border: 1px solid var(--border-gold); border-radius: var(--radius-md);">
            <div style="font-weight: 700; color: var(--rekha-gold-light); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <i data-lucide="cloud" style="width: 16px;"></i>
              External AI Processing (Third-Party Cloud)
            </div>
            <ul style="font-size: 0.82rem; color: var(--text-secondary); list-style: none; display: flex; flex-direction: column; gap: 6px;">
              <li>• LLM inference on sanitized and minimized prompts</li>
              <li>• Zero raw PII transmitted beyond the boundary</li>
              <li>• Third-party telemetry headers stripped</li>
              <li>• Memory retention headers marked NO_TRAIN</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Action Purge Bar -->
      <div style="display: flex; justify-content: flex-end; gap: 12px;">
        <button class="btn btn-secondary" id="btn-switch-to-chat">
          <i data-lucide="message-square"></i>
          Open Private Chat
        </button>
        <button class="btn btn-danger" id="btn-purge-all-private">
          <i data-lucide="trash-2"></i>
          Cryptographically Purge Ephemeral Memory
        </button>
      </div>
    </div>
  `;
}
