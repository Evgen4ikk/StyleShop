interface MutationSettings<Params = void, Func = unknown> {
  config?: ApiRequestConfig
  options?: import('@tanstack/react-query').UseMutationOptions<Awaited<ReturnType<Func>>, any, Params, any>
}

interface QuerySettings<Params = void> {
  config?: RequestConfig<Params>
  options?: Omit<
    import('@tanstack/react-query').UseQueryOptions<Awaited<ReturnType<Params>>, any, Awaited<ReturnType<Params>>, any>,
    'queryKey'
  >
}

type ApiRequestConfig = import('axios').AxiosRequestConfig

type RequestConfig<Params = undefined> = Params extends undefined
  ? { config?: ApiRequestConfig }
  : { params: Params; config?: ApiRequestConfig }
