/**
 * LAKSHMAN REKHA AI - AI Agent Permission Gateway Engine
 * Enforces boundary containment on autonomous AI agents.
 * Categorizes actions into LOW RISK, MEDIUM RISK, HIGH RISK, and BLOCKED.
 * Prevents silent or consequential execution without explicit human approval.
 */

export const agentPermissionEngine = {
  // Action policies registry
  actionPolicies: {
    "read_public_webpage": { risk: "LOW", policy: "ALLOW", label: "Read Public Webpage", icon: "globe" },
    "summarize_document": { risk: "LOW", policy: "ALLOW", label: "Summarize Public Document", icon: "file-text" },
    "query_search_index": { risk: "LOW", policy: "ALLOW", label: "Read Search Engine Index", icon: "search" },
    
    "send_whatsapp_message": { risk: "MEDIUM", policy: "ASK", label: "Send WhatsApp Message", icon: "message-circle" },
    "send_email": { risk: "MEDIUM", policy: "ASK", label: "Send Email Communication", icon: "mail" },
    "access_private_file": { risk: "MEDIUM", policy: "ASK", label: "Access Local / Private File", icon: "folder" },
    "schedule_calendar_event": { risk: "MEDIUM", policy: "ASK", label: "Modify Calendar Schedule", icon: "calendar" },

    "delete_file": { risk: "CRITICAL", policy: "BLOCK", label: "Delete File / System Object", icon: "trash-2" },
    "access_password": { risk: "CRITICAL", policy: "BLOCK", label: "Read Stored Passwords / Keys", icon: "key" },
    "financial_transaction": { risk: "CRITICAL", policy: "BLOCK", label: "Execute Financial Payment", icon: "credit-card" },
    "execute_shell_command": { risk: "CRITICAL", policy: "BLOCK", label: "Execute Arbitrary Shell Command", icon: "terminal" }
  },

  /**
   * Evaluates an agent action request
   * @param {Object} actionRequest - { actionId, target, payload, agentName }
   * @returns {Object} Boundary evaluation decision
   */
  evaluateAction(actionRequest) {
    const policy = this.actionPolicies[actionRequest.actionId] || {
      risk: "HIGH",
      policy: "ASK",
      label: actionRequest.actionId || "Unknown Action",
      icon: "alert-triangle"
    };

    let decision = "REQUIRES_APPROVAL";
    if (policy.policy === "ALLOW") decision = "ALLOWED";
    if (policy.policy === "BLOCK") decision = "BLOCKED";

    return {
      actionId: actionRequest.actionId,
      agentName: actionRequest.agentName || "Autonomous Assistant",
      target: actionRequest.target || "N/A",
      payload: actionRequest.payload || {},
      risk: policy.risk,
      policy: policy.policy,
      label: policy.label,
      decision,
      requiresModal: policy.policy === "ASK",
      explanation: policy.policy === "BLOCK"
        ? `Lakshman Rekha strictly prohibits autonomous execution of ${policy.label}.`
        : policy.policy === "ASK"
        ? `Consequential action requires explicit human verification and authorization.`
        : `Safe read-only operation permitted by policy.`
    };
  }
};
