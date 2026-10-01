/**
 * LAKSHMAN REKHA AI - Automatic Data Redaction Engine
 * Transforms sensitive data into safe boundary placeholders like [PERSON], [EMAIL], [API_KEY].
 * Ensures raw credentials never leak beyond the boundary.
 */

import { privacyScanner } from './privacyScanner.js';

export const redactionEngine = {
  /**
   * Redacts all detected sensitive entities in text
   * @param {string} text - Original input
   * @param {Array} allowedTypes - Types user explicitly chose to keep
   * @returns {Object} Redacted string and mapping dictionary
   */
  redact(text, allowedTypes = []) {
    if (!text || typeof text !== 'string') {
      return { redactedText: text, redactionsCount: 0, replacements: [] };
    }

    const scan = privacyScanner.scanPrivacy(text);
    if (!scan.hasSensitiveData) {
      return { redactedText: text, redactionsCount: 0, replacements: [] };
    }

    // Sort items backwards by index to replace without messing up offsets
    const sortedItems = [...scan.items]
      .filter(item => !allowedTypes.includes(item.type))
      .sort((a, b) => b.index - a.index);

    let redacted = text;
    const replacements = [];

    for (const item of sortedItems) {
      const placeholder = `[${item.type}]`;
      const before = redacted.slice(0, item.index);
      const after = redacted.slice(item.index + item.length);
      redacted = before + placeholder + after;

      replacements.push({
        type: item.type,
        label: item.label,
        placeholder,
        maskedOriginal: privacyScanner.maskSecret(item.rawValue, item.type)
      });
    }

    return {
      redactedText: redacted,
      redactionsCount: replacements.length,
      replacements: replacements.reverse()
    };
  },

  /**
   * Mask a secret string for safe UI presentation
   */
  maskDisplay(secret) {
    if (!secret) return "";
    if (secret.length <= 8) return "••••••••";
    return `${secret.slice(0, 4)}••••••••••${secret.slice(-4)}`;
  }
};
