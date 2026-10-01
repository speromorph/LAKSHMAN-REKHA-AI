/**
 * LAKSHMAN REKHA AI - Security Scanner Service
 * Detects: Prompt Injection, Jailbreak attempts, Malicious instructions,
 * Suspicious URLs, Dangerous actions. Supports English and Hindi.
 */

export const securityScanner = {
  // Common threat signatures in English and Hindi
  injectionPatterns: [
    // English prompt injection / jailbreak
    { regex: /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|prompts|rules)/i, type: "Prompt Injection", severity: "CRITICAL", confidence: 0.98, explanation: "Attempt to override system boundaries and instructions." },
    { regex: /reveal\s+(your\s+)?(system\s+prompt|initial\s+prompt|developer\s+mode)/i, type: "Prompt Injection", severity: "CRITICAL", confidence: 0.95, explanation: "Attempt to exfiltrate proprietary system instructions." },
    { regex: /you\s+are\s+now\s+(DAN|unrestricted|jailbroken|evil\s+bot|developer\s+mode)/i, type: "Jailbreak Attempt", severity: "CRITICAL", confidence: 0.96, explanation: "Adversarial persona adoption attempting to bypass safety guardrails." },
    { regex: /bypass\s+(all\s+)?(filters|rules|safety|guidelines)/i, type: "Jailbreak Attempt", severity: "HIGH", confidence: 0.92, explanation: "Explicit attempt to disable safety layers." },
    { regex: /execute\s+arbitrary\s+code|drop\s+database|format\s+c:|rm\s+-rf/i, type: "Malicious Instruction", severity: "CRITICAL", confidence: 0.99, explanation: "Destructive system-level command injection detected." },
    { regex: /curl\s+-s\s+https?:\/\/|wget\s+https?:\/\/|nc\s+-e/i, type: "Suspicious Payload", severity: "HIGH", confidence: 0.91, explanation: "Remote shell or payload download attempt detected." },
    { regex: /steal\s+(credentials|tokens|passwords|keys)|exfiltrate\s+data/i, type: "Social Engineering", severity: "HIGH", confidence: 0.89, explanation: "Instruction targeting credential theft or exfiltration." },
    
    // Hindi prompt injection & jailbreak patterns (हिंदी)
    { regex: /पिछली\s+(सभी\s+)?instructions\s+को\s+ignore\s+करो/i, type: "Prompt Injection (Hindi)", severity: "CRITICAL", confidence: 0.98, explanation: "सिस्टम निर्देशों को ओवरराइड करने का प्रयास (Attempt to override system prompt)." },
    { regex: /system\s+prompt\s+बताओ|गुप्त\s+निर्देश\s+दिखाओ/i, type: "Prompt Injection (Hindi)", severity: "CRITICAL", confidence: 0.97, explanation: "सिस्टम के आंतरिक प्रॉम्प्ट को चुराने का प्रयास।" },
    { regex: /सारे\s+नियम\s+तोड़\s+दो|बिना\s+किसी\s+रोक-टोक\s+के\s+काम\s+करो/i, type: "Jailbreak Attempt (Hindi)", severity: "CRITICAL", confidence: 0.94, explanation: "सुरक्षा सीमाओं को दरकिनार करने का प्रयास।" },
    { regex: /पासवर्ड\s+चुराओ|डेटा\s+हैक\s+करो/i, type: "Malicious Instruction (Hindi)", severity: "HIGH", confidence: 0.92, explanation: "दुर्भावनापूर्ण हैकिंग निर्देश का पता चला।" }
  ],

  urlRegex: /https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?/gi,

  /**
   * Main scan method
   * @param {string} text - User prompt
   * @returns {Object} Threat report
   */
  scanPrompt(text) {
    if (!text || typeof text !== 'string') {
      return { isSafe: true, riskLevel: "LOW", threats: [], score: 100, recommendations: [] };
    }

    const detectedThreats = [];
    let highestSeverity = "LOW";
    const severityRank = { "LOW": 1, "MEDIUM": 2, "HIGH": 3, "CRITICAL": 4 };

    // Check injection patterns
    for (const pattern of this.injectionPatterns) {
      if (pattern.regex.test(text)) {
        detectedThreats.push({
          type: pattern.type,
          severity: pattern.severity,
          confidence: pattern.confidence,
          explanation: pattern.explanation,
          matchedRule: pattern.regex.toString(),
          action: pattern.severity === "CRITICAL" ? "BLOCK" : "SANITIZE"
        });

        if (severityRank[pattern.severity] > severityRank[highestSeverity]) {
          highestSeverity = pattern.severity;
        }
      }
    }

    // Check suspicious URLs
    const urls = text.match(this.urlRegex) || [];
    for (const url of urls) {
      if (/(bit\.ly|tinyurl\.com|ngrok\.io|webhook\.site|pastebin\.com|temp-mail)/i.test(url)) {
        detectedThreats.push({
          type: "Suspicious External Endpoint",
          severity: "HIGH",
          confidence: 0.88,
          explanation: `URL (${url}) directs to an anonymous tunneling or temporary staging domain.`,
          matchedRule: url,
          action: "SANITIZE"
        });
        if (severityRank["HIGH"] > severityRank[highestSeverity]) {
          highestSeverity = "HIGH";
        }
      }
    }

    const isSafe = detectedThreats.length === 0;
    const recommendations = [];

    if (!isSafe) {
      recommendations.push("Lakshman Rekha recommends blocking direct transmission of adversarial payload to the LLM.");
      recommendations.push("Sanitize system prompt tokens before continuing.");
    } else {
      recommendations.push("Prompt passed Lakshman Rekha perimeter inspection. Safe for inference.");
    }

    // Calculate score (0-100)
    let score = 100;
    if (highestSeverity === "CRITICAL") score = 15;
    else if (highestSeverity === "HIGH") score = 45;
    else if (highestSeverity === "MEDIUM") score = 70;
    else if (highestSeverity === "LOW" && detectedThreats.length > 0) score = 85;

    return {
      isSafe,
      riskLevel: highestSeverity,
      threats: detectedThreats,
      score,
      recommendations,
      timestamp: new Date().toISOString()
    };
  }
};
