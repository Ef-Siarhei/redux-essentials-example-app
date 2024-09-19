import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";

// Определить тип TS для данных, которые мы будем использовать.
export interface Post {
  id: string
  title: string
  content: string
}

// Создаем начальное значение состояния для редуктора с этим типом
const initialState: Post[] = [
  {id: '1', title: 'First Post!', content: 'Hello!'},
  {id: '2', title: 'Second Post!', content: 'More text!'},
]

// Создаем Slice и передаем исходное состояние
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string) {
        return {
          payload: {id: nanoid(), title, content}
        }
      }
    },

    postUpdated(state, action: PayloadAction<Post>) {
      const {id, title, content} = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  }
})

// Экспортируем автоматически созданный создатель действия с тем же именем
export const {postAdded, postUpdated} = postsSlice.actions

// Экспортируем сгенерированную функцию редуктора
export default postsSlice.reducer
