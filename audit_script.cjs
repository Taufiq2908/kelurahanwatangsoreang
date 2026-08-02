const fs = require('fs');
const path = require('path');

const dir = './apps-script';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') || f.endsWith('.js'));

const report = [];

const sinks = ['innerHTML =', 'outerHTML =', 'insertAdjacentHTML(', 'document.write(', 'createContextualFragment(', 'eval(', 'new Function(', 'setTimeout(', 'setInterval('];
const variables = ['${item.', '${data.', '${res.', '${draft.', '${record.', '${row.'];

report.push("# XSS Security Audit Report");
report.push("## TASK 1 & TASK 2 & TASK 3: Raw Evidence");

files.forEach(file => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check for sinks
        let isSink = sinks.some(sink => line.includes(sink));
        let isVar = variables.some(v => line.includes(v));

        if (isSink || isVar) {
            report.push(`### File: ${file}, Line: ${i + 1}`);
            
            // Check if escaped
            const isEscaped = line.includes('escapeHtml(');
            report.push(`**Escaped:** ${isEscaped ? 'Yes' : 'No'}`);
            
            report.push('```javascript');
            const start = Math.max(0, i - 10);
            const end = Math.min(lines.length, i + 11);
            for (let j = start; j < end; j++) {
                const marker = j === i ? '> ' : '  ';
                report.push(`${marker}${j + 1}: ${lines[j]}`);
            }
            report.push('```');
        }
    }
});

fs.writeFileSync('audit_evidence.md', report.join('\n'));
console.log('Evidence generated.');
