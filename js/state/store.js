/**
 * LAKSHMAN REKHA AI - Central Reactive State Store
 * Manages global application state, audit events, privacy vault items,
 * metric aggregates, and event subscribers.
 */

export const store = {
  state: {
    currentView: 'landing',
    language: 'en',
    theme: 'dark',
    highContrast: false,
    
    // Privacy and Session Controls
    isPrivateLifeMode: false,
    isIncognitoSession: false,
    privacyStrictness: 'Strict', // Standard, Strict, Maximum

    // Trust & Safety Metric Aggregates
    metrics: {
      threatsBlocked: 14,
      piiProtected: 28,
      secretsDetected: 9,
      claimsChecked: 42,
      agentActionsBlocked: 7,
      messagesReviewed: 19,
      
      securityScore: 91,
      privacyScore: 94,
      aiTrustScore: 82,
      agentSafetyScore: 88
    },

    // Chat History (Main session)
    chatMessages: [
      {
        id: "msg-1",
        role: "ai",
        content: "Lakshman Rekha AI active. All interactions are protected against prompt injection, PII exfiltration, and unauthorized agent actions.",
        timestamp: "10:30 AM",
        scanMeta: { isSafe: true, riskLevel: "LOW", piiCount: 0 }
      }
    ],

    // Private Session Temporary Messages
    privateMessages: [],

    // Saved Memories (Explicitly authorized)
    memories: [
      { id: "mem-1", text: "User prefers technical explanations with code snippets.", date: "2026-09-28", status: "Approved" },
      { id: "mem-2", text: "Default region is Asia-Pacific (Mumbai).", date: "2026-09-29", status: "Approved" }
    ],

    // Privacy Vault Entries
    vault: {
      personal: [
        { key: "Preferred Name", value: "Anush", category: "Profile" },
        { key: "Email Address", value: "anush@example.com", category: "Contact" },
        { key: "Country/Region", value: "India", category: "Location" }
      ],
      secrets: [
        { key: "OpenAI Project Key", maskedValue: "sk-••••••••••89b2", type: "API_KEY" },
        { key: "AWS Production S3 Access", maskedValue: "AKIA••••••••••X9QZ", type: "API_KEY" },
        { key: "Stripe Webhook Secret", maskedValue: "whsec_••••••••••41bc", type: "API_KEY" }
      ],
      connectedServices: [
        { name: "WhatsApp Business Gateway", status: "Active (Simulation)", access: "Preview Required" },
        { name: "Local File System Sandbox", status: "Restricted", access: "Read-Only" }
      ]
    },

    // Audit Logs
    auditLogs: [
      { id: "log-1", time: "10:45 AM", type: "Agent Action", severity: "LOW", status: "USER_APPROVAL_REQUIRED", summary: "WhatsApp message draft requested for Rahul" },
      { id: "log-2", time: "10:41 AM", type: "Trust Check", severity: "SAFE", status: "VERIFIED", summary: "Factual claim verified: Eiffel Tower 1889 reference" },
      { id: "log-3", time: "10:35 AM", type: "Privacy Shield", severity: "CRITICAL", status: "PROTECTED", summary: "API Key detected and redacted before transmission" },
      { id: "log-4", time: "10:32 AM", type: "Security Defense", severity: "HIGH", status: "BLOCKED", summary: "Prompt injection attempt detected and neutralized" }
    ],

    // Pending Action Request (Modal trigger)
    pendingAction: null,

    // Active Notifications
    notifications: [
      { id: "notif-1", title: "Lakshman Rekha Active", message: "Perimeter shield running at Maximum strictness.", time: "Just now", type: "info" }
    ]
  },

  listeners: [],

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  },

  // State Mutators
  setView(viewName) {
    this.state.currentView = viewName;
    this.notify();
  },

  setLanguage(lang) {
    this.state.language = lang;
    this.notify();
  },

  toggleTheme() {
    this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.state.theme);
    this.notify();
  },

  toggleContrast() {
    this.state.highContrast = !this.state.highContrast;
    document.documentElement.setAttribute('data-contrast', this.state.highContrast ? 'high' : 'normal');
    this.notify();
  },

  togglePrivateLifeMode() {
    this.state.isPrivateLifeMode = !this.state.isPrivateLifeMode;
    this.notify();
  },

  toggleIncognito() {
    this.state.isIncognitoSession = !this.state.isIncognitoSession;
    if (!this.state.isIncognitoSession) {
      this.state.privateMessages = [];
    }
    this.notify();
  },

  addChatMessage(msg) {
    if (this.state.isIncognitoSession) {
      this.state.privateMessages.push(msg);
    } else {
      this.state.chatMessages.push(msg);
    }
    this.notify();
  },

  clearChat() {
    if (this.state.isIncognitoSession) {
      this.state.privateMessages = [];
    } else {
      this.state.chatMessages = [];
    }
    this.notify();
  },

  recordAudit(eventType, severity, status, summary) {
    const entry = {
      id: `log-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: eventType,
      severity,
      status,
      summary
    };
    this.state.auditLogs.unshift(entry);
    
    // Increment metrics
    if (status === 'BLOCKED') this.state.metrics.threatsBlocked++;
    if (eventType === 'Privacy Shield') this.state.metrics.piiProtected++;
    if (eventType === 'Trust Check') this.state.metrics.claimsChecked++;
    if (eventType === 'Agent Action' && status === 'BLOCKED') this.state.metrics.agentActionsBlocked++;
    if (eventType === 'Agent Action' && status.includes('APPROVED')) this.state.metrics.messagesReviewed++;

    this.notify();
  },

  setPendingAction(action) {
    this.state.pendingAction = action;
    this.notify();
  },

  addNotification(title, message, type = 'info') {
    this.state.notifications.unshift({
      id: `notif-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      type
    });
    this.notify();
  },

  deleteMemory(id) {
    this.state.memories = this.state.memories.filter(m => m.id !== id);
    this.notify();
  },

  clearAllMemories() {
    this.state.memories = [];
    this.notify();
  }
};
