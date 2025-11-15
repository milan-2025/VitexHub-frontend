import type { loaderInitialState } from "@/interfaces/loaderInitialState.interface"
import { createSlice } from "@reduxjs/toolkit"
// import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: loaderInitialState = {
  showLoader: false,
}

const loaderSlice = createSlice({
  name: "loader",
  initialState: initialState,
  reducers: {
    showLoader: (state) => {
      state.showLoader = true
    },
    hideLoader: (state) => {
      state.showLoader = false
    },
  },
})

export const { showLoader, hideLoader } = loaderSlice.actions
export default loaderSlice
