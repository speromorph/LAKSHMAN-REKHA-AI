/**
 * LAKSHMAN REKHA AI - Chat View
 * The secure AI conversation portal featuring pre-scan pipeline visualization,
 * data minimization suggestions, Private Life Mode banner, and voice I/O.
 */

export function renderChatView(store, t) {
  const { isIncognitoSession, isPrivateLifeMode, chatMessages, privateMessages } = store.state;
  const messages = isIncognitoSession ? privateMessages : chatMessages;

  return `
    <div class="chat-layout animate-fade-in">
      <!-- Top Protection Status Bar -->
      <div class="chat-banner">
        <div class="chat-shield-indicators">
          <div class="chat-shield-tag">
            <i data-lucide="shield-check" style="color: var(--status-safe); width: 16px;"></i>
            <span>${t.nav.securityScanner}: <strong style="color: var(--status-safe);">Active</strong></span>
          </div>
          <div class="chat-shield-tag">
            <i data-lucide="lock" style="color: var(--accent-cyan); width: 16px;"></i>
            <span>${t.nav.privacyShield}: <strong style="color: var(--accent-cyan);">Zero-Leak</strong></span>
          </div>
          <div class="chat-shield-tag">
            <i data-lucide="check-check" style="color: var(--rekha-gold-light); width: 16px;"></i>
            <span>${t.nav.trustCenter}: <strong style="color: var(--rekha-gold-light);">Claim Verifier On</strong></span>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 8px;">
          <button class="toggle-btn ${isPrivateLifeMode ? 'active' : ''}" id="btn-toggle-private-life" title="Private Life Mode for emotional, family or career conversations">
            <i data-lucide="heart" style="width: 14px;"></i>
            Private Life Mode
          </button>
          <button class="toggle-btn ${isIncognitoSession ? 'active' : ''}" id="btn-toggle-incognito" title="Incognito: No history or memory preserved">
            <i data-lucide="glasses" style="width: 14px;"></i>
            Incognito Session
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-clear-chat" title="Clear current messages">
            <i data-lucide="trash-2" style="width: 14px;"></i>
            Clear
          </button>
        </div>
      </div>

      <!-- Incognito / Private Session Banner if active -->
      ${isIncognitoSession ? `
        <div style="background: rgba(139, 92, 246, 0.18); border-bottom: 1px solid rgba(139, 92, 246, 0.4); padding: 8px 20px; display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; color: #e9d5ff;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <i data-lucide="glasses" style="width: 16px;"></i>
            <span>${t.chat.incognitoBanner}</span>
          </div>
          <button class="btn btn-danger btn-sm" id="btn-end-incognito" style="padding: 2px 8px; font-size: 0.72rem;">End Private Session</button>
        </div>
      ` : ''}

      <!-- Private Life Mode Notice -->
      ${isPrivateLifeMode && !isIncognitoSession ? `
        <div style="background: rgba(244, 63, 94, 0.12); border-bottom: 1px solid rgba(244, 63, 94, 0.3); padding: 8px 20px; display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: #fecdd3;">
          <i data-lucide="heart-handshake" style="width: 16px; color: var(--status-danger);"></i>
          <span><strong>PRIVATE LIFE MODE ACTIVE:</strong> Conversations regarding personal, family, or career dilemmas are isolated from persistent app memory.</span>
        </div>
      ` : ''}

      <!-- Messages Thread -->
      <div class="chat-messages" id="chat-messages-container">
        ${messages.map(msg => `
          <div class="message-bubble ${msg.role}">
            <div class="message-card">
              ${msg.scanMeta?.redactedNotice ? `
                <div style="margin-bottom: 8px; padding: 6px 10px; background: rgba(139, 92, 246, 0.15); border-radius: var(--radius-sm); border: 1px solid rgba(139, 92, 246, 0.3); font-size: 0.75rem; color: #c4b5fd;">
                  🛡️ Lakshman Rekha Sanitized Input: ${msg.scanMeta.redactionsCount} sensitive items masked.
                </div>
              ` : ''}
              
              <div class="message-text">${msg.content}</div>

              <!-- Trust Evidence Badge for AI responses -->
              ${msg.trustReport ? `
                <div style="margin-top: 10px; padding: 8px 12px; background: rgba(0,0,0,0.25); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <i data-lucide="check-circle" style="color: var(--status-safe); width: 14px;"></i>
                    <span>Trust Assessment: <strong>${msg.trustReport.trustScore}/100</strong> (${msg.trustReport.supportedCount} verified claims)</span>
                  </div>
                  <button class="btn btn-secondary btn-sm btn-inspect-trust" data-report='${JSON.stringify(msg.trustReport).replace(/'/g, "&apos;")}' style="padding: 2px 8px; font-size: 0.7rem;">
                    Inspect Evidence
                  </button>
                </div>
              ` : ''}
            </div>
            <div class="message-meta">
              <span>${msg.role === 'user' ? 'You' : 'Lakshman Rekha AI'}</span>
              <span>•</span>
              <span>${msg.timestamp}</span>
              ${msg.role === 'ai' ? `
                <button class="btn-tts-speak" data-text="${encodeURIComponent(msg.content)}" style="background: none; border: none; color: var(--text-muted); cursor: pointer; display: inline-flex; align-items: center;" title="Listen via Text-to-Speech">
                  <i data-lucide="volume-2" style="width: 13px;"></i>
                </button>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Interactive Pre-Scan Inspection Drawer (when scan detects issues) -->
      <div id="chat-prescan-drawer" style="display: none; padding: 12px 20px; background: rgba(16, 28, 51, 0.95); border-top: 1px solid var(--border-gold);"></div>

      <!-- Input Bar -->
      <div class="chat-input-container">
        <div class="chat-input-box">
          <textarea class="chat-textarea" id="chat-input-textarea" placeholder="${t.chat.placeholder}" rows="1"></textarea>
          
          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="btn-header" id="btn-voice-input" title="Voice Input (Speech-to-Text)" style="padding: 8px;">
              <i data-lucide="mic" style="width: 18px;"></i>
            </button>
            <button class="btn btn-primary" id="btn-send-chat" style="padding: 8px 16px;">
              <i data-lucide="send" style="width: 16px;"></i>
              <span>Send</span>
            </button>
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.74rem; color: var(--text-muted); padding: 0 4px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span>🛡️ Pipeline: Language Detect ➔ Security ➔ PII Filter ➔ Minimizer ➔ LLM</span>
          </div>
          <div id="voice-status-indicator" style="display: none; color: var(--rekha-gold-light); font-weight: 600;">
            🎙️ Listening to voice... Speak now
          </div>
        </div>
      </div>
    </div>
  `;
}
