import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {SPACE_FLIGHT_NEWS_BASE_URL} from "../../utils/API_CONFIG";

export const spaceApi = createApi({
  reducerPath: "spaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SPACE_FLIGHT_NEWS_BASE_URL,
  }),

  keepUnusedDataFor: 20,

  endpoints: (build) => ({
    getArticlesData: build.query({
      query: (arg) => `v3/articles`,
      // query: (arg) => `v3/articles?_limit=50`,
    }),
  }),
});

export const {useGetArticlesDataQuery} = spaceApi;