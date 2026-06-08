function ApiStatusMessage({ loading, error, onRetry, loadingMessage = 'Carregando dados...' }) {
  if (loading) {
    return (
      <p
        role="status"
        className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600 sm:p-8"
      >
        {loadingMessage}
      </p>
    )
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center sm:p-8"
      >
        <p className="text-sm text-rose-800">
          Não foi possível carregar os dados da API. Verifique sua conexão e tente novamente.
        </p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-rose-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-800"
          >
            Tentar novamente
          </button>
        ) : null}
      </div>
    )
  }

  return null
}

export default ApiStatusMessage
