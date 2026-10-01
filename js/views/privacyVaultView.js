/**
 * LAKSHMAN REKHA AI - My Privacy Vault & Memory Control View
 * Displays protected user attributes, masked secrets, explicitly authorized memories,
 * and enables complete data export or deletion.
 */

export function renderPrivacyVaultView(store, t) {
  const { vault, memories } = store.state;

  return `
    <div class="privacy-vault-view animate-fade-in" style="max-width: 1050px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;">
        <div>
          <h2 style="font-size: 1.5rem; margin-bottom: 6px; display: flex; align-items: center; gap: 10px;">
            <i data-lucide="database" style="color: var(--rekha-gold-light);"></i>
            My Privacy Vault & Memory Control
          </h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">
            Inspect what AI is allowed to know, remember, and access. Full sovereignty over your digital footprint.
          </p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-secondary" id="btn-export-vault">
            <i data-lucide="download"></i>
            Export Vault (JSON)
          </button>
          <button class="btn btn-danger" id="btn-clear-all-memory">
            <i data-lucide="trash-2"></i>
            Purge All Memories
          </button>
        </div>
      </div>

      <!-- Categories Grid -->
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- Category 1: Explicit Memories -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">
              <i data-lucide="brain" style="color: var(--accent-purple);"></i>
              Authorized AI Long-Term Memories (${memories.length})
            </span>
            <span class="badge badge-safe">HUMAN AUTHORIZED</span>
          </div>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 14px;">
            Lakshman Rekha strictly forbids AI from silently remembering facts about you without explicit permission.
          </p>
          
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${memories.length === 0 ? `
              <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.88rem;">No memories currently retained. Memory bank is empty.</div>
            ` : memories.map(mem => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(0,0,0,0.18); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <div>
                  <div style="font-weight: 500; font-size: 0.9rem;">${mem.text}</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted);">Recorded: ${mem.date} • Status: ${mem.status}</div>
                </div>
                <button class="btn btn-secondary btn-sm btn-delete-memory" data-id="${mem.id}" style="color: var(--status-danger);">
                  <i data-lucide="trash-2" style="width: 14px;"></i>
                  Delete
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Category 2: Masked Sensitive Secrets -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">
              <i data-lucide="key" style="color: var(--rekha-gold-light);"></i>
              Masked Secret Credentials (${vault.secrets.length})
            </span>
            <span class="badge badge-safe">NEVER LOGGED IN RAW PLAINTEXT</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
            ${vault.secrets.map(sec => `
              <div style="padding: 14px; background: rgba(0,0,0,0.22); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span style="font-weight: 600; font-size: 0.88rem;">${sec.key}</span>
                  <span class="badge badge-redacted">${sec.type}</span>
                </div>
                <div class="font-mono" style="font-size: 0.84rem; color: var(--rekha-gold-light); background: rgba(0,0,0,0.3); padding: 6px 10px; border-radius: 4px; border: 1px dashed var(--border-gold);">
                  ${sec.maskedValue}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Category 3: Personal Profile & Connected Services -->
        <div class="dashboard-columns">
          <div class="card">
            <div class="card-header">
              <span class="card-title">
                <i data-lucide="user" style="color: var(--accent-cyan);"></i>
                Basic Profile Info
              </span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${vault.personal.map(p => `
                <div style="display: flex; justify-content: space-between; padding: 10px 12px; background: rgba(0,0,0,0.15); border-radius: var(--radius-md);">
                  <span style="color: var(--text-secondary); font-size: 0.84rem;">${p.key}</span>
                  <strong style="font-size: 0.88rem;">${p.value}</strong>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <span class="card-title">
                <i data-lucide="link" style="color: var(--status-safe);"></i>
                Connected Integrations
              </span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${vault.connectedServices.map(srv => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; background: rgba(0,0,0,0.15); border-radius: var(--radius-md);">
                  <div>
                    <div style="font-weight: 600; font-size: 0.86rem;">${srv.name}</div>
                    <div style="font-size: 0.72rem; color: var(--text-muted);">${srv.access}</div>
                  </div>
                  <span class="badge badge-safe" style="font-size: 0.7rem;">${srv.status}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
