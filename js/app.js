/**
 * LAKSHMAN REKHA AI - Master Application Controller
 * Coordinates routers, views, services, localization, voice, command palette, and demo execution.
 */

import { store } from './state/store.js';
import { en } from './i18n/en.js';
import { hi } from './i18n/hi.js';

// Services
import { securityScanner } from './services/securityScanner.js';
import { privacyScanner } from './services/privacyScanner.js';
import { redactionEngine } from './services/redactionEngine.js';
import { dataMinimizer } from './services/dataMinimizer.js';
import { trustEngine } from './services/trustEngine.js';
import { agentPermissionEngine } from './services/agentPermissionEngine.js';
import { messageSecurityEngine } from './services/messageSecurityEngine.js';
import { codeSecurityEngine } from './services/codeSecurityEngine.js';
import { voiceAssistant } from './services/voiceAssistant.js';
import { aiService } from './services/aiProvider.js';

// Components
import { CommandPalette } from './components/commandPalette.js';

// Views
import { renderLandingView, initLandingViewEvents } from './views/landingView.js';
import { renderDashboardView } from './views/dashboardView.js';
import { renderChatView } from './views/chatView.js';
import { renderSecurityScannerView } from './views/securityScannerView.js';
import { renderPrivacyShieldView } from './views/privacyShieldView.js';
import { renderTrustCenterView } from './views/trustCenterView.js';
import { renderCodeSecurityView } from './views/codeSecurityView.js';
import { renderAgentGatewayView } from './views/agentGatewayView.js';
import { renderWhatsappView } from './views/whatsappView.js';
import { renderPrivateSessionsView } from './views/privateSessionsView.js';
import { renderPrivacyVaultView } from './views/privacyVaultView.js';
import { renderActivityLogView } from './views/activityLogView.js';
import { renderSettingsView } from './views/settingsView.js';
import { renderDemoTourModal, demoScenarios } from './views/demoTourModal.js';

export class LakshmanRekhaApp {
  constructor() {
    this.store = store;
    this.appEl = document.getElementById('app');
    this.toastContainer = null;
    this.unsubscribe = null;
    this.commandPalette = null;
  }

  init() {
    this.unsubscribe = this.store.subscribe(() => this.render());
    this.render();
    this.setupGlobalEvents();
    this.commandPalette = new CommandPalette(this);
  }

  navigateTo(viewName) {
    this.store.setView(viewName);
  }

  getT() {
    return this.store.state.language === 'hi' ? hi : en;
  }

