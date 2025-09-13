import { createSlice } from "@reduxjs/toolkit"
import type { Project } from "../api/wordpress"

interface ProjectState {
  items: Project[]
  currentProject: Project | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  filter: string
}

const initialState: ProjectState = {
  items: [],
  currentProject: null,
  status: "idle",
  error: null,
  filter: "all",
}

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload
    },
    clearCurrentProject: (state) => {
      state.currentProject = null
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
  },
})

export const { setCurrentProject, clearCurrentProject, setFilter } = projectSlice.actions
export default projectSlice.reducer
