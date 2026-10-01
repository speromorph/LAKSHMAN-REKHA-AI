/**
 * LAKSHMAN REKHA AI - AI-Generated Code Security Scanner
 * Scans code snippets for common vulnerabilities (Hardcoded secrets, SQL injection,
 * eval() execution, command injection, path traversal) and generates safer refactored code.
 */

export const codeSecurityEngine = {
  rules: [
    {
      id: "SEC-001",
      name: "Hardcoded API Key / Secret",
      severity: "CRITICAL",
      regex: /(?:api_key|secret|password|token)\s*=\s*['"][a-zA-Z0-9_\-\.]{8,}['"]/i,
      explanation: "Credentials hardcoded in source code risk public exposure in Git history or client bundles.",
      fix: "Use environment variables: `os.environ.get('API_KEY')` or `process.env.API_KEY`."
    },
    {
      id: "SEC-002",
      name: "SQL Injection Vulnerability",
      severity: "CRITICAL",
      regex: /(?:SELECT|INSERT|UPDATE|DELETE)\s+.*(?:\+|%|\.format|f['"]).*(?:req\.|request|input|params)/i,
      explanation: "Unsanitized user inputs concatenated directly into SQL queries allow arbitrary SQL execution.",
      fix: "Use parameterized queries or ORM: `cursor.execute('SELECT * FROM users WHERE id = %s', (user_id,))`."
    },
    {
      id: "SEC-003",
      name: "Unsafe Dynamic Code Execution (eval)",
      severity: "CRITICAL",
      regex: /\b(eval|exec)\s*\(/i,
      explanation: "Direct execution of arbitrary code strings allows Remote Code Execution (RCE).",
      fix: "Parse structured data safely using `json.loads()` or `JSON.parse()`. Avoid dynamic code evaluation."
    },
    {
      id: "SEC-004",
      name: "Command Injection Risk",
      severity: "HIGH",
      regex: /(?:os\.system|subprocess\.Popen|execSync)\s*\(.*(?:shell\s*=\s*True|\+|f['"]).*\)/i,
      explanation: "Spawning shell commands with unescaped user parameters allows shell injection.",
      fix: "Pass argument arrays without shell=True: `subprocess.run(['ping', '-c', '1', ip_address])`."
    },
    {
      id: "SEC-005",
      name: "Insecure Direct File Traversal",
      severity: "HIGH",
      regex: /(?:open|fs\.readFileSync)\s*\(\s*(?:path|\/|req\.).*\+/i,
      explanation: "Concatenating user-supplied filenames without path normalization allows ../ traversal.",
      fix: "Normalize path with `os.path.basename()` or validate against an allowed directory whitelist."
    }
  ],

  /**
   * Scans code string for security issues
   * @param {string} code
   * @returns {Object} Security report
   */
  scanCode(code) {
    if (!code || typeof code !== 'string') {
      return { score: 100, issues: [], safeCodeProposal: code };
    }

    const lines = code.split('\n');
    const issues = [];
    const severityPoints = { "CRITICAL": 30, "HIGH": 18, "MEDIUM": 10, "LOW": 5 };
    let deducted = 0;

    lines.forEach((line, index) => {
      for (const rule of this.rules) {
        if (rule.regex.test(line)) {
          issues.push({
            ruleId: rule.id,
            name: rule.name,
            severity: rule.severity,
            line: index + 1,
            codeSnippet: line.trim(),
            explanation: rule.explanation,
            fix: rule.fix
          });
          deducted += (severityPoints[rule.severity] || 10);
        }
      }
    });

    const score = Math.max(10, Math.min(100, 100 - deducted));

    return {
      score,
      issues,
      totalIssues: issues.length,
      hasCritical: issues.some(i => i.severity === "CRITICAL"),
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Generates a safer suggested refactor for detected insecure code
   */
  generateSaferVersion(code) {
    let safer = code;
    // Replace hardcoded keys
    safer = safer.replace(/(?:api_key|secret)\s*=\s*['"][a-zA-Z0-9_\-\.]{8,}['"]/i, 
      "api_key = os.getenv('API_KEY')  # [Lakshman Rekha: Extracted to environment variable]");
    // Replace password
    safer = safer.replace(/password\s*=\s*['"][^'"]+['"]/i, 
      "password = os.getenv('DB_PASSWORD')  # [Lakshman Rekha: Masked credential]");
    // Replace eval
    safer = safer.replace(/eval\((.*?)\)/i, 
      "json.loads($1)  # [Lakshman Rekha: Replaced unsafe eval with safe parser]");
    // Replace raw SQL concatenation
    safer = safer.replace(/f"SELECT\s+\*\s+FROM\s+(\w+)\s+WHERE\s+(\w+)\s*=\s*'{(\w+)}'"/i, 
      'cursor.execute("SELECT * FROM $1 WHERE $2 = %s", ($3,))  # [Lakshman Rekha: Parameterized query]');
    return safer;
  }
};
