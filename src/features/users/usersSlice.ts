import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/app/store";
import {selectCurrentUsername} from "@/features/auth/authSlice";

interface User {
  id: string
  name: string
}

const initialState: User[] = [
  {id: '0', name: 'Fredi Mercury'},
  {id: '1', name: 'Merlin Munro'},
  {id: '2', name: 'Ken Roy'}
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  }
})

export default usersSlice.reducer

export const selectAllUsers = (state: RootState) => state.users
// todo добавил к  userId: string еще и | null так как currentUsername может быть как string | null
export const selectUserById = (state: RootState, userId: string | null) =>
  state.users.find(user => user.id === userId)

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  return selectUserById(state, currentUsername)
}