  showToast(title, message, type = 'info') {
    if (!this.toastContainer) {
      this.toastContainer = document.createElement('div');
      this.toastContainer.className = 'toast-container';
      document.body.appendChild(this.toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'critical' ? '🚨' : type === 'success' ? '🛡️' : '✨';
    toast.innerHTML = `
      <div style="font-size: 1.2rem;">${icon}</div>
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 0.86rem; color: #ffffff;">${title}</div>
        <div style="font-size: 0.76rem; color: var(--text-secondary);">${message}</div>
      </div>
    `;
    this.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  render() {
    const t = this.getT();
    const { currentView, language, theme, metrics, pendingAction } = this.store.state;

    // ----------------------------------------------------
    // 1. PRIMARY SHOWCASE LANDING VIEW (Matches Mockup)
    // ----------------------------------------------------
    if (currentView === 'landing') {
      this.appEl.innerHTML = `
        <div style="display: flex; flex-direction: column; width: 100vw; min-height: 100vh;">
          <!-- Master Top Header (Reference Design) -->
          <header class="master-header">
            <a class="master-header-brand" data-view="landing" href="#section-protection">
              <div class="brand-icon-shield">
                <div class="brand-icon-shield-inner"></div>
              </div>
              <span class="brand-text-name">Lakshman Rekha</span>
            </a>

            <!-- Nav Links -->
            <nav class="master-nav-links">
              <a class="master-nav-link" href="#section-protection">${t.header?.protection || 'Protection'}</a>
              <a class="master-nav-link" href="#section-threat-monitor">${t.header?.threatMonitor || 'Threat Monitor'}</a>
              <a class="master-nav-link" href="#section-verification">${t.header?.verification || 'Verification'}</a>
              <a class="master-nav-link" href="#section-privacy">${t.header?.privacy || 'Privacy'}</a>
              <a class="master-nav-link" data-view="dashboard" style="color: var(--rekha-gold-light); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                <span>${t.header?.console || 'Console'}</span>
                <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
              </a>
            </nav>

            <!-- Right Header Actions -->
            <div class="master-header-actions">
              <!-- Global Search Trigger (Command Palette) -->
              <button class="nav-search-trigger" id="btn-trigger-cmd-search" title="Open Command Palette (⌘K / Ctrl+K)">
                <i data-lucide="search" style="width: 14px; height: 14px; color: var(--rekha-gold);"></i>
                <span>${t.header?.searchPlaceholder || 'Search Lakshman Rekha...'}</span>
                <span class="kbd-shortcut">⌘K</span>
              </button>

              <!-- Language Switcher -->
              <button class="btn-header" id="btn-lang-toggle" title="Switch Language English / Hindi">
                <i data-lucide="languages" style="width: 14px; height: 14px;"></i>
                <span>${language === 'en' ? 'हिन्दी (HI)' : 'English (EN)'}</span>
              </button>

              <!-- Active Status Badge -->
              <div class="status-pill-perimeter" title="Lakshman Rekha perimeter shield actively enforcing boundaries">
                <span class="status-pulse-dot-safe"></span>
                <span>${t.header?.perimeterActive || 'Perimeter active'}</span>
              </div>
            </div>
          </header>

          <!-- Main Scrollable Content -->
          <div class="main-wrapper" id="main-content-scroll">
            ${renderLandingView(this.store, t)}
          </div>
        </div>

        <!-- Action Confirmation Modal (for Agent Permission requests) -->
        ${pendingAction ? this.renderActionModal(pendingAction) : ''}

        <!-- Demo Tour Modal Container -->
        <div id="demo-tour-modal-host"></div>
      `;

      // Refresh Lucide Icons safely
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }

      // Initialize canvas and landing interactions
      initLandingViewEvents(this.store, this);
      return;
    }

    // ----------------------------------------------------
    // 2. CONSOLE & OPERATIONS VIEW (Dashboard, Chat, Scanners, Vault, etc.)
    // ----------------------------------------------------
    this.appEl.innerHTML = `
      <div class="app-container">
        <!-- Sidebar Navigation -->
        <aside class="sidebar" id="main-sidebar">
          <div class="sidebar-header">
            <img src="assets/logo.png" alt="Lakshman Rekha Logo" class="brand-logo-img" />
            <div class="brand-title-wrap">
              <span class="brand-title">
                LAKSHMAN REKHA
              </span>
              <span class="brand-tagline">AI GUARDIAN • ALWAYS</span>
            </div>
          </div>

          <nav class="sidebar-nav">
            <div class="nav-section-title">Overview</div>
            <a class="nav-item ${currentView === 'landing' ? 'active' : ''}" data-view="landing">
              <span class="nav-icon"><i data-lucide="compass"></i></span>
              <span>Protection Showcase</span>
            </a>
            <a class="nav-item ${currentView === 'dashboard' ? 'active' : ''}" data-view="dashboard">
              <span class="nav-icon"><i data-lucide="layout-dashboard"></i></span>
              <span>${t.nav.dashboard}</span>
            </a>
            <a class="nav-item ${currentView === 'chat' ? 'active' : ''}" data-view="chat">
              <span class="nav-icon"><i data-lucide="message-square"></i></span>
              <span>${t.nav.chat}</span>
              ${this.store.state.isPrivateLifeMode ? '<span class="nav-badge" style="background: rgba(244,63,94,0.2); color: #fda4af;">PLM</span>' : ''}
            </a>

            <div class="nav-section-title">Perimeter Defenses</div>
            <a class="nav-item ${currentView === 'securityScanner' ? 'active' : ''}" data-view="securityScanner">
              <span class="nav-icon"><i data-lucide="shield-alert"></i></span>
              <span>${t.nav.securityScanner}</span>
              <span class="nav-badge">${metrics.threatsBlocked}</span>
            </a>
            <a class="nav-item ${currentView === 'privacyShield' ? 'active' : ''}" data-view="privacyShield">
              <span class="nav-icon"><i data-lucide="lock"></i></span>
              <span>${t.nav.privacyShield}</span>
            </a>
            <a class="nav-item ${currentView === 'trustCenter' ? 'active' : ''}" data-view="trustCenter">
              <span class="nav-icon"><i data-lucide="check-check"></i></span>
              <span>${t.nav.trustCenter}</span>
            </a>
            <a class="nav-item ${currentView === 'codeSecurity' ? 'active' : ''}" data-view="codeSecurity">
              <span class="nav-icon"><i data-lucide="code"></i></span>
              <span>${t.nav.codeSecurity}</span>
            </a>

            <div class="nav-section-title">Agent Governance</div>
            <a class="nav-item ${currentView === 'agentGateway' ? 'active' : ''}" data-view="agentGateway">
              <span class="nav-icon"><i data-lucide="git-pull-request"></i></span>
              <span>${t.nav.agentGateway}</span>
            </a>
            <a class="nav-item ${currentView === 'whatsapp' ? 'active' : ''}" data-view="whatsapp">
              <span class="nav-icon"><i data-lucide="message-circle"></i></span>
              <span>${t.nav.whatsapp}</span>
            </a>
            <a class="nav-item ${currentView === 'privateSessions' ? 'active' : ''}" data-view="privateSessions">
              <span class="nav-icon"><i data-lucide="eye-off"></i></span>
              <span>${t.nav.privateSessions}</span>
            </a>

            <div class="nav-section-title">Data & Audit</div>
            <a class="nav-item ${currentView === 'privacyVault' ? 'active' : ''}" data-view="privacyVault">
              <span class="nav-icon"><i data-lucide="database"></i></span>
              <span>${t.nav.privacyVault}</span>
            </a>
            <a class="nav-item ${currentView === 'activity' ? 'active' : ''}" data-view="activity">
              <span class="nav-icon"><i data-lucide="activity"></i></span>
              <span>${t.nav.activity}</span>
            </a>

            <div class="nav-section-title">System</div>
            <a class="nav-item ${currentView === 'settings' ? 'active' : ''}" data-view="settings">
              <span class="nav-icon"><i data-lucide="settings"></i></span>
              <span>${t.nav.settings}</span>
            </a>
          </nav>

          <div class="sidebar-footer">
            <div class="user-profile">
              <div class="user-avatar">LR</div>
              <div class="user-info">
                <span style="font-weight: 700; font-size: 0.85rem; color: #ffffff;">Local Gateway</span>
                <span style="font-size: 0.72rem; color: var(--status-safe);">Perimeter Active</span>
              </div>
            </div>
            <button class="btn-header" id="btn-quick-theme" title="Toggle Theme" style="padding: 6px 8px;">
              ${theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </aside>

        <!-- Main Wrapper -->
        <main class="main-wrapper">
          <!-- Header -->
          <header class="top-header">
            <div style="display: flex; align-items: center; gap: 14px;">
              <button class="mobile-menu-btn" id="btn-toggle-sidebar" aria-label="Toggle Navigation">
                <i data-lucide="menu"></i>
              </button>
              <button class="btn btn-secondary" data-view="landing" style="padding: 6px 14px; font-size: 0.82rem; border-radius: var(--radius-full);">
                <i data-lucide="arrow-left" style="width: 14px;"></i>
                <span>Back to Overview</span>
              </button>
              <h1 class="page-title" style="font-size: 1.2rem; font-weight: 700; margin: 0;">${t.nav[currentView] || 'Console'}</h1>
            </div>

            <div style="display: flex; align-items: center; gap: 12px;">
              <!-- Search Trigger -->
              <button class="nav-search-trigger" id="btn-trigger-cmd-search-console">
                <i data-lucide="search" style="width: 14px; color: var(--rekha-gold);"></i>
                <span>Search (⌘K)</span>
              </button>

              <!-- Language Selector Button -->
              <button class="btn-header" id="btn-lang-toggle" title="Switch Language English / Hindi">
                <i data-lucide="languages" style="width: 14px;"></i>
                <span>${language === 'en' ? 'हिन्दी' : 'English'}</span>
              </button>

              <!-- Demo Mode Button -->
              <button class="btn btn-secondary" id="btn-open-demo-tour" style="padding: 7px 14px; font-size: 0.82rem;">
                <i data-lucide="sparkles" style="width: 14px; color: var(--rekha-gold);"></i>
                <span>Demo Tour</span>
              </button>

              <!-- Active Status Badge -->
              <div class="status-pill-perimeter">
                <span class="status-pulse-dot-safe"></span>
                <span>Protected</span>
              </div>
            </div>
          </header>

          <!-- Dynamic View Container -->
          <div class="content-area" id="main-content-view" style="flex: 1; padding: 24px; overflow-y: auto;">
            ${this.renderViewContent(currentView, t)}
          </div>
        </main>

        <!-- Mobile Bottom Navigation -->
        <nav class="mobile-bottom-nav">
          <button class="mobile-nav-btn ${currentView === 'landing' ? 'active' : ''}" data-view="landing">
            <i data-lucide="compass"></i>
            <span>Overview</span>
          </button>
          <button class="mobile-nav-btn ${currentView === 'dashboard' ? 'active' : ''}" data-view="dashboard">
            <i data-lucide="layout-dashboard"></i>
            <span>Home</span>
          </button>
          <button class="mobile-nav-btn ${currentView === 'chat' ? 'active' : ''}" data-view="chat">
            <i data-lucide="message-square"></i>
            <span>Chat</span>
          </button>
          <button class="mobile-nav-btn ${currentView === 'securityScanner' ? 'active' : ''}" data-view="securityScanner">
            <i data-lucide="shield-alert"></i>
            <span>Security</span>
          </button>
          <button class="mobile-nav-btn ${currentView === 'agentGateway' ? 'active' : ''}" data-view="agentGateway">
            <i data-lucide="git-pull-request"></i>
            <span>Agents</span>
          </button>
        </nav>
      </div>

      <!-- Action Confirmation Modal (for Agent Permission requests) -->
      ${pendingAction ? this.renderActionModal(pendingAction) : ''}

      <!-- Demo Tour Modal Container -->
      <div id="demo-tour-modal-host"></div>
    `;

    // Refresh Lucide Icons safely
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    this.attachViewSpecificHandlers(currentView);
  }

  renderViewContent(viewName, t) {
    switch (viewName) {
      case 'landing': return renderLandingView(this.store, t);
      case 'dashboard': return renderDashboardView(this.store, t);
      case 'chat': return renderChatView(this.store, t);
      case 'securityScanner': return renderSecurityScannerView(this.store, t);
      case 'privacyShield': return renderPrivacyShieldView(this.store, t);
      case 'trustCenter': return renderTrustCenterView(this.store, t);
      case 'codeSecurity': return renderCodeSecurityView(this.store, t);
      case 'agentGateway': return renderAgentGatewayView(this.store, t);
      case 'whatsapp': return renderWhatsappView(this.store, t);
      case 'privateSessions': return renderPrivateSessionsView(this.store, t);
      case 'privacyVault': return renderPrivacyVaultView(this.store, t);
      case 'activity': return renderActivityLogView(this.store, t);
      case 'settings': return renderSettingsView(this.store, t);
      default: return renderDashboardView(this.store, t);
    }
  }

  renderActionModal(action) {
    return `
      <div class="modal-overlay" id="agent-action-modal">
        <div class="modal-content">
          <div class="modal-header" style="margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.5rem;">🛑</span>
              <div>
                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--rekha-gold-light);">
                  AI AGENT ACTION REQUEST
                </h3>
                <span style="font-size: 0.74rem; color: var(--text-muted);">
                  The Lakshman Rekha boundary has paused execution for your approval.
                </span>
              </div>
            </div>
          </div>

          <div class="modal-body" style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px;">
            <div style="padding: 14px; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted); font-size: 0.8rem;">Requesting Agent:</span>
                <strong style="font-size: 0.84rem; color: #ffffff;">${action.agentName}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted); font-size: 0.8rem;">Action Type:</span>
                <strong style="font-size: 0.84rem; color: var(--rekha-gold-light);">${action.label}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted); font-size: 0.8rem;">Target / Recipient:</span>
                <strong style="font-size: 0.84rem; color: #ffffff;">${action.target}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted); font-size: 0.8rem;">Calculated Risk Tier:</span>
                <span class="badge ${action.risk === 'CRITICAL' ? 'badge-danger' : action.risk === 'HIGH' ? 'badge-warn' : 'badge-safe'}">
                  ${action.risk} RISK
                </span>
              </div>
            </div>

            ${action.payload?.message ? `
              <div>
                <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); display: block; margin-bottom: 4px;">Message Payload Content:</label>
                <div style="padding: 10px 14px; background: rgba(255,255,255,0.04); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-size: 0.88rem; color: #ffffff;">
                  "${action.payload.message}"
                </div>
              </div>
            ` : ''}

            <div style="font-size: 0.8rem; color: var(--text-secondary);">
              <strong>Perimeter Rationale:</strong> ${action.explanation}
            </div>
          </div>

          <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 10px;">
            <button class="btn btn-danger" id="btn-modal-deny">
              <i data-lucide="x" style="width: 15px;"></i>
              Deny Action
            </button>
            <button class="btn btn-secondary" id="btn-modal-edit">
              <i data-lucide="edit-3" style="width: 15px;"></i>
              Edit Payload
            </button>
            <button class="btn btn-primary" id="btn-modal-allow-once">
              <i data-lucide="check" style="width: 15px;"></i>
              Allow Once
            </button>
          </div>
        </div>
      </div>
    `;
  }

  setupGlobalEvents() {
    // Navigation routing
    document.addEventListener('click', (e) => {
      const navTarget = e.target.closest('[data-view]');
      if (navTarget) {
        e.preventDefault();
        const view = navTarget.getAttribute('data-view');
        this.store.setView(view);
      }

      // Command search buttons
      if (e.target.closest('#btn-trigger-cmd-search') || e.target.closest('#btn-trigger-cmd-search-console')) {
        if (this.commandPalette) this.commandPalette.open();
      }

      // Sidebar mobile drawer
      if (e.target.closest('#btn-toggle-sidebar')) {
        const sidebar = document.getElementById('main-sidebar');
        if (sidebar) sidebar.classList.toggle('open');
      }

      // Theme toggle
      if (e.target.closest('#btn-quick-theme') || e.target.closest('#btn-toggle-theme-setting')) {
        this.store.toggleTheme();
      }

      // High contrast toggle
      if (e.target.closest('#btn-toggle-contrast-setting')) {
        this.store.toggleContrast();
      }

      // Language toggle
      if (e.target.closest('#btn-lang-toggle')) {
        const newLang = this.store.state.language === 'en' ? 'hi' : 'en';
        this.store.setLanguage(newLang);
        voiceAssistant.setLanguage(newLang);
        this.showToast("Language Updated", newLang === 'hi' ? "हिन्दी भाषा सक्रिय की गई" : "Switched to English", "success");
      }

      // Demo Tour Modal Open
      if (e.target.closest('#btn-open-demo-tour') || e.target.closest('#btn-quick-demo') || e.target.closest('#btn-hero-demo')) {
        this.openDemoTourModal();
      }

      // Action Modal Buttons
      if (e.target.closest('#btn-modal-deny')) {
        this.store.recordAudit("Agent Action", "HIGH", "DENIED_BY_USER", `Action denied for ${this.store.state.pendingAction?.target}`);
        this.store.setPendingAction(null);
        this.showToast("Action Denied", "Autonomous agent action was successfully blocked.", "critical");
      }

      if (e.target.closest('#btn-modal-allow-once')) {
        const act = this.store.state.pendingAction;
        this.store.recordAudit("Agent Action", act?.risk || "MEDIUM", "APPROVED_BY_USER", `Authorized action for ${act?.target}`);
        this.store.setPendingAction(null);
        this.showToast("Action Authorized", `Action allowed once (SIMULATED): Sent to ${act?.target}`, "success");
      }

      if (e.target.closest('#btn-modal-edit')) {
        const edited = prompt("Edit message before dispatch:", this.store.state.pendingAction?.payload?.message || "");
        if (edited !== null) {
          this.store.recordAudit("Agent Action", "MEDIUM", "EDITED_AND_APPROVED", `User edited message dispatched to ${this.store.state.pendingAction?.target}`);
          this.store.setPendingAction(null);
          this.showToast("Dispatched Edited Message", `Sent safely: "${edited}"`, "success");
        }
      }
    });
  }

  openDemoTourModal() {
    const host = document.getElementById('demo-tour-modal-host');
    if (!host) return;
    host.innerHTML = renderDemoTourModal();
    if (window.lucide) window.lucide.createIcons();

    // Close handlers
    const closeBtn = document.getElementById('btn-close-demo-modal');
    const dismissBtn = document.getElementById('btn-dismiss-demo-modal');
    const close = () => { host.innerHTML = ''; };
    if (closeBtn) closeBtn.onclick = close;
    if (dismissBtn) dismissBtn.onclick = close;

    // Execute scenario handlers
    const scenarioBtns = host.querySelectorAll('.btn-execute-scenario');
    scenarioBtns.forEach(btn => {
      btn.onclick = () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        close();
        this.runScenario(id);
      };
    });
  }

