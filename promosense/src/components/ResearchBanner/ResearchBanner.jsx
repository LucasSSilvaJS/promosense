import { FaBrain, FaCartShopping, FaMagnifyingGlassChart } from 'react-icons/fa6'

const focusAreas = [
  {
    icon: FaMagnifyingGlassChart,
    title: 'Percepção do consumidor',
    text: 'Como eventos mensais de desconto moldam a leitura das ofertas.',
  },
  {
    icon: FaCartShopping,
    title: 'Credibilidade das promoções',
    text: 'Impacto de campanhas agressivas na confiança do e-commerce.',
  },
  {
    icon: FaBrain,
    title: 'Comportamento de compra',
    text: 'Relação entre recorrência promocional e decisão de consumo.',
  },
]

function ResearchBanner() {
  return (
    <section className="rounded-2xl bg-gray-950 px-4 py-6 text-white shadow-lg sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300 sm:text-sm">
        Proposta de solução em IA
      </p>
      <h2 className="mt-2 text-xl font-bold leading-snug sm:text-2xl lg:text-3xl">
        Analisador de Sentimento para E-commerce
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:mt-4 sm:text-base">
        O PromoSense investiga como a recorrência mensal de eventos de descontos agressivos
        influencia a percepção, a credibilidade das ofertas e o comportamento de consumo no
        e-commerce, apoiando decisões com análise automatizada de avaliações.
      </p>

      <ul className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">
        {focusAreas.map(({ icon: Icon, title, text }) => (
          <li key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <Icon className="mb-2 text-lg text-emerald-300 sm:text-xl" aria-hidden="true" />
            <h3 className="text-sm font-semibold sm:text-base">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ResearchBanner
