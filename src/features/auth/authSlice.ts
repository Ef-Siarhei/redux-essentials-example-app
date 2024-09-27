import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/app/store";

interface AuthState {
  username: string
}

const initialState: AuthState = {
  username: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn(state, action: PayloadAction<string>) {
      state.username = action.payload
    },
    userLoggedOut(state) {
      state.username = ''
    }
  }
})

export const {userLoggedIn, userLoggedOut } = authSlice.actions

export const selectCurrentUsername = (state: RootState) => state.auth.username

export default authSlice.reducer
