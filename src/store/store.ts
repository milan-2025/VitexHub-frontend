import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import loaderSlice from "./loaderSlice"
import createPostSlice from "./createPostSlice"

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    loader: loaderSlice.reducer,
    createPost: createPostSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
