import Skeleton from './Skeleton'
import Spinner from './Spinner'

// Full-page loading fallback shown while a lazy route is loading.
const PageLoader = () => (
  <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-28 sm:px-6">
    <div className="flex items-center gap-3">
      <Spinner size={28} />
      <span className="text-sm text-white/50">Chargement…</span>
    </div>

    <div className="flex flex-col gap-4">
      <Skeleton className="h-10 w-2/3 max-w-md" />
      <Skeleton className="h-4 w-1/2 max-w-sm" />
      <Skeleton className="h-4 w-1/3 max-w-xs" />
    </div>

    <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="h-72 rounded-2xl" />
      <Skeleton className="h-72 rounded-2xl" />
      <Skeleton className="h-72 rounded-2xl" />
    </div>
  </div>
)

export default PageLoader
