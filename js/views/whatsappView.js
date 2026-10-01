/**
 * LAKSHMAN REKHA AI - Secure WhatsApp Messaging View
 * Authorizes, previews, and securely transmits messages via official API abstraction.
 * Implements strict contact policies (Mom, Friends, Work, Unknown) and interactive DEMO mode.
 */

import { messageSecurityEngine } from '../services/messageSecurityEngine.js';

export function renderWhatsappView(store, t) {
  const contacts = messageSecurityEngine.contacts;

  return `
    <div class="whatsapp-view animate-fade-in" style="max-width: 1050px; margin: 0 auto;">
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 1.5rem; margin-bottom: 6px; display: flex; align-items: center; gap: 10px;">
          <i data-lucide="message-circle" style="color: #25D366;"></i>
          ${t.nav.whatsapp} Protected Gateway
        </h2>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">
          Prevent AI agents from secretly impersonating you or exfiltrating private data over WhatsApp.
        </p>
      </div>

      <!-- Live Demo Banner -->
      <div style="background: rgba(37, 211, 102, 0.1); border: 1px solid rgba(37, 211, 102, 0.3); border-radius: var(--radius-lg); padding: 14px 20px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.4rem;">🛡️</span>
          <div>
            <div style="font-weight: 700; color: #4ade80; font-size: 0.9rem;">Official Integration Sandbox (DEMO MODE)</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">Adheres to WhatsApp Business API security standards. Zero automated scraping.</div>
          </div>
        </div>
        <button class="btn btn-secondary btn-sm" id="btn-revoke-whatsapp" style="border-color: rgba(244,63,94,0.4); color: var(--status-danger);">
          <i data-lucide="shield-x"></i>
          Revoke WhatsApp Token Access
        </button>
      </div>

      <div class="dashboard-columns">
        <!-- Message Dispatch Form -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">
              <i data-lucide="send" style="color: #25D366;"></i>
              Compose Protected Dispatch
            </span>
          </div>

          <div style="margin-bottom: 16px;">
            <label for="wa-recipient-select" style="display: block; font-weight: 600; font-size: 0.86rem; margin-bottom: 6px;">Select Recipient:</label>
            <select id="wa-recipient-select" style="width: 100%; background: var(--bg-secondary); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 10px 14px; color: var(--text-primary); outline: none;">
              ${contacts.map(c => `
                <option value="${c.name}">${c.name} (${c.category} - ${c.policy})</option>
              `).join('')}
            </select>
          </div>

          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label for="wa-message-body" style="font-weight: 600; font-size: 0.86rem;">Message Content:</label>
              <div style="display: flex; gap: 6px;">
                <button class="btn btn-secondary btn-sm btn-wa-quick" data-msg="I'll be 10 minutes late to our meeting." style="padding: 2px 8px; font-size: 0.7rem;">Quick: Late notice</button>
                <button class="btn btn-secondary btn-sm btn-wa-quick" data-msg="Hey here is my secret API key: sk-secret998124 please test it." style="padding: 2px 8px; font-size: 0.7rem; color: var(--status-danger);">Test: Secret Leak</button>
              </div>
            </div>
            <textarea id="wa-message-body" rows="4" style="width: 100%; background: var(--bg-secondary); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 12px 14px; color: var(--text-primary); font-size: 0.95rem; resize: vertical; outline: none;" placeholder="Draft message to send..."></textarea>
          </div>

          <button class="btn btn-primary" id="btn-wa-inspect-send" style="width: 100%; justify-content: center;">
            <i data-lucide="shield-check"></i>
            Run Security Check & Request Authorization
          </button>
        </div>

        <!-- Contact Policies & Audit Card -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">
              <i data-lucide="users" style="color: var(--accent-cyan);"></i>
              Contact Authorization Policy
            </span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${contacts.map(c => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: rgba(0,0,0,0.18); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <div>
                  <div style="font-weight: 600; font-size: 0.86rem;">${c.name}</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted);">${c.phone}</div>
                </div>
                <span class="badge ${c.category === 'Unknown' ? 'badge-critical' : c.category === 'Work' ? 'badge-medium' : 'badge-safe'}" style="font-size: 0.68rem;">
                  ${c.policy}
                </span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Preview Modal Container -->
      <div id="wa-preview-container" style="display: none;"></div>
    </div>
  `;
}
