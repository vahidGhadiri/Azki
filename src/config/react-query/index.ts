import { QueryClient } from '@tanstack/react-query'
import type { DefaultOptions } from "@tanstack/react-query"

const STALE_TIME = 5 * 60 * 1000 // 5 minutes
const CACHE_TIME = 5 * 60 * 1000  // 5 minutes

export const PAGINATION_LIMIT_SIZE = 15

const createDefaultOptions = (): DefaultOptions => ({
  queries: {
    staleTime: STALE_TIME,
    cacheTime: CACHE_TIME,
    networkMode: 'offlineFirst',
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
    retry: 0,
  },
  mutations: {
    retry: 3,
  },
})

const createQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: createDefaultOptions(),
  })

const queryClient = createQueryClient()

export default queryClient