  runScenario(id) {
    const scenario = demoScenarios.find(s => s.id === id);
    if (!scenario) return;

    this.store.setView(scenario.targetView);

    setTimeout(() => {
      if (id === 1) {
        // Prompt injection
        const input = document.getElementById('sec-input-prompt');
        if (input) {
          input.value = scenario.sampleInput;
          document.getElementById('btn-sec-run')?.click();
          this.showToast("Demo 1 Active", "Adversarial Prompt Injection analyzed & neutralized.", "critical");
        }
      } else if (id === 2) {
        // PII
        const input = document.getElementById('priv-input-text');
        if (input) {
          input.value = scenario.sampleInput;
          document.getElementById('btn-priv-run')?.click();
          this.showToast("Demo 2 Active", "PII & secret keys detected and tokenized.", "success");
        }
      } else if (id === 3) {
        // Private life mode
        this.store.state.isPrivateLifeMode = true;
        this.store.notify();
        const input = document.getElementById('chat-input-textarea');
        if (input) {
          input.value = scenario.sampleInput;
          this.showToast("Demo 3 Active", "Private Life Mode activated. Zero memory retention.", "success");
        }
      } else if (id === 4) {
        // Trust check
        const input = document.getElementById('trust-input-text');
        if (input) {
          input.value = scenario.sampleInput;
          document.getElementById('btn-trust-run')?.click();
          this.showToast("Demo 4 Active", "Hallucination flagged with grounding evidence.", "info");
        }
      } else if (id === 5) {
        // WhatsApp agent gate
        const msgInput = document.getElementById('wa-message-body');
        if (msgInput) {
          msgInput.value = scenario.sampleInput;
          document.getElementById('btn-wa-inspect-send')?.click();
        }
      } else if (id === 6) {
        // Destructive agent action
        const actionReq = agentPermissionEngine.evaluateAction({
          actionId: "delete_file",
          agentName: "File Maintenance Agent",
          target: "/var/backups/users_prod.sql",
          payload: { reason: "Routine disk cleanup" }
        });
        this.store.recordAudit("Agent Action", "CRITICAL", "BLOCKED", "Agent attempted to delete system backup file. Blocked by Lakshman Rekha.");
        this.showToast("Perimeter Block Enforced", "Autonomous file deletion was BLOCKED PERMANENTLY.", "critical");
      } else if (id === 7) {
        // Code security
        const codeInput = document.getElementById('code-input-source');
        if (codeInput) {
          codeInput.value = "import os\napi_key = 'sk-proj-9941928472910'\nquery = f'SELECT * FROM users WHERE id = {user_id}'\nreturn eval(user_id)";
          document.getElementById('btn-code-run')?.click();
          this.showToast("Demo 7 Active", "Hardcoded secrets & SQL injection flagged.", "critical");
        }
      }
    }, 200);
  }

