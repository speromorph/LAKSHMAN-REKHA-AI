/**
 * LAKSHMAN REKHA AI - Global Command Palette (⌘K / Ctrl+K)
 * Fast fuzzy search and keyboard navigation across views, tools, actions, and documentation.
 */

export class CommandPalette {
  constructor(appInstance) {
    this.app = appInstance;
    this.isOpen = false;
    this.selectedIndex = 0;
    this.filteredItems = [];
    this.container = null;
    this.inputEl = null;
    this.resultsEl = null;

    this.commands = [
      // Views & Operations
      { id: 'view-landing', category: 'Navigation', icon: '🛡️', title: 'Protection Overview', desc: 'Hero boundary, threat simulator, and architecture', view: 'landing' },
      { id: 'view-dashboard', category: 'Navigation', icon: '📊', title: 'Protection Command Center', desc: 'Security scores, live perimeter metrics, and active threats', view: 'dashboard' },
      { id: 'view-chat', category: 'Navigation', icon: '💬', title: 'AI Chat Gateway', desc: 'Protected conversation with real-time perimeter filtering', view: 'chat' },
      { id: 'view-securityScanner', category: 'Navigation', icon: '🚨', title: 'Security Scanner', desc: 'Detect adversarial injections, jailbreaks, and malicious payloads', view: 'securityScanner' },
      { id: 'view-privacyShield', category: 'Navigation', icon: '🔒', title: 'Privacy Shield', desc: 'Real-time zero-leak PII redaction and entity minimization', view: 'privacyShield' },
      { id: 'view-trustCenter', category: 'Navigation', icon: '🎯', title: 'Trust Center', desc: 'AI answer verification, evidence check, and claim validation', view: 'trustCenter' },
      { id: 'view-codeSecurity', category: 'Navigation', icon: '💻', title: 'Code Security', desc: 'Scan code for leaked secrets, API keys, and SSRF flaws', view: 'codeSecurity' },
      { id: 'view-agentGateway', category: 'Navigation', icon: '🤖', title: 'AI Agent Permissions', desc: 'Boundary authorization for agent tools and external actions', view: 'agentGateway' },
      { id: 'view-whatsapp', category: 'Navigation', icon: '📱', title: 'WhatsApp Gateway', desc: 'Human-in-the-loop preview and verification before sending', view: 'whatsapp' },
      { id: 'view-privateSessions', category: 'Navigation', icon: '🕶️', title: 'Private Life Mode', desc: 'Zero-retention ephemeral session with complete data shielding', view: 'privateSessions' },
      { id: 'view-privacyVault', category: 'Navigation', icon: '🗄️', title: 'Privacy Vault', desc: 'Inspect encrypted PII, masked credentials, and active services', view: 'privacyVault' },
      { id: 'view-activity', category: 'Navigation', icon: '📜', title: 'Security Audit Log', desc: 'Comprehensive event ledger with timestamps and risk scores', view: 'activity' },
      { id: 'view-settings', category: 'Navigation', icon: '⚙️', title: 'Settings', desc: 'Perimeter sensitivity, AI providers, and language configuration', view: 'settings' },

      // Quick Actions
      { id: 'act-sim-threat', category: 'Actions', icon: '⚡', title: 'Simulate Threat Injection', desc: 'Fire an adversarial projectile at the digital perimeter', action: () => {
        this.app.navigateTo('landing');
        setTimeout(() => {
          const btn = document.getElementById('btn-run-simulation');
          if (btn) btn.click();
        }, 300);
      }},
      { id: 'act-lang-toggle', category: 'Actions', icon: '🌐', title: 'Switch Language (English / हिन्दी)', desc: 'Toggle bilingual UI between English and Hindi', action: () => {
        const newLang = this.app.store.state.language === 'en' ? 'hi' : 'en';
        this.app.store.setLanguage(newLang);
      }},
      { id: 'act-private-mode', category: 'Actions', icon: '🕶️', title: 'Toggle Private Life Mode', desc: 'Enable maximum privacy and disable memory retention', action: () => {
        this.app.store.togglePrivateLifeMode();
        this.app.showToast('Private Mode Updated', `Private Life Mode is now ${this.app.store.state.isPrivateLifeMode ? 'ACTIVE' : 'OFF'}`);
      }},

      // Help & Documentation
      { id: 'help-injection', category: 'Documentation', icon: '❓', title: 'What is Prompt Injection?', desc: 'Adversarial manipulation forcing AI models to ignore rules', action: () => {
        this.app.showToast('Documentation', 'Prompt Injection is an adversarial attack where malicious text overrides AI system guardrails.');
      }},
      { id: 'help-lakshman', category: 'Documentation', icon: '❓', title: 'Why "Lakshman Rekha"?', desc: 'Symbolic boundary representing unbreakable protection and strict control', action: () => {
        this.app.showToast('Metaphor', 'The Lakshman Rekha represents a digital protective perimeter between untrusted data and AI models.');
      }},
      { id: 'help-api-key', category: 'Documentation', icon: '❓', title: 'How are API Keys Protected?', desc: 'Regex & entropy scanning replaces secrets with [REDACTED]', action: () => {
        this.app.navigateTo('privacyShield');
      }}
    ];

    this.initDOM();
    this.setupGlobalShortcuts();
  }

