import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function SectionHeader({ label, title, description, linkText, linkTo, icon: Icon }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-5">
      <div className="max-w-xl">
        {label && (
          <div className="flex items-center gap-2.5 mb-3">
            {Icon && <Icon className="w-3.5 h-3.5 text-emerald-700" strokeWidth={2.5} />}
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 leading-none">
              {label}
            </span>
          </div>
        )}
        <h2 className="text-3xl md:text-4xl font-extrabold text-surface-900 tracking-tight leading-tight mb-2.5">
          {title}
        </h2>
        {description && (
          <p className="text-sm md:text-base text-surface-500 font-medium leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {linkText && linkTo && (
        <div className="flex flex-col md:items-end flex-shrink-0 mt-2 md:mt-0">
          <Link
            to={linkTo}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-surface-900 hover:text-emerald-700 transition-colors pb-1 border-b-[1.5px] border-surface-900 hover:border-emerald-700"
          >
            {linkText}
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>
        </div>
      )}
    </div>
  )
}
