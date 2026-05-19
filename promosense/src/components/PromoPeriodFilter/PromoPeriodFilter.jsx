import { FaCalendarDays } from 'react-icons/fa6'

function PromoPeriodFilter({ periods, selectedPeriodId, onChange }) {
  return (
    <section
      aria-label="Filtro por período promocional"
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="mb-3 flex items-center gap-2 text-slate-700">
        <FaCalendarDays className="shrink-0" aria-hidden="true" />
        <h2 className="text-xs font-semibold uppercase tracking-wide sm:text-sm">
          Período promocional
        </h2>
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] scrollbar-width:none sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
        {periods.map((period) => {
          const isActive = period.id === selectedPeriodId

          return (
            <button
              key={period.id}
              type="button"
              onClick={() => onChange(period.id)}
              className={[
                'shrink-0 snap-start rounded-full px-4 py-2.5 text-sm font-medium transition-colors',
                'min-h-11 sm:min-h-0',
                isActive
                  ? 'bg-gray-950 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
              ].join(' ')}
            >
              {period.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default PromoPeriodFilter
