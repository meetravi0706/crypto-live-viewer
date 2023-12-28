import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const controller = new AbortController();
const signal = controller.signal;

const baseUrl = "https://newsapi.org/v2";


const createRequest = (url ) => ({ url ,signal});

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/everything?q=${newsCategory}&apiKey=d1bdb2ec81b94f6da9300f8cadb47c6e&pageSize=${count}`),
    }),
  }),
  });

  export const { useGetCryptoNewsQuery } = cryptoNewsApi;