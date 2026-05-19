function MetricHighlight({ label, value, hint, tone = 'default' }) {
  const toneClasses = {
    default: 'border-slate-200 bg-white text-slate-900',
    positive: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    negative: 'border-rose-200 bg-rose-50 text-rose-900',
    neutral: 'border-amber-200 bg-amber-50 text-amber-900',
  }

  return (
    <article className={['rounded-xl border p-4 shadow-sm sm:p-5', toneClasses[tone]].join(' ')}>
      <p className="text-xs font-medium opacity-80 sm:text-sm">{label}</p>
      <p className="mt-1 text-2xl font-bold sm:text-3xl">{value}</p>
      {hint && <p className="mt-2 text-xs opacity-70">{hint}</p>}
    </article>
  )
}

export default MetricHighlight
