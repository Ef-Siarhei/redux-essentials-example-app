import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/app/store";
import {createAppAsyncThunk} from "@/app/withTypes";
import {client} from "@/api/client";

interface AuthState {
  username: string
}

export const login = createAppAsyncThunk(
  'auth/login',
  async (username: string) => {
    await client.post('/fakeApi/login', username)
    return username
  }
)

export const logout = createAppAsyncThunk('auth/Logout', async () => {
  await client.post('/fakeApi/logout', {})
  }
)

const initialState: AuthState = {
  username: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.username = ''
      })
  }
})

export const selectCurrentUsername = (state: RootState) => state.auth.username

export default authSlice.reducer
