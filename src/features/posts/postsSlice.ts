import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {sub} from "date-fns";
import {userLoggedOut} from "@/features/auth/authSlice";

export interface Reactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}

export type ReactionName = keyof Reactions

// Определить тип TS для данных, которые мы будем использовать.
export interface Post {
  id: string
  title: string
  content: string
  user: string
  date: string
  reactions: Reactions
}

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
}

// Создаем начальное значение состояния для редуктора с этим типом
const initialState: Post[] = [
  {
    id: '1', title: 'First Post!', content: 'Hello!', user: '1',
    date: sub(new Date(), {minutes: 10}).toISOString(),
    reactions: initialReactions
  },
  {
    id: '2', title: 'Second Post!', content: 'More text!', user: '2',
    date: sub(new Date(), {minutes: 5}).toISOString(),
    reactions: initialReactions
  },
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
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: initialReactions
          },
        }
      },
    },
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const {id, title, content} = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reaction: ReactionName }>
    ) {
      const {postId, reaction} = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLoggedOut, (state) => {
      return []
    })
  },
  // Перенес селекторы в createSlice
  selectors: {
    selectAllPosts: postState => postState,
    selectPostById: (postState, postId: string) => postState.find(post => post.id === postId)
  }
})

// Экспортируем автоматически созданный создатель действия с тем же именем
export const {postAdded, postUpdated, reactionAdded} = postsSlice.actions

export const {selectAllPosts, selectPostById} = postsSlice.selectors

// Экспортируем сгенерированную функцию редуктора
export default postsSlice.reducer