  initDOM() {
    this.container = document.createElement('div');
    this.container.className = 'cmd-palette-backdrop';
    this.container.id = 'global-command-palette';
    this.container.innerHTML = `
      <div class="cmd-palette-dialog" role="dialog" aria-modal="true" aria-label="Command Palette">
        <div class="cmd-search-input-wrap">
          <span style="font-size: 1.1rem; color: var(--rekha-gold);">🔍</span>
          <input type="text" class="cmd-search-input" id="cmd-input" placeholder="Search Lakshman Rekha features, tools, or actions... (Esc to close)" autocomplete="off" />
          <span class="kbd-shortcut">ESC</span>
        </div>
        <div class="cmd-results-list" id="cmd-results"></div>
        <div style="padding: 10px 18px; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; font-size: 0.72rem; color: var(--text-dim); background: rgba(5,7,13,0.6);">
          <span>Navigate with <kbd class="kbd-shortcut">↑</kbd> <kbd class="kbd-shortcut">↓</kbd></span>
          <span>Select with <kbd class="kbd-shortcut">↵ Enter</kbd></span>
        </div>
      </div>
    `;

    document.body.appendChild(this.container);

    this.inputEl = this.container.querySelector('#cmd-input');
    this.resultsEl = this.container.querySelector('#cmd-results');

    // Click outside to close
    this.container.addEventListener('click', (e) => {
      if (e.target === this.container) {
        this.close();
      }
    });

    // Input events
    this.inputEl.addEventListener('input', () => {
      this.filter(this.inputEl.value);
    });

    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredItems.length - 1);
        this.renderResults();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
        this.renderResults();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        this.executeCurrent();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
      }
    });
  }

  setupGlobalShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.container.classList.add('open');
    this.inputEl.value = '';
    this.filter('');
    setTimeout(() => this.inputEl.focus(), 50);
  }

  close() {
    this.isOpen = false;
    this.container.classList.remove('open');
  }

  filter(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      this.filteredItems = [...this.commands];
    } else {
      this.filteredItems = this.commands.filter(cmd => {
        return cmd.title.toLowerCase().includes(q) ||
               cmd.desc.toLowerCase().includes(q) ||
               cmd.category.toLowerCase().includes(q);
      });
    }
    this.selectedIndex = 0;
    this.renderResults();
  }

  renderResults() {
    if (this.filteredItems.length === 0) {
      this.resultsEl.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-dim); font-size: 0.88rem;">
          No matching features or actions found for your search.
        </div>
      `;
      return;
    }

    let html = '';
    let currentCat = '';

    this.filteredItems.forEach((item, idx) => {
      if (item.category !== currentCat) {
        currentCat = item.category;
        html += `<div class="cmd-category-title">${currentCat}</div>`;
      }

      const isSel = idx === this.selectedIndex;
      html += `
        <div class="cmd-item ${isSel ? 'selected' : ''}" data-index="${idx}">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 1.15rem;">${item.icon}</span>
            <div>
              <div style="font-weight: 600; color: ${isSel ? 'var(--rekha-gold-light)' : 'var(--text-primary)'};">${item.title}</div>
              <div style="font-size: 0.74rem; color: var(--text-muted);">${item.desc}</div>
            </div>
          </div>
          <span style="font-size: 0.72rem; color: var(--text-dim); font-family: 'JetBrains Mono', monospace;">${item.category}</span>
        </div>
      `;
    });

    this.resultsEl.innerHTML = html;

    // Attach click listeners to rows
    this.resultsEl.querySelectorAll('.cmd-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        this.selectedIndex = idx;
        this.executeCurrent();
      });
    });

    // Scroll selected into view
    const selectedEl = this.resultsEl.querySelector('.cmd-item.selected');
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }

  executeCurrent() {
    const item = this.filteredItems[this.selectedIndex];
    if (!item) return;

    this.close();

    if (item.view) {
      this.app.navigateTo(item.view);
    } else if (item.action) {
      item.action();
    }
  }
}
