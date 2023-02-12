import {configureStore} from "@reduxjs/toolkit";
import {spaceApi} from "./spaceFlightApi";
import articlesSlice from './slices/articles';

export const store = configureStore({
  reducer: {
    [spaceApi.reducerPath]: spaceApi.reducer,
    articlesData: articlesSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spaceApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;