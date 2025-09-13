import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type FxLevel = "subtle" | "standard" | "max"

interface UiState {
  introPlayed: boolean
  fxLevel: FxLevel
  navOpen: boolean
  currentSection: string
  scrollProgress: number
}

const initialState: UiState = {
  introPlayed: false,
  fxLevel: "standard",
  navOpen: false,
  currentSection: "hero",
  scrollProgress: 0,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIntroPlayed: (state, action: PayloadAction<boolean>) => {
      state.introPlayed = action.payload
    },
    setFxLevel: (state, action: PayloadAction<FxLevel>) => {
      state.fxLevel = action.payload
    },
    setNavOpen: (state, action: PayloadAction<boolean>) => {
      state.navOpen = action.payload
    },
    setCurrentSection: (state, action: PayloadAction<string>) => {
      state.currentSection = action.payload
    },
    setScrollProgress: (state, action: PayloadAction<number>) => {
      state.scrollProgress = action.payload
    },
  },
})

export const { setIntroPlayed, setFxLevel, setNavOpen, setCurrentSection, setScrollProgress } = uiSlice.actions

export default uiSlice.reducer
