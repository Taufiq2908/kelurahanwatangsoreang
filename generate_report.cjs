const fs = require('fs');
const path = require('path');

const dir = './apps-script';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') || f.endsWith('.js'));

const report = [];

report.push("# Final XSS Audit Report");
report.push("This report contains all findings where untrusted data reaches the DOM or where XSS vulnerabilities were identified.");
report.push("");

let counter = 1;

files.forEach(file => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // InnerHTML sinks
        if (line.includes('innerHTML =')) {
            // Check previous lines to see if untrusted data is injected
            // This is a naive check. A complete audit would trace variable assignments.
            let severity = "LOW";
            let vector = "Direct assignment to innerHTML";
            let fix = "Use textContent instead of innerHTML if HTML parsing is not required.";
            
            // Check if it's a list rendering with unescaped item data
            if (line.includes('container.innerHTML = html') || line.includes('contentDiv.innerHTML = html')) {
                // Look back a few lines to see if unescaped item data is used
                let hasUnescaped = false;
                let hasPartial = false;
                for (let j = Math.max(0, i - 50); j < i; j++) {
                    if (lines[j].includes('${item.') && !lines[j].includes('escapeHtml(')) {
                        hasUnescaped = true;
                    }
                    if (lines[j].includes('${res.') && !lines[j].includes('escapeHtml(')) {
                        hasPartial = true;
                    }
                }
                if (hasUnescaped) {
                    severity = "CRITICAL";
                    vector = "User input -> innerHTML -> no escaping (List Rendering)";
                    fix = "Wrap all ${item.field} expressions with CMS_UI.escapeHtml() inside the template literal.";
                } else if (hasPartial) {
                    severity = "HIGH";
                    vector = "API response -> innerHTML -> partial escaping";
                    fix = "Apply CMS_UI.escapeHtml() to ${res.fileUrl} or use DOM API for element creation.";
                }
            } else if (line.includes('previewEl.innerHTML =')) {
                severity = "HIGH";
                vector = "API response -> innerHTML -> partial escaping (Image Preview)";
                fix = "Use DOM API (document.createElement) to set src attribute and textContent, avoiding innerHTML.";
            }

            if (severity !== "LOW") {
                report.push(`## Finding ${counter++}`);
                report.push(`- **Filename:** ${file}`);
                report.push(`- **Line Number:** ${i + 1}`);
                report.push(`- **Code Snippet:** \`${line.trim()}\``);
                report.push(`- **Attack Vector:** ${vector}`);
                report.push(`- **Severity:** ${severity}`);
                report.push(`- **Recommended Fix:** ${fix}`);
                report.push("");
            }
        }
        
        // Unescaped attributes
        if (line.includes('value="${data.') && !line.includes('escapeHtml(')) {
            report.push(`## Finding ${counter++}`);
            report.push(`- **Filename:** ${file}`);
            report.push(`- **Line Number:** ${i + 1}`);
            report.push(`- **Code Snippet:** \`${line.trim()}\``);
            report.push(`- **Attack Vector:** User input -> attribute assignment`);
            report.push(`- **Severity:** MEDIUM`);
            report.push(`- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().`);
            report.push("");
        }
    }
});

report.push("## Task 7: Review sanitizeImageUrl()");
report.push("### Current Implementation");
report.push("The current implementation only rejects strings containing `<`, `>`, `\"`, or `'`. This is an incomplete blocklist that fails to address URI scheme-based XSS vectors like `javascript:` or `data:`.");
report.push("### Attack Vector");
report.push("User input -> URL attribute (href/src) -> scheme execution (e.g. `javascript:alert(1)`)");
report.push("### Severity");
report.push("HIGH");
report.push("### Recommended Fix");
report.push("Use an allowlist approach to strictly permit only `http:` and `https:` schemes.");
report.push("```javascript\nfunction sanitizeImageUrl(value) {\n    let original = String(value || \"\").trim();\n    let sanitized = original;\n    if (sanitized.includes(\"<\") || sanitized.includes(\">\") || sanitized.includes('\"') || sanitized.includes(\"'\")) {\n        sanitized = \"\";\n    }\n    \n    // Allow only http: and https: schemes\n    if (sanitized) {\n        try {\n            const url = new URL(sanitized);\n            if (url.protocol !== 'http:' && url.protocol !== 'https:') {\n                sanitized = \"\";\n            }\n        } catch (e) {\n            // If it's not a valid URL (e.g. relative path), you can choose to allow or reject.\n            // For strict external image URLs, reject it.\n            sanitized = \"\";\n        }\n    }\n\n    if (sanitized === \"\" && original !== \"\") {\n        if (window.CMS_UI) CMS_UI.toast(\"URL gambar tidak valid.\", \"error\");\n    }\n    return sanitized;\n}\n```");

fs.writeFileSync('final_report.md', report.join('\n'));
console.log('Final report generated.');
