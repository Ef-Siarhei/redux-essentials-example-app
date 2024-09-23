import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

// Определить тип TS для данных, которые мы будем использовать.
export interface Post {
  id: string
  title: string
  content: string
  user: string
}

// Создаем начальное значение состояния для редуктора с этим типом
const initialState: Post[] = [
  {id: '1', title: 'First Post!', content: 'Hello!', user: '1'},
  {id: '2', title: 'Second Post!', content: 'More text!', user: '2'},
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
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {id: nanoid(), title, content, user: userId}
        }
      }
    },
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const {id, title, content} = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  },
  // Перенес селекторы в createSlice
  selectors: {
    selectAllPosts: postState => postState,
    selectPostById: (postState, postId: string) => postState.find(post => post.id === postId)
  }
})

// Экспортируем автоматически созданный создатель действия с тем же именем
export const {postAdded, postUpdated} = postsSlice.actions

export const {selectAllPosts, selectPostById} = postsSlice.selectors

// Экспортируем сгенерированную функцию редуктора
export default postsSlice.reducer
