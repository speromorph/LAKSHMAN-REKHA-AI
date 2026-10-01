/**
 * LAKSHMAN REKHA AI - Main Security & Trust Dashboard View
 * Displays high-level perimeter telemetry, Trust & Safety scores,
 * the central Lakshman Rekha Active Boundary Card, and recent audit activity.
 */

export function renderDashboardView(store, t) {
  const { metrics, auditLogs } = store.state;

  return `
    <div class="dashboard-view animate-fade-in">
      <!-- Section 9: THE LAKSHMAN REKHA - CORE BRAND COMPONENT -->
      <div class="rekha-boundary-card rekha-boundary-glow">
        <div class="rekha-boundary-header">
          <div class="rekha-title-group">
            <div class="rekha-shield-icon">
              <i data-lucide="shield"></i>
            </div>
            <div class="rekha-title-text">
              <h3>
                ${t.boundary.title}
                <span class="status-pill active" style="font-size: 0.72rem;">ACTIVE ENFORCEMENT</span>
              </h3>
              <p>${t.boundary.subtitle}</p>
            </div>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <button class="btn btn-demo" id="btn-quick-demo">
              <i data-lucide="play-circle"></i>
              ${t.actions.startDemo}
            </button>
          </div>
        </div>

        <div class="rekha-boundary-grid">
          <div class="rekha-metric-box">
            <span class="rekha-metric-label">${t.boundary.entering}</span>
            <div class="rekha-metric-value" style="color: var(--status-safe);">
              <i data-lucide="shield-check" style="width: 22px;"></i>
              SAFE
            </div>
            <span class="rekha-metric-status" style="color: var(--status-safe);">Adversarial Filters Active</span>
          </div>

          <div class="rekha-metric-box">
            <span class="rekha-metric-label">${t.boundary.privateInfo}</span>
            <div class="rekha-metric-value" style="color: var(--rekha-gold-light);">
              <i data-lucide="lock" style="width: 22px;"></i>
              ${metrics.piiProtected}
            </div>
            <span class="rekha-metric-status" style="color: var(--rekha-gold-light);">PII & Secrets Shielded</span>
          </div>

          <div class="rekha-metric-box">
            <span class="rekha-metric-label">${t.boundary.externalSharing}</span>
            <div class="rekha-metric-value" style="color: var(--accent-cyan);">
              <i data-lucide="minimize-2" style="width: 22px;"></i>
              MINIMIZED
            </div>
            <span class="rekha-metric-status" style="color: var(--accent-cyan);">Context Pruned Before LLM</span>
          </div>

          <div class="rekha-metric-box">
            <span class="rekha-metric-label">${t.boundary.agentRequests}</span>
            <div class="rekha-metric-value" style="color: var(--status-warn);">
              <i data-lucide="user-check" style="width: 22px;"></i>
              ${metrics.agentActionsBlocked} Gated
            </div>
            <span class="rekha-metric-status" style="color: var(--status-warn);">Zero Silent Execution</span>
          </div>
        </div>
      </div>

      <!-- Trust & Safety Score Dashboard Grid -->
      <div class="score-cards-grid">
        <!-- Security Score -->
        <div class="score-card">
          <div class="score-card-header">
            <span class="score-card-title">${t.scores.security}</span>
            <div class="score-badge-circle" style="background: rgba(16,185,129,0.15); color: var(--status-safe);">
              <i data-lucide="shield-alert" style="width: 18px;"></i>
            </div>
          </div>
          <div class="score-main">
            <span class="score-number" style="color: var(--status-safe);">${metrics.securityScore}</span>
            <span class="score-total">/100</span>
          </div>
          <div class="score-progress-bar">
            <div class="score-progress-fill" style="width: ${metrics.securityScore}%; background: var(--status-safe);"></div>
          </div>
          <div class="score-footer-text">
            <span>Threats Blocked:</span>
            <strong style="color: var(--text-primary);">${metrics.threatsBlocked}</strong>
          </div>
        </div>

        <!-- Privacy Score -->
        <div class="score-card">
          <div class="score-card-header">
            <span class="score-card-title">${t.scores.privacy}</span>
            <div class="score-badge-circle" style="background: rgba(6,182,212,0.15); color: var(--accent-cyan);">
              <i data-lucide="eye-off" style="width: 18px;"></i>
            </div>
          </div>
          <div class="score-main">
            <span class="score-number" style="color: var(--accent-cyan);">${metrics.privacyScore}</span>
            <span class="score-total">/100</span>
          </div>
          <div class="score-progress-bar">
            <div class="score-progress-fill" style="width: ${metrics.privacyScore}%; background: var(--accent-cyan);"></div>
          </div>
          <div class="score-footer-text">
            <span>PII Redacted:</span>
            <strong style="color: var(--text-primary);">${metrics.piiProtected}</strong>
          </div>
        </div>

        <!-- AI Trust Score -->
        <div class="score-card">
          <div class="score-card-header">
            <span class="score-card-title">${t.scores.trust}</span>
            <div class="score-badge-circle" style="background: rgba(245,158,11,0.15); color: var(--rekha-gold-light);">
              <i data-lucide="check-circle" style="width: 18px;"></i>
            </div>
          </div>
          <div class="score-main">
            <span class="score-number" style="color: var(--rekha-gold-light);">${metrics.aiTrustScore}</span>
            <span class="score-total">/100</span>
          </div>
          <div class="score-progress-bar">
            <div class="score-progress-fill" style="width: ${metrics.aiTrustScore}%; background: var(--rekha-gold);"></div>
          </div>
          <div class="score-footer-text">
            <span>Claims Verified:</span>
            <strong style="color: var(--text-primary);">${metrics.claimsChecked}</strong>
          </div>
        </div>

        <!-- Agent Safety Score -->
        <div class="score-card">
          <div class="score-card-header">
            <span class="score-card-title">${t.scores.agentSafety}</span>
            <div class="score-badge-circle" style="background: rgba(139,92,246,0.15); color: var(--accent-purple);">
              <i data-lucide="git-pull-request" style="width: 18px;"></i>
            </div>
          </div>
          <div class="score-main">
            <span class="score-number" style="color: var(--accent-purple);">${metrics.agentSafetyScore}</span>
            <span class="score-total">/100</span>
          </div>
          <div class="score-progress-bar">
            <div class="score-progress-fill" style="width: ${metrics.agentSafetyScore}%; background: var(--accent-purple);"></div>
          </div>
          <div class="score-footer-text">
            <span>Actions Gatekept:</span>
            <strong style="color: var(--text-primary);">${metrics.messagesReviewed + metrics.agentActionsBlocked}</strong>
          </div>
        </div>
      </div>

      <!-- Quick Inspection Action Bar -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 18px 24px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-weight: 700; font-size: 0.95rem;">⚡ Quick Interactive Audits:</span>
          <span style="color: var(--text-muted); font-size: 0.85rem;">Test real-time defensive checks</span>
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn btn-secondary btn-sm" id="btn-quick-injection">
            <i data-lucide="zap" style="color: var(--status-danger);"></i>
            Test Prompt Injection
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-quick-pii">
            <i data-lucide="lock" style="color: var(--accent-cyan);"></i>
            Test PII / Key Redaction
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-quick-agent">
            <i data-lucide="message-square" style="color: var(--status-safe);"></i>
            Test Agent WhatsApp Gate
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-quick-code">
            <i data-lucide="code" style="color: var(--rekha-gold-light);"></i>
            Audit Code Security
          </button>
        </div>
      </div>

      <!-- Activity & Threat Stream -->
      <div class="dashboard-columns">
        <!-- Live Audit Activity -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">
              <i data-lucide="activity" style="color: var(--rekha-gold);"></i>
              Live Perimeter Event Log
            </span>
            <button class="btn btn-secondary btn-sm" id="btn-view-all-activity">View Full Log</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${auditLogs.slice(0, 5).map(log => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: rgba(0,0,0,0.18); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span class="badge ${
                    log.severity === 'CRITICAL' ? 'badge-critical' :
                    log.severity === 'HIGH' ? 'badge-high' :
                    log.severity === 'MEDIUM' ? 'badge-medium' :
                    log.severity === 'SAFE' ? 'badge-safe' : 'badge-low'
                  }">${log.severity}</span>
                  <div>
                    <div style="font-weight: 600; font-size: 0.88rem;">${log.summary}</div>
                    <div style="font-size: 0.74rem; color: var(--text-muted);">${log.type} • Status: <span style="color: var(--rekha-gold-light);">${log.status}</span></div>
                  </div>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">${log.time}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Perimeter Control Policy Overview -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">
              <i data-lucide="sliders" style="color: var(--accent-cyan);"></i>
              Boundary Enforcement
            </span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="padding: 12px; background: rgba(255,255,255,0.02); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: 0.85rem; font-weight: 600;">Data Minimization</span>
                <span class="badge badge-safe">ACTIVE</span>
              </div>
              <p style="font-size: 0.76rem; color: var(--text-muted);">Biographical metadata stripped before reaching external LLMs.</p>
            </div>

            <div style="padding: 12px; background: rgba(255,255,255,0.02); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: 0.85rem; font-weight: 600;">Secret & Key Vaulting</span>
                <span class="badge badge-safe">ACTIVE</span>
              </div>
              <p style="font-size: 0.76rem; color: var(--text-muted);">OpenAI, AWS, and passwords masked into [API_KEY] tokens.</p>
            </div>

            <div style="padding: 12px; background: rgba(255,255,255,0.02); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: 0.85rem; font-weight: 600;">Agent Consequential Guard</span>
                <span class="badge badge-safe">STRICT</span>
              </div>
              <p style="font-size: 0.76rem; color: var(--text-muted);">File deletion and WhatsApp sending blocked without modal confirmation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
