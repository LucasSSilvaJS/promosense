function PageShell({ title, subtitle, children }) {
  return (
    <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
      <div className="mx-auto w-full max-w-6xl">
        {(title || subtitle) && (
          <header className="mb-6 sm:mb-8">
            {title && (
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </main>
  )
}

export default PageShell
