import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import FeatureSpotlight from '../../components/FeatureSpotlight/FeatureSpotlight'
import PageShell from '../../components/PageShell/PageShell'
import ResearchBanner from '../../components/ResearchBanner/ResearchBanner'
import { featureHighlights } from '../../config/features'

function HomePage() {
  return (
    <PageShell
      title="PromoSense"
      subtitle="Plataforma de análise de sentimento aplicada ao e-commerce para estudar o impacto de promoções recorrentes."
    >
      <ResearchBanner />

      <section className="mt-8 sm:mt-10">
        <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Módulos do sistema</h2>
            <p className="mt-1 text-sm text-slate-600">
              Principais funcionalidades da plataforma.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-gray-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 sm:w-auto sm:py-2"
          >
            Ver dashboard
            <FaArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featureHighlights.map((feature) => (
            <FeatureSpotlight key={feature.id} {...feature} />
          ))}
        </div>
      </section>
    </PageShell>
  )
}

export default HomePage
