import type { UserData } from "@/interfaces/UserData.interface"
import {
  handleLocalStorageLogin,
  handleLocalStorageLogout,
} from "@/util/authentication"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: UserData = {
  token: null,
  expirationTime: null,
}
const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleLogin: (state, action: PayloadAction<UserData>) => {
      state.token = action.payload.token
      state.expirationTime = action.payload.expirationTime
      console.log("action---", action.payload)
      handleLocalStorageLogin(
        action.payload.token,
        action.payload.expirationTime
      )
    },
    handleLogout: (state) => {
      state.token = null
      state.expirationTime = null
      handleLocalStorageLogout()
    },
  },
})

export const { handleLogin, handleLogout } = userSlice.actions

export default userSlice
