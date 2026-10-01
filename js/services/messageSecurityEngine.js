/**
 * LAKSHMAN REKHA AI - Secure WhatsApp Messaging Engine
 * Validates outgoing message content, checks recipient risk tier,
 * provides explicit confirmation dialog, and simulates/dispatches via official API abstraction.
 */

import { securityScanner } from './securityScanner.js';
import { privacyScanner } from './privacyScanner.js';

export const messageSecurityEngine = {
  // Pre-configured contacts with risk policies
  contacts: [
    { id: "c1", name: "Rahul (Colleague)", phone: "+91 98765 43210", category: "Work", policy: "Always Preview", avatar: "R" },
    { id: "c2", name: "Mom", phone: "+91 98111 22334", category: "Family", policy: "Confirmation Required", avatar: "M" },
    { id: "c3", name: "Priya (Friend)", phone: "+91 99223 34455", category: "Friends", policy: "Confirmation Required", avatar: "P" },
    { id: "c4", name: "Unknown Vendor (+91 91234 56789)", phone: "+91 91234 56789", category: "Unknown", policy: "Restricted - Never Auto-send", avatar: "?" }
  ],

  /**
   * Prepares and inspects an outgoing WhatsApp message
   * @param {string} recipientName
   * @param {string} rawMessage
   * @returns {Object} Inspection report & authorization object
   */
  inspectMessage(recipientName, rawMessage) {
    const contact = this.contacts.find(c => c.name.toLowerCase().includes(recipientName.toLowerCase())) || {
      id: "unknown",
      name: recipientName || "Unknown Contact",
      phone: "Unlisted",
      category: "Unknown",
      policy: "Restricted - Explicit Authorization Required",
      avatar: "?"
    };

    const secScan = securityScanner.scanPrompt(rawMessage);
    const privScan = privacyScanner.scanPrivacy(rawMessage);

    let risk = "LOW";
    if (contact.category === "Unknown") risk = "MEDIUM";
    if (privScan.hasSensitiveData) risk = "HIGH";
    if (!secScan.isSafe) risk = "CRITICAL";

    return {
      recipient: contact,
      messageText: rawMessage,
      risk,
      secScan,
      privScan,
      requiresConfirmation: true,
      canSend: secScan.isSafe && !privScan.items.some(i => i.type === "API_KEY" || i.type === "PASSWORD"),
      warnings: [
        ...(privScan.hasSensitiveData ? [`Contains sensitive data: ${privScan.items.map(i => i.label).join(', ')}`] : []),
        ...(!secScan.isSafe ? ["Potential adversarial or malicious text detected in outgoing message."] : []),
        ...(contact.category === "Unknown" ? ["Recipient is not in your verified contact list."] : [])
      ]
    };
  }
};
