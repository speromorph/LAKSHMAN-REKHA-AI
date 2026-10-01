/**
 * LAKSHMAN REKHA AI - Data Minimization Engine
 * Identifies extraneous personal / contextual details before sending data
 * to third-party AI models. Minimizes data exposure by principle of least privilege.
 */

export const dataMinimizer = {
  // Common personal preamble patterns that are irrelevant to most AI task queries
  preamblePatterns: [
    { regex: /my\s+name\s+is\s+[^,\.\n]+[,\.]?\s*/i, category: "Name / Identity" },
    { regex: /i\s+live\s+in\s+[^,\.\n]+[,\.]?\s*/i, category: "Location" },
    { regex: /i('m|\s+am)\s+(an?\s+)?(engineering\s+student|student|developer|doctor|lawyer|individual)[,\.]?\s*/i, category: "Student / Occupation Identity" },
    { regex: /i\s+am\s+\d{1,2}\s+years\s+old[,\.]?\s*/i, category: "Age" },
    { regex: /मेरा\s+नाम\s+[^,\.\n]+है[,\.]?\s*/i, category: "नाम (Name)" },
    { regex: /मैं\s+[^,\.\n]+में\s+रहता\s+हूँ[,\.]?\s*/i, category: "स्थान (Location)" }
  ],

  /**
   * Analyze input for minimizable extraneous context
   * @param {string} text
   * @returns {Object} Minimization recommendation and cleaned query
   */
  minimize(text) {
    if (!text || typeof text !== 'string') {
      return { canMinimize: false, original: text, minimized: text, detectedFluff: [] };
    }

    const detectedFluff = [];
    let minimized = text;

    for (const pattern of this.preamblePatterns) {
      const match = minimized.match(pattern.regex);
      if (match) {
        detectedFluff.push({
          category: pattern.category,
          text: match[0].trim()
        });
        minimized = minimized.replace(pattern.regex, '').trim();
      }
    }

    // Capitalize first letter of cleaned text if needed
    if (minimized.length > 0) {
      minimized = minimized.charAt(0).toUpperCase() + minimized.slice(1);
    }

    return {
      canMinimize: detectedFluff.length > 0 && minimized.length > 10,
      original: text,
      minimized: minimized || text,
      detectedFluff,
      reductionPercentage: Math.round(((text.length - (minimized || text).length) / text.length) * 100)
    };
  }
};
