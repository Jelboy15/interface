import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import ms from 'ms.macro'
import qs from 'qs'

import { OpenSeaResult } from './types'

const DEFAULT_QUERY_PARAMS = {
  dummy: true,
}

export const openseaApi = createApi({
  reducerPath: 'openseaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.uniswap.org/v1/',
  }),
  endpoints: (build) => ({
    getQuote: build.query<
      OpenSeaResult,
      {
        dummy: boolean
      }
    >({
      async queryFn(args, _api, _extraOptions, fetch) {
        let result
        try {
          const query = qs.stringify({
            ...DEFAULT_QUERY_PARAMS,
          })
          result = await fetch(`quote?${query}`)
          return { data: result.data as OpenSeaResult }
        } catch (e) {
          // TODO: fall back to client-side quoter when auto router fails.
          // deprecate 'legacy' v2/v3 routers first.
          return { error: e as FetchBaseQueryError }
        }
      },
      keepUnusedDataFor: ms`10s`,
      extraOptions: {
        maxRetries: 0,
      },
    }),
  }),
})

export const { useGetQuoteQuery } = openseaApi
