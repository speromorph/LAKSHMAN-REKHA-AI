/**
 * LAKSHMAN REKHA AI - Privacy / PII Scanner Service
 * Identifies sensitive personal, financial, and authentication secrets
 * before they can cross the boundary to external AI providers.
 */

export const privacyScanner = {
  detectors: [
    // API Keys and Secrets
    {
      type: "API_KEY",
      category: "Secret",
      label: "API Key",
      regex: /\b(sk-[a-zA-Z0-9_-]{20,}|AKIA[0-9A-Z]{16}|ghp_[a-zA-Z0-9]{36}|AIza[0-9A-Za-z-_]{35})\b/g,
      severity: "CRITICAL"
    },
    // Generic Key/Token Assignments
    {
      type: "API_KEY",
      category: "Secret",
      label: "Secret Key",
      regex: /(?:api[_-]?key|secret[_-]?key|auth[_-]?token|access[_-]?token)\s*[:=]\s*['"]?([a-zA-Z0-9_\-]{16,})['"]?/gi,
      severity: "CRITICAL"
    },
    // Passwords
    {
      type: "PASSWORD",
      category: "Secret",
      label: "Password",
      regex: /(?:password|passwd|pwd)\s*[:=]\s*['"]?([^\s'"]{4,})['"]?/gi,
      severity: "CRITICAL"
    },
    // Emails
    {
      type: "EMAIL",
      category: "PII",
      label: "Email Address",
      regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
      severity: "HIGH"
    },
    // Phone Numbers (Indian & International)
    {
      type: "PHONE",
      category: "PII",
      label: "Phone Number",
      regex: /(?:\+?91[\s-]?)?[6789]\d{4}[\s-]?\d{5}|\b(?:\+?1[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}\b/g,
      severity: "HIGH"
    },
    // Aadhaar Card (India: 12 digits, often in 4-digit groups)
    {
      type: "GOV_ID",
      category: "GovID",
      label: "Aadhaar Card",
      regex: /\b\d{4}\s\d{4}\s\d{4}\b/g,
      severity: "CRITICAL"
    },
    // PAN Card (India: 5 uppercase letters, 4 digits, 1 uppercase letter)
    {
      type: "GOV_ID",
      category: "GovID",
      label: "PAN Card",
      regex: /\b[A-Z]{5}[0-9]{4}[A-Z]\b/g,
      severity: "CRITICAL"
    },
    // US SSN
    {
      type: "GOV_ID",
      category: "GovID",
      label: "SSN",
      regex: /\b\d{3}-\d{2}-\d{4}\b/g,
      severity: "CRITICAL"
    },
    // Credit / Debit Card Numbers (16 digits)
    {
      type: "FINANCIAL",
      category: "Financial",
      label: "Credit Card",
      regex: /\b(?:\d{4}[ -]?){3}\d{4}\b/g,
      severity: "CRITICAL"
    },
    // UPI IDs (e.g., user@okaxis, user@oksbi, user@paytm, user@ybl)
    {
      type: "FINANCIAL",
      category: "Financial",
      label: "UPI ID",
      regex: /\b[a-zA-Z0-9.\-_]{2,64}@(okaxis|oksbi|okhdfc|okicici|paytm|ybl|apl|upi)\b/gi,
      severity: "HIGH"
    },
    // Person Names (Heuristic check for common names or introduction patterns)
    {
      type: "PERSON",
      category: "PII",
      label: "Person Name",
      regex: /(?:my\s+name\s+is|i\s+am|मेरा\s+नाम\s+है?|नाम:)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?|[A-Z][a-z]+)/gi,
      severity: "MEDIUM"
    },
    // Known names standalone (Rahul Sharma, Amit Patel, Priya Singh, John Doe, etc.)
    {
      type: "PERSON",
      category: "PII",
      label: "Person Name",
      regex: /\b(Rahul\s+Sharma|Priya\s+Singh|Amit\s+Patel|Rohit\s+Verma|John\s+Doe|Jane\s+Smith|राहुल\s+शर्मा)\b/gi,
      severity: "MEDIUM"
    }
  ],

  /**
   * Scans text for privacy & PII items
   * @param {string} text
   * @returns {Object} Detected items and metadata
   */
  scanPrivacy(text) {
    if (!text || typeof text !== 'string') {
      return { hasSensitiveData: false, items: [], totalFound: 0, categories: {} };
    }

    const items = [];
    const categories = { PII: 0, Secret: 0, GovID: 0, Financial: 0 };

    for (const detector of this.detectors) {
      const matches = [...text.matchAll(detector.regex)];
      for (const match of matches) {
        const rawValue = match[1] || match[0];
        
        // Prevent duplicate items at the same index
        const exists = items.some(item => item.index === match.index && item.type === detector.type);
        if (!exists) {
          items.push({
            type: detector.type,
            category: detector.category,
            label: detector.label,
            severity: detector.severity,
            rawPreview: this.maskSecret(rawValue, detector.type),
            rawValue: rawValue,
            index: match.index,
            length: match[0].length
          });
          categories[detector.category] = (categories[detector.category] || 0) + 1;
        }
      }
    }

    return {
      hasSensitiveData: items.length > 0,
      items,
      totalFound: items.length,
      categories,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Helper to mask secrets so raw credentials never show in logs
   */
  maskSecret(value, type) {
    if (!value) return "";
    if (type === "API_KEY" || type === "PASSWORD") {
      if (value.length <= 8) return "••••••••";
      return `${value.slice(0, 4)}••••••••${value.slice(-4)}`;
    }
    if (type === "GOV_ID" || type === "FINANCIAL") {
      return `••••••••${value.slice(-4)}`;
    }
    return value; // Emails or names don't need full asterisks in preview
  }
};
