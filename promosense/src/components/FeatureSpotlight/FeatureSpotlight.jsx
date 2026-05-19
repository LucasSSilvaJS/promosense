import { Link } from 'react-router-dom'

function FeatureSpotlight({ title, description, to, icon: Icon }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <div className="mb-3 sm:mb-4">
        <span className="inline-flex rounded-lg bg-gray-950 p-2 text-white">
          <Icon aria-hidden="true" className="text-lg sm:text-xl" />
        </span>
      </div>
      <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
      <Link
        to={to}
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-gray-950 px-4 py-2.5 text-sm font-semibold text-gray-950 transition hover:bg-gray-950 hover:text-white sm:w-auto sm:justify-start sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:hover:bg-transparent sm:hover:text-gray-950 sm:hover:underline sm:underline-offset-4"
      >
        Acessar módulo
      </Link>
    </article>
  )
}

export default FeatureSpotlight
