import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { wordpressApi } from "./api/wordpress"
import uiSlice from "./slices/uiSlice"
import blogSlice from "./slices/blogSlice"
import projectSlice from "./slices/projectSlice"

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    blog: blogSlice,
    projects: projectSlice,
    [wordpressApi.reducerPath]: wordpressApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wordpressApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
