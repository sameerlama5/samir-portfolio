import { createSlice } from "@reduxjs/toolkit"
import type { Post } from "../api/wordpress"

interface BlogState {
  posts: Post[]
  currentPost: Post | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: BlogState = {
  posts: [],
  currentPost: null,
  status: "idle",
  error: null,
}

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload
    },
    clearCurrentPost: (state) => {
      state.currentPost = null
    },
  },
})

export const { setCurrentPost, clearCurrentPost } = blogSlice.actions
export default blogSlice.reducer
