import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "./slices/apiSlice";
import discoverReducer from "./slices/discover";

const store = configureStore({
  reducer: {
    discover: discoverReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
