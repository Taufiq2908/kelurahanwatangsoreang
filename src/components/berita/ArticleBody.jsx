/**
 * ArticleBody — renders long-form article content.
 * Content format: plain text with double-newline paragraph breaks.
 */

export default function ArticleBody({ content, className = '' }) {
  if (!content) return null

  const paragraphs = content
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className={`space-y-4 ${className}`}>
      {paragraphs.map((para, i) => {
        // Check if it's a heading-like line (short, ends without period)
        const isHeading = para.length < 80 && !para.endsWith('.') && !para.endsWith(',') && i > 0

        if (isHeading) {
          return (
            <h3 key={i} className="text-xl md:text-2xl font-bold text-surface-900 pt-6 pb-2 leading-snug" style={{ overflowWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
              {para}
            </h3>
          )
        }

        // Check if it's a numbered/bulleted list
        const lines = para.split('\n')
        const isList = lines.length > 1 && lines.every((l) => /^[\d•\-\*]/.test(l.trim()))

        if (isList) {
          return (
            <ul key={i} className="space-y-3 pl-2 my-6">
              {lines.map((line, j) => (
                <li key={j} className="flex items-start gap-3 text-base md:text-lg text-surface-800" style={{ lineHeight: '1.85', overflowWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0" />
                  <span className="flex-1 min-w-0">{line.replace(/^[\d•\-\*\.]+\s*/, '')}</span>
                </li>
              ))}
            </ul>
          )
        }

        return (
          <p key={i} className="text-base md:text-lg text-surface-800 mb-6" style={{ lineHeight: '1.85', overflowWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
            {para.split('\n').join('\n')}
          </p>
        )
      })}
    </div>
  )
}
