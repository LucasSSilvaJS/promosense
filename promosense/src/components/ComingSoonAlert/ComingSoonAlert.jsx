import { FaClock, FaXmark } from 'react-icons/fa6'

function ComingSoonAlert({ periodLabel, onDismiss }) {
  if (!periodLabel) {
    return null
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm sm:p-5"
    >
      <FaClock className="mt-0.5 shrink-0 text-lg text-amber-700" aria-hidden="true" />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-amber-950">Em breve</p>
        <p className="mt-1 text-sm leading-relaxed text-amber-900">
          A campanha <strong>{periodLabel}</strong> ainda não está disponível na plataforma. Os
          dados e filtros dessa data promocional serão implementados em atualizações futuras do
          PromoSense.
        </p>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Fechar aviso"
        className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg text-amber-800 transition hover:bg-amber-100"
      >
        <FaXmark aria-hidden="true" />
      </button>
    </div>
  )
}

export default ComingSoonAlert
