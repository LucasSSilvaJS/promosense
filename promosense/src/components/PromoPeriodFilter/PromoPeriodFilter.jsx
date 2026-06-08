import { FaCalendarDays, FaLock } from 'react-icons/fa6'

function PromoPeriodFilter({ periods, selectedPeriodId, onChange, onComingSoon }) {
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
          const isAvailable = period.available !== false

          return (
            <button
              key={period.id}
              type="button"
              aria-disabled={!isAvailable}
              title={
                isAvailable
                  ? undefined
                  : 'Disponível em atualizações futuras do PromoSense'
              }
              onClick={() => {
                if (!isAvailable) {
                  onComingSoon?.(period)
                  return
                }

                onChange(period.id)
              }}
              className={[
                'inline-flex shrink-0 snap-start items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-colors',
                'min-h-11 sm:min-h-0',
                isActive && isAvailable
                  ? 'bg-gray-950 text-white'
                  : isAvailable
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'cursor-not-allowed bg-slate-50 text-slate-400 ring-1 ring-inset ring-slate-200',
              ].join(' ')}
            >
              {!isAvailable ? <FaLock className="text-xs" aria-hidden="true" /> : null}
              {period.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default PromoPeriodFilter
