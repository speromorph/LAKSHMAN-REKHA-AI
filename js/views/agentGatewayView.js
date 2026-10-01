/**
 * LAKSHMAN REKHA AI - AI Agent Permission Gateway View
 * Establishes human-in-the-loop control over autonomous AI agents.
 * Prohibits silent execution of consequential or irreversible actions.
 */

export function renderAgentGatewayView(store, t) {
  return `
    <div class="agent-gateway-view animate-fade-in" style="max-width: 1050px; margin: 0 auto;">
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 1.5rem; margin-bottom: 6px; display: flex; align-items: center; gap: 10px;">
          <i data-lucide="git-pull-request" style="color: var(--status-warn);"></i>
          ${t.nav.agentGateway} Permission Gateway
        </h2>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">
          Autonomous AI agents cannot silently take action. Lakshman Rekha enforces policy bounds and explicit human authorization.
        </p>
      </div>

      <!-- Simulation Action Triggers -->
      <div class="card" style="margin-bottom: 24px; border: 1px solid var(--border-gold);">
        <div class="card-header">
          <span class="card-title">
            <i data-lucide="play" style="color: var(--rekha-gold);"></i>
            Simulate Autonomous Agent Action Requests
          </span>
          <span class="badge badge-safe">INTERACTIVE HACKATHON DEMOS</span>
        </div>
        <p style="font-size: 0.84rem; color: var(--text-muted); margin-bottom: 16px;">
          Click any action below to witness how the Lakshman Rekha boundary halts autonomous agents and requires human consent:
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
          <button class="btn btn-secondary btn-trigger-agent-action" data-action="send_whatsapp_message" data-target="Rahul (Colleague)" data-msg="I will be 10 minutes late to our meeting." style="justify-content: flex-start; text-align: left; padding: 12px 14px;">
            <div>
              <div style="font-weight: 700; color: var(--rekha-gold-light); font-size: 0.86rem;">📲 Send WhatsApp Message</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">Risk: MEDIUM • Gate: ASK HUMAN</div>
            </div>
          </button>

          <button class="btn btn-secondary btn-trigger-agent-action" data-action="delete_file" data-target="/var/data/users_backup.sql" data-msg="Executing database file cleanup." style="justify-content: flex-start; text-align: left; padding: 12px 14px;">
            <div>
              <div style="font-weight: 700; color: var(--status-danger); font-size: 0.86rem;">🗑️ Delete Backup File</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">Risk: CRITICAL • Gate: HARD BLOCK</div>
            </div>
          </button>

          <button class="btn btn-secondary btn-trigger-agent-action" data-action="financial_transaction" data-target="Payment Gateway UPI" data-msg="Transfer ₹5,000 to vendor account." style="justify-content: flex-start; text-align: left; padding: 12px 14px;">
            <div>
              <div style="font-weight: 700; color: var(--status-danger); font-size: 0.86rem;">💳 Financial Transaction</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">Risk: CRITICAL • Gate: HARD BLOCK</div>
            </div>
          </button>

          <button class="btn btn-secondary btn-trigger-agent-action" data-action="read_public_webpage" data-target="https://en.wikipedia.org/wiki/Lakshmana" data-msg="Fetch historical article summary." style="justify-content: flex-start; text-align: left; padding: 12px 14px;">
            <div>
              <div style="font-weight: 700; color: var(--status-safe); font-size: 0.86rem;">🌐 Read Public Webpage</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">Risk: LOW • Gate: AUTO-ALLOW</div>
            </div>
          </button>
        </div>
      </div>

      <!-- Policy Registry Table -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">
            <i data-lucide="shield" style="color: var(--accent-cyan);"></i>
            Lakshman Rekha Agent Policy Registry
          </span>
          <span class="status-pill active" style="font-size: 0.7rem;">ZERO SILENT ACTIONS</span>
        </div>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-medium); color: var(--text-muted);">
                <th style="padding: 10px 14px;">Action Name</th>
                <th style="padding: 10px 14px;">Risk Tier</th>
                <th style="padding: 10px 14px;">Enforcement Policy</th>
                <th style="padding: 10px 14px;">Consequence Level</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-subtle);">
                <td style="padding: 12px 14px; font-weight: 600;">Read Public Webpage</td>
                <td style="padding: 12px 14px;"><span class="badge badge-low">LOW RISK</span></td>
                <td style="padding: 12px 14px; color: var(--status-safe); font-weight: 600;">ALLOW</td>
                <td style="padding: 12px 14px; color: var(--text-muted);">Read-only public internet data</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-subtle);">
                <td style="padding: 12px 14px; font-weight: 600;">Send WhatsApp Message</td>
                <td style="padding: 12px 14px;"><span class="badge badge-medium">MEDIUM RISK</span></td>
                <td style="padding: 12px 14px; color: var(--rekha-gold-light); font-weight: 600;">ASK (CONFIRMATION)</td>
                <td style="padding: 12px 14px; color: var(--text-muted);">External communication sent on your behalf</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-subtle);">
                <td style="padding: 12px 14px; font-weight: 600;">Access Private Local File</td>
                <td style="padding: 12px 14px;"><span class="badge badge-medium">MEDIUM RISK</span></td>
                <td style="padding: 12px 14px; color: var(--rekha-gold-light); font-weight: 600;">ASK (CONFIRMATION)</td>
                <td style="padding: 12px 14px; color: var(--text-muted);">Local file reading outside sandbox</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-subtle); background: rgba(244,63,94,0.03);">
                <td style="padding: 12px 14px; font-weight: 600; color: #fda4af;">Delete File / System Object</td>
                <td style="padding: 12px 14px;"><span class="badge badge-critical">CRITICAL RISK</span></td>
                <td style="padding: 12px 14px; color: var(--status-danger); font-weight: 700;">BLOCK PERMANENTLY</td>
                <td style="padding: 12px 14px; color: var(--text-muted);">Irreversible data loss prevented</td>
              </tr>
              <tr style="background: rgba(244,63,94,0.03);">
                <td style="padding: 12px 14px; font-weight: 600; color: #fda4af;">Financial Payment / Transfer</td>
                <td style="padding: 12px 14px;"><span class="badge badge-critical">CRITICAL RISK</span></td>
                <td style="padding: 12px 14px; color: var(--status-danger); font-weight: 700;">BLOCK PERMANENTLY</td>
                <td style="padding: 12px 14px; color: var(--text-muted);">Autonomous fund movement strictly banned</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
