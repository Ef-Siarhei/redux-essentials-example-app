import {createSlice, createEntityAdapter, EntityState} from "@reduxjs/toolkit";
import {RootState} from "@/app/store";
import {selectCurrentUsername} from "@/features/auth/authSlice";
import {createAppAsyncThunk} from "@/app/withTypes";
import {client} from "@/api/client";

interface User {
  id: string
  name: string
}

export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get<User[]>('/fakeApi/users')
  return response.data
})

interface UsersState extends EntityState<User, string>{}

const usersAdapter = createEntityAdapter<User>()

const initialState: UsersState = usersAdapter.getInitialState()

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  }
})

export default usersSlice.reducer

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors((state: RootState) => state.users)

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  if(!currentUsername){
    return
  }
  return selectUserById(state, currentUsername)
}