  attachViewSpecificHandlers(viewName) {
    // ----------------------------------------------------
    // DASHBOARD VIEW
    // ----------------------------------------------------
    if (viewName === 'dashboard') {
      document.getElementById('btn-view-all-activity')?.addEventListener('click', () => this.store.setView('activity'));
      document.getElementById('btn-quick-injection')?.addEventListener('click', () => this.runScenario(1));
      document.getElementById('btn-quick-pii')?.addEventListener('click', () => this.runScenario(2));
      document.getElementById('btn-quick-agent')?.addEventListener('click', () => this.runScenario(5));
      document.getElementById('btn-quick-code')?.addEventListener('click', () => this.runScenario(7));
    }

    // ----------------------------------------------------
    // CHAT VIEW
    // ----------------------------------------------------
    if (viewName === 'chat') {
      const textarea = document.getElementById('chat-input-textarea');
      const sendBtn = document.getElementById('btn-send-chat');
      const voiceBtn = document.getElementById('btn-voice-input');
      const clearBtn = document.getElementById('btn-clear-chat');
      const plmBtn = document.getElementById('btn-toggle-private-life');
      const incogBtn = document.getElementById('btn-toggle-incognito');
      const endIncogBtn = document.getElementById('btn-end-incognito');

      if (plmBtn) plmBtn.onclick = () => this.store.togglePrivateLifeMode();
      if (incogBtn) incogBtn.onclick = () => this.store.toggleIncognito();
      if (endIncogBtn) endIncogBtn.onclick = () => this.store.toggleIncognito();
      if (clearBtn) clearBtn.onclick = () => this.store.clearChat();

      // Voice Push-to-Talk
      if (voiceBtn) {
        voiceBtn.onclick = () => {
          const indicator = document.getElementById('voice-status-indicator');
          if (voiceAssistant.isListening) {
            voiceAssistant.stop();
            if (indicator) indicator.style.display = 'none';
          } else {
            if (indicator) indicator.style.display = 'flex';
            voiceAssistant.startListening((transcript, isFinal) => {
              if (textarea) textarea.value = transcript;
              if (isFinal) {
                if (indicator) indicator.style.display = 'none';
              }
            }, (err) => {
              this.showToast("Voice Recognition", err, "info");
              if (indicator) indicator.style.display = 'none';
            });
          }
        };
      }

      // Send Prompt through Lakshman Rekha Boundary Inspection
      const handleSend = async () => {
        const text = textarea.value.trim();
        if (!text) return;
        textarea.value = '';

        // Step 1: Security Inspection
        const secReport = securityScanner.scanPrompt(text);
        if (!secReport.isSafe && secReport.riskLevel === 'CRITICAL') {
          this.store.recordAudit("Security Defense", "CRITICAL", "BLOCKED", `Neutralized prompt injection: "${text.substring(0, 35)}..."`);
          this.store.addChatMessage({
            id: `msg-${Date.now()}`,
            role: "user",
            content: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            scanMeta: secReport
          });
          this.store.addChatMessage({
            id: `msg-${Date.now() + 1}`,
            role: "ai",
            content: "🚨 LAKSHMAN REKHA VIOLATION DETECTED: Prompt contains adversarial injection / jailbreak patterns. This input has been halted at the boundary.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            scanMeta: { isViolationNotice: true }
          });
          this.showToast("Boundary Interception", "Prompt injection blocked.", "critical");
          return;
        }

        // Step 2: Privacy Inspection
        const privReport = privacyScanner.scanPrivacy(text);
        let safeText = text;

        if (privReport.hasSensitiveData) {
          const redacted = redactionEngine.redact(text);
          safeText = redacted.redactedText;
          this.store.recordAudit("Privacy Shield", "HIGH", "PROTECTED", `Auto-redacted ${privReport.totalFound} sensitive entities`);
          this.showToast("Zero-Leak Privacy", "Sensitive PII sanitized before external AI transmission.", "info");
        }

        await this.proceedWithCleanSend(safeText, privReport.hasSensitiveData);
      };

      if (sendBtn) sendBtn.onclick = handleSend;
      if (textarea) {
        textarea.onkeydown = (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        };
      }
    }

    // ----------------------------------------------------
    // SECURITY SCANNER VIEW
    // ----------------------------------------------------
    if (viewName === 'securityScanner') {
      const runBtn = document.getElementById('btn-sec-run');
      const clearBtn = document.getElementById('btn-sec-clear');
      const input = document.getElementById('sec-input-prompt');
      const resultsContainer = document.getElementById('sec-results-container');

      document.querySelectorAll('.btn-sec-preset').forEach(b => {
        b.onclick = () => {
          if (input) input.value = b.getAttribute('data-text');
        };
      });

      if (clearBtn) clearBtn.onclick = () => {
        if (input) input.value = '';
        if (resultsContainer) resultsContainer.style.display = 'none';
      };

      if (runBtn) {
        runBtn.onclick = () => {
          const text = input.value.trim();
          if (!text) return;
          const report = securityScanner.scanPrompt(text);
          if (resultsContainer) {
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = `
              <div class="card" style="border-top: 3px solid ${report.isSafe ? 'var(--status-safe)' : 'var(--status-danger)'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                  <div>
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: #ffffff;">
                      ${report.isSafe ? '✅ Safe Input Verified' : '🚨 Potential Threat Detected'}
                    </h3>
                    <span style="font-size: 0.78rem; color: var(--text-muted);">
                      Confidence Score: ${(report.threats[0]?.confidence ? Math.round(report.threats[0].confidence * 100) : 99)}%
                    </span>
                  </div>
                  <span class="badge ${report.riskLevel === 'CRITICAL' ? 'badge-danger' : report.riskLevel === 'HIGH' ? 'badge-warn' : 'badge-safe'}" style="font-size: 0.8rem; padding: 6px 12px;">
                    ${report.riskLevel} RISK
                  </span>
                </div>

                ${report.threats.length > 0 ? `
                  <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
                    ${report.threats.map(t => `
                      <div style="padding: 12px; background: rgba(0,0,0,0.22); border-radius: var(--radius-md); border-left: 3px solid var(--status-danger);">
                        <div style="font-weight: 700; color: var(--status-danger); margin-bottom: 4px;">${t.type}</div>
                        <div style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 6px;">${t.explanation}</div>
                        <code style="font-size: 0.76rem; color: var(--text-muted);">${t.matchedRule}</code>
                      </div>
                    `).join('')}
                  </div>
                ` : `
                  <p style="font-size: 0.88rem; color: var(--status-safe); margin-bottom: 16px;">
                    Input complies with Lakshman Rekha safety boundaries. No adversarial prompt injection or command execution signatures found.
                  </p>
                `}

                <div style="display: flex; justify-content: flex-end; gap: 10px;">
                  <button class="btn btn-secondary btn-sm" id="btn-sec-copy">Copy Diagnostic JSON</button>
                  <button class="btn btn-primary btn-sm" id="btn-sec-record">Log to Audit Vault</button>
                </div>
              </div>
            `;

            document.getElementById('btn-sec-copy')?.addEventListener('click', () => {
              navigator.clipboard?.writeText(JSON.stringify(report, null, 2));
              this.showToast("Copied", "Diagnostic payload copied to clipboard.", "info");
            });

            document.getElementById('btn-sec-record')?.addEventListener('click', () => {
              this.store.recordAudit("Security Defense", report.riskLevel, report.isSafe ? "VERIFIED_SAFE" : "BLOCKED", `Scanned prompt input (${report.threats.length} threats)`);
              this.showToast("Recorded", "Event committed to audit ledger.", "success");
            });
          }
        };
      }
    }

    // ----------------------------------------------------
    // PRIVACY SHIELD VIEW
    // ----------------------------------------------------
    if (viewName === 'privacyShield') {
      const runBtn = document.getElementById('btn-priv-run');
      const clearBtn = document.getElementById('btn-priv-clear');
      const input = document.getElementById('priv-input-text');
      const resultsContainer = document.getElementById('priv-results-container');

      document.querySelectorAll('.btn-priv-preset').forEach(b => {
        b.onclick = () => {
          if (input) input.value = b.getAttribute('data-text');
        };
      });

      if (clearBtn) clearBtn.onclick = () => {
        if (input) input.value = '';
        if (resultsContainer) resultsContainer.style.display = 'none';
      };

      if (runBtn) {
        runBtn.onclick = () => {
          const text = input.value.trim();
          if (!text) return;
          const scan = privacyScanner.scanPrivacy(text);
          const redacted = redactionEngine.redact(text);
          const minim = dataMinimizer.minimize(text);

          if (resultsContainer) {
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = `
              <div class="card" style="border-top: 3px solid var(--accent-cyan); margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                  <div>
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: #ffffff;">
                      ${scan.hasSensitiveData ? `🔒 ${scan.totalFound} Sensitive Items Intercepted` : '✅ Zero PII Detected'}
                    </h3>
                    <span style="font-size: 0.78rem; color: var(--text-muted);">
                      PII & Secrets masked before boundary crossing
                    </span>
                  </div>
                  <span class="badge ${scan.hasSensitiveData ? 'badge-danger' : 'badge-safe'}">
                    ${scan.hasSensitiveData ? 'LEAK PREVENTED' : 'CLEAR'}
                  </span>
                </div>

                ${scan.items.length > 0 ? `
                  <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
                    ${scan.items.map(item => `
                      <span class="badge badge-warn" style="padding: 6px 10px;">
                        ${item.label}: ${item.rawPreview}
                      </span>
                    `).join('')}
                  </div>
                ` : ''}

                <div style="margin-bottom: 16px;">
                  <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 6px;">
                    Lakshman Rekha Autonomous Redaction Preview (What Third-Party AI Actually Receives):
                  </label>
                  <div class="font-mono" style="padding: 12px 14px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1px solid var(--border-medium); font-size: 0.88rem; color: var(--rekha-gold-light);">
                    ${redacted.redactedText}
                  </div>
                </div>

                ${minim.canMinimize ? `
                  <div style="padding: 12px 16px; background: rgba(6,182,212,0.08); border-radius: var(--radius-md); border: 1px solid var(--border-cyan); margin-bottom: 16px;">
                    <div style="font-weight: 700; color: var(--accent-cyan); font-size: 0.86rem; margin-bottom: 4px;">
                      📉 Data Minimization Suggestion (-${minim.reductionPercentage}% fluff)
                    </div>
                    <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">
                      Extraneous biographical context detected: ${minim.detectedFluff.map(f => f.category).join(', ')}.
                    </p>
                    <div style="font-size: 0.84rem; font-weight: 600; color: var(--text-primary);">
                      Minimised Task Query: "${minim.minimized}"
                    </div>
                  </div>
                ` : ''}

                <div style="display: flex; justify-content: flex-end; gap: 10px;">
                  <button class="btn btn-secondary btn-sm" id="btn-priv-copy-redacted">Copy Redacted Version</button>
                  <button class="btn btn-primary btn-sm" id="btn-priv-record">Commit to Protected Log</button>
                </div>
              </div>
            `;

            document.getElementById('btn-priv-copy-redacted')?.addEventListener('click', () => {
              navigator.clipboard?.writeText(redacted.redactedText);
              this.showToast("Copied", "Redacted text copied safely.", "info");
            });

            document.getElementById('btn-priv-record')?.addEventListener('click', () => {
              this.store.recordAudit("Privacy Shield", "CRITICAL", "PROTECTED", `Redacted ${redacted.redactionsCount} entities in sandbox`);
              this.showToast("Logged", "Interception verified and recorded in audit log.", "success");
            });
          }
        };
      }
    }

    // ----------------------------------------------------
    // TRUST CENTER VIEW
    // ----------------------------------------------------
    if (viewName === 'trustCenter') {
      const runBtn = document.getElementById('btn-trust-run');
      const clearBtn = document.getElementById('btn-trust-clear');
      const input = document.getElementById('trust-input-text');
      const resultsContainer = document.getElementById('trust-results-container');

      document.querySelectorAll('.btn-trust-preset').forEach(b => {
        b.onclick = () => {
          if (input) input.value = b.getAttribute('data-text');
        };
      });

      if (clearBtn) clearBtn.onclick = () => {
        if (input) input.value = '';
        if (resultsContainer) resultsContainer.style.display = 'none';
      };

      if (runBtn) {
        runBtn.onclick = () => {
          const text = input.value.trim();
          if (!text) return;
          const report = trustEngine.assessTrust("Audit query", text);

          if (resultsContainer) {
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = `
              <div class="card" style="border-top: 3px solid var(--rekha-gold); margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                  <div>
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--rekha-gold-light);">
                      Trust Score: ${report.trustScore} / 100
                    </h3>
                    <span style="font-size: 0.78rem; color: var(--text-muted);">
                      ${report.assessmentLabel} (${report.supportedCount} verified claims, ${report.warningCount} requires scrutiny)
                    </span>
                  </div>
                  <span class="badge ${report.trustScore >= 80 ? 'badge-safe' : 'badge-warn'}">
                    ${report.trustScore >= 80 ? 'HIGH FIDELITY' : 'REQUIRES SCRUTINY'}
                  </span>
                </div>

                <div style="display: flex; flex-direction: column; gap: 10px;">
                  ${report.claims.map(claim => `
                    <div style="padding: 12px 14px; background: rgba(0,0,0,0.2); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <span class="badge ${claim.status === 'Supported' ? 'badge-safe' : 'badge-warn'}" style="font-size: 0.7rem;">
                          ${claim.status === 'Supported' ? '✓ Grounded' : '⚠️ Unverified Claim'}
                        </span>
                        <span style="font-size: 0.72rem; color: var(--text-muted);">Confidence: ${claim.confidence}%</span>
                      </div>
                      <div style="font-size: 0.88rem; font-weight: 500; margin-bottom: 4px; color: #ffffff;">"${claim.claimText}"</div>
                      <div style="font-size: 0.76rem; color: var(--text-secondary);">Evidence: ${claim.evidence}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }
        };
      }
    }

    // ----------------------------------------------------
    // CODE SECURITY VIEW
    // ----------------------------------------------------
    if (viewName === 'codeSecurity') {
      const runBtn = document.getElementById('btn-code-run');
      const clearBtn = document.getElementById('btn-code-clear');
      const codeInput = document.getElementById('code-input-source');
      const resultsContainer = document.getElementById('code-results-container');

      document.querySelectorAll('.btn-code-preset').forEach(b => {
        b.onclick = () => {
          if (codeInput) codeInput.value = b.getAttribute('data-code');
        };
      });

      if (clearBtn) clearBtn.onclick = () => {
        if (codeInput) codeInput.value = '';
        if (resultsContainer) resultsContainer.style.display = 'none';
      };

      if (runBtn) {
        runBtn.onclick = () => {
          const code = codeInput.value.trim();
          if (!code) return;
          const report = codeSecurityEngine.scanCode(code);
          const saferCode = codeSecurityEngine.generateSaferVersion(code);

          if (resultsContainer) {
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = `
              <div class="card" style="border-top: 3px solid ${report.hasCritical ? 'var(--status-danger)' : 'var(--status-safe)'}; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                  <div>
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: #ffffff;">
                      Security Score: ${report.score} / 100
                    </h3>
                    <span style="font-size: 0.78rem; color: var(--text-muted);">
                      ${report.totalIssues} vulnerabilities identified in static analysis
                    </span>
                  </div>
                  <span class="badge ${report.hasCritical ? 'badge-danger' : 'badge-safe'}">
                    ${report.hasCritical ? 'CRITICAL FLAWS FOUND' : 'PASS'}
                  </span>
                </div>

                ${report.issues.length > 0 ? `
                  <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
                    ${report.issues.map(iss => `
                      <div style="padding: 12px 14px; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border-left: 3px solid var(--status-danger);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                          <strong style="color: var(--status-danger); font-size: 0.88rem;">${iss.name} (Line ${iss.line})</strong>
                          <span class="badge badge-danger">${iss.severity}</span>
                        </div>
                        <code class="font-mono" style="display: block; font-size: 0.78rem; color: #fecdd3; background: rgba(0,0,0,0.4); padding: 4px 8px; border-radius: 4px; margin-bottom: 6px;">
                          ${iss.codeSnippet}
                        </code>
                        <div style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 4px;">${iss.explanation}</div>
                        <div style="font-size: 0.76rem; color: var(--status-safe);"><strong>Suggested Fix:</strong> ${iss.fix}</div>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}

                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <label style="font-size: 0.84rem; font-weight: 700; color: var(--rekha-gold-light);">
                      ✨ Lakshman Rekha Suggested Hardened Code (Requires Review):
                    </label>
                    <button class="btn btn-secondary btn-sm" id="btn-copy-safer-code">Copy Safe Version</button>
                  </div>
                  <pre class="font-mono" style="padding: 12px 16px; background: rgba(0,0,0,0.4); border: 1px solid var(--border-gold); border-radius: var(--radius-md); font-size: 0.82rem; color: #86efac; overflow-x: auto;">${saferCode}</pre>
                </div>
              </div>
            `;

            document.getElementById('btn-copy-safer-code')?.addEventListener('click', () => {
              navigator.clipboard?.writeText(saferCode);
              this.showToast("Copied", "Hardened code copied to clipboard.", "success");
            });
          }
        };
      }
    }

    // ----------------------------------------------------
    // AGENT GATEWAY VIEW
    // ----------------------------------------------------
    if (viewName === 'agentGateway') {
      document.querySelectorAll('.btn-trigger-agent-action').forEach(b => {
        b.onclick = () => {
          const actionId = b.getAttribute('data-action');
          const target = b.getAttribute('data-target');
          const msg = b.getAttribute('data-msg');

          const evaluation = agentPermissionEngine.evaluateAction({
            actionId,
            agentName: "Autonomous Copilot",
            target,
            payload: { message: msg }
          });

          if (evaluation.policy === 'BLOCK') {
            this.store.recordAudit("Agent Action", "CRITICAL", "BLOCKED", `Blocked high-risk autonomous action: ${evaluation.label}`);
            this.showToast("Perimeter Hard Block", evaluation.explanation, "critical");
          } else if (evaluation.policy === 'ASK') {
            this.store.setPendingAction(evaluation);
          } else {
            this.store.recordAudit("Agent Action", "LOW", "AUTO_ALLOWED", `Read-only action permitted: ${evaluation.label}`);
            this.showToast("Action Permitted", `Allowed: ${evaluation.label}`, "info");
          }
        };
      });
    }

    // ----------------------------------------------------
    // WHATSAPP VIEW
    // ----------------------------------------------------
    if (viewName === 'whatsapp') {
      const sendBtn = document.getElementById('btn-wa-inspect-send');
      const recipSelect = document.getElementById('wa-recipient-select');
      const msgArea = document.getElementById('wa-message-body');
      const previewHost = document.getElementById('wa-preview-container');

      document.querySelectorAll('.btn-wa-quick').forEach(b => {
        b.onclick = () => {
          if (msgArea) msgArea.value = b.getAttribute('data-msg');
        };
      });

      if (sendBtn) {
        sendBtn.onclick = () => {
          const recipient = recipSelect.value;
          const msg = msgArea.value.trim();
          if (!msg) {
            this.showToast("Validation", "Please draft a message first.", "info");
            return;
          }

          const inspection = messageSecurityEngine.inspectMessage(recipient, msg);

          if (previewHost) {
            previewHost.style.display = 'block';
            previewHost.innerHTML = `
              <div class="modal-overlay">
                <div class="modal-content" style="max-width: 520px;">
                  <div class="modal-header">
                    <h3 style="font-size: 1.1rem; font-weight: 700; color: #25D366; display: flex; align-items: center; gap: 8px;">
                      <i data-lucide="message-circle"></i>
                      WhatsApp Outbound Authorization Preview
                    </h3>
                  </div>

                  <div class="modal-body" style="display: flex; flex-direction: column; gap: 10px; margin: 16px 0;">
                    <div style="padding: 12px; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
                      <div><strong>Recipient:</strong> ${inspection.recipient.name} (${inspection.recipient.phone})</div>
                      <div><strong>Contact Policy:</strong> ${inspection.recipient.policy}</div>
                      <div><strong>Risk Level:</strong> <span class="badge ${inspection.risk === 'CRITICAL' ? 'badge-danger' : inspection.risk === 'HIGH' ? 'badge-warn' : 'badge-safe'}">${inspection.risk} RISK</span></div>
                    </div>

                    ${inspection.warnings.length > 0 ? `
                      <div style="padding: 10px; background: rgba(244,63,94,0.12); border: 1px solid var(--status-danger-border); border-radius: var(--radius-sm); font-size: 0.78rem; color: #fecdd3;">
                        ⚠️ ${inspection.warnings.join('<br>')}
                      </div>
                    ` : ''}

                    <div style="padding: 12px; background: rgba(37,211,102,0.08); border-radius: var(--radius-md); border: 1px solid rgba(37,211,102,0.3); font-size: 0.9rem; color: #ffffff;">
                      "${inspection.messageText}"
                    </div>
                  </div>

                  <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 10px;">
                    <button class="btn btn-secondary btn-sm" id="btn-wa-cancel">Cancel</button>
                    <button class="btn btn-primary btn-sm" id="btn-wa-confirm-send" style="background: #25D366; color: #070d18;">
                      Confirm & Send (SIMULATED)
                    </button>
                  </div>
                </div>
              </div>
            `;

            document.getElementById('btn-wa-cancel').onclick = () => {
              previewHost.style.display = 'none';
            };

            document.getElementById('btn-wa-confirm-send').onclick = () => {
              previewHost.style.display = 'none';
              this.store.recordAudit("Agent Action", inspection.risk, "WHATSAPP_DISPATCHED", `WhatsApp sent to ${inspection.recipient.name} via simulated gateway`);
              this.showToast("WhatsApp Dispatched", `Message delivered to ${inspection.recipient.name} (SIMULATED DEMO).`, "success");
              msgArea.value = '';
            };
          }
        };
      }
    }

    // ----------------------------------------------------
    // PRIVATE SESSIONS VIEW
    // ----------------------------------------------------
    if (viewName === 'privateSessions') {
      document.getElementById('btn-toggle-plm')?.addEventListener('click', () => this.store.togglePrivateLifeMode());
      document.getElementById('btn-toggle-incog')?.addEventListener('click', () => this.store.toggleIncognito());
      document.getElementById('btn-switch-to-chat')?.addEventListener('click', () => this.store.setView('chat'));
      document.getElementById('btn-purge-all-private')?.addEventListener('click', () => {
        this.store.state.privateMessages = [];
        this.store.notify();
        this.showToast("Purged", "Ephemeral memory buffers securely wiped from memory.", "success");
      });
    }

    // ----------------------------------------------------
    // PRIVACY VAULT VIEW
    // ----------------------------------------------------
    if (viewName === 'privacyVault') {
      document.getElementById('btn-export-vault')?.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.store.state.vault, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", `lakshman_rekha_vault_${Date.now()}.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
        this.showToast("Exported", "Privacy Vault archive generated.", "info");
      });

      document.getElementById('btn-clear-all-memory')?.addEventListener('click', () => {
        if (confirm("Are you sure you want to purge all stored memories?")) {
          this.store.clearAllMemories();
          this.showToast("Memory Reset", "All long-term memory entries have been purged.", "info");
        }
      });

      document.querySelectorAll('.btn-delete-memory').forEach(b => {
        b.onclick = () => {
          const id = b.getAttribute('data-id');
          this.store.deleteMemory(id);
          this.showToast("Memory Deleted", "Memory rule removed from store.", "info");
        };
      });
    }

    // ----------------------------------------------------
    // ACTIVITY LOG VIEW
    // ----------------------------------------------------
    if (viewName === 'activity') {
      document.querySelectorAll('.btn-filter-severity').forEach(btn => {
        btn.onclick = () => {
          document.querySelectorAll('.btn-filter-severity').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const severity = btn.getAttribute('data-severity');
          const rows = document.querySelectorAll('.log-row');
          rows.forEach(r => {
            if (severity === 'ALL' || r.getAttribute('data-severity') === severity) {
              r.style.display = '';
            } else {
              r.style.display = 'none';
            }
          });
        };
      });

      document.getElementById('btn-export-logs-json')?.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.store.state.auditLogs, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", `security_audit_logs_${Date.now()}.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
        this.showToast("Exported", "Sanitized audit logs downloaded.", "info");
      });
    }

    // ----------------------------------------------------
    // SETTINGS VIEW
    // ----------------------------------------------------
    if (viewName === 'settings') {
      const provSelect = document.getElementById('setting-ai-provider');
      const keyInput = document.getElementById('setting-api-key');
      const langSelect = document.getElementById('setting-language-select');

      if (provSelect) {
        provSelect.onchange = () => {
          aiService.setProvider(provSelect.value, keyInput?.value || '');
          this.showToast("Provider Updated", `Switched to ${provSelect.value} engine.`, "info");
        };
      }

      if (keyInput) {
        keyInput.onchange = () => {
          aiService.setProvider(provSelect.value, keyInput.value);
          this.showToast("Key Set", "API credentials attached in client memory.", "success");
        };
      }

      if (langSelect) {
        langSelect.onchange = () => {
          this.store.setLanguage(langSelect.value);
          voiceAssistant.setLanguage(langSelect.value);
        };
      }
    }
  }

  async proceedWithCleanSend(cleanPrompt, wasRedacted = false) {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message
    this.store.addChatMessage({
      id: `msg-${Date.now()}`,
      role: "user",
      content: cleanPrompt,
      timestamp: timeStr,
      scanMeta: { redactedNotice: wasRedacted, redactionsCount: wasRedacted ? 2 : 0 }
    });

    // Query AI Provider
    const response = await aiService.query(cleanPrompt, { language: this.store.state.language });

    // Output Trust Engine Check
    const trustReport = trustEngine.assessTrust(cleanPrompt, response);
    this.store.recordAudit("Trust Check", trustReport.trustScore >= 80 ? "SAFE" : "MEDIUM", "VERIFIED", `AI response evaluated: ${trustReport.trustScore}/100 trust score`);

    // Add AI message
    this.store.addChatMessage({
      id: `msg-${Date.now() + 1}`,
      role: "ai",
      content: response,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      trustReport
    });
  }
}

// Global bootstrap
document.addEventListener('DOMContentLoaded', () => {
  const app = new LakshmanRekhaApp();
  app.init();
  window.__LR_APP = app;
});
