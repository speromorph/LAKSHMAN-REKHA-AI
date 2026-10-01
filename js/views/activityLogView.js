/**
 * LAKSHMAN REKHA AI - Security Activity Audit Log View
 * Chronological, non-repudiable ledger of perimeter interceptions and actions.
 * Never stores raw sensitive credentials in log payloads.
 */

export function renderActivityLogView(store, t) {
  const { auditLogs } = store.state;

  return `
    <div class="activity-log-view animate-fade-in" style="max-width: 1050px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;">
        <div>
          <h2 style="font-size: 1.5rem; margin-bottom: 6px; display: flex; align-items: center; gap: 10px;">
            <i data-lucide="shield-check" style="color: var(--rekha-gold-light);"></i>
            ${t.nav.activity} & Tamper-Evident Trail
          </h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">
            Real-time immutable log of all prompt scans, redactions, factual verifications, and agent permission grants.
          </p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-secondary btn-sm" id="btn-export-logs-json">
            <i data-lucide="download"></i>
            Export Logs (JSON)
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-clear-logs" style="color: var(--status-danger);">
            <i data-lucide="trash-2"></i>
            Clear Display
          </button>
        </div>
      </div>

      <!-- Filter Controls -->
      <div class="card" style="margin-bottom: 20px; padding: 16px 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">FILTER SEVERITY:</span>
            <button class="btn btn-secondary btn-sm btn-filter-severity active" data-severity="ALL">All Events</button>
            <button class="btn btn-secondary btn-sm btn-filter-severity" data-severity="CRITICAL" style="color: var(--status-danger);">Critical</button>
            <button class="btn btn-secondary btn-sm btn-filter-severity" data-severity="HIGH" style="color: #f97316;">High</button>
            <button class="btn btn-secondary btn-sm btn-filter-severity" data-severity="MEDIUM" style="color: var(--status-warn);">Medium</button>
            <button class="btn btn-secondary btn-sm btn-filter-severity" data-severity="SAFE" style="color: var(--status-safe);">Verified Safe</button>
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">
            Showing ${auditLogs.length} events
          </div>
        </div>
      </div>

      <!-- Audit Stream List -->
      <div class="card" style="padding: 0; overflow: hidden;">
        <div id="activity-log-table-container">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-medium); background: rgba(0,0,0,0.2); color: var(--text-muted);">
                <th style="padding: 12px 18px; width: 110px;">Time</th>
                <th style="padding: 12px 18px; width: 140px;">Category</th>
                <th style="padding: 12px 18px; width: 120px;">Severity</th>
                <th style="padding: 12px 18px;">Summary & Sanitized Telemetry</th>
                <th style="padding: 12px 18px; width: 160px; text-align: right;">Action Result</th>
              </tr>
            </thead>
            <tbody>
              ${auditLogs.map(log => `
                <tr class="log-row" data-severity="${log.severity}" style="border-bottom: 1px solid var(--border-subtle); transition: background var(--transition-fast);">
                  <td style="padding: 14px 18px; font-family: monospace; color: var(--text-muted); font-size: 0.8rem;">
                    ${log.time}
                  </td>
                  <td style="padding: 14px 18px; font-weight: 600;">
                    ${log.type}
                  </td>
                  <td style="padding: 14px 18px;">
                    <span class="badge ${
                      log.severity === 'CRITICAL' ? 'badge-critical' :
                      log.severity === 'HIGH' ? 'badge-high' :
                      log.severity === 'MEDIUM' ? 'badge-medium' :
                      log.severity === 'SAFE' ? 'badge-safe' : 'badge-low'
                    }">${log.severity}</span>
                  </td>
                  <td style="padding: 14px 18px; color: var(--text-primary);">
                    ${log.summary}
                  </td>
                  <td style="padding: 14px 18px; text-align: right; font-weight: 700; font-size: 0.78rem; color: var(--rekha-gold-light);">
                    ${log.status}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
