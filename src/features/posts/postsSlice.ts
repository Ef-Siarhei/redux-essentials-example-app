import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {client} from "@/api/client";
import {userLoggedOut} from "@/features/auth/authSlice";
import {createAppAsyncThunk} from "@/app/withTypes";

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
type NewPost = Pick<Post, 'title' | 'content' | 'user'>

interface PostsState {
  posts: Post[]
  status: 'idle' | 'pending' | 'succeeded' | 'rejected'
  error: string | null
}

export const fetchPosts = createAppAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await client.get<Post[]>('/fakeApi/posts')
    return response.data
  },
  {
    condition(arg, thunkApi) {
      const postsStatus = selectPostsStatus(thunkApi.getState())
      if (postsStatus !== 'idle') {
        return false
      }
    }
  }
)

export const addNewPost = createAppAsyncThunk(
  'posts/addNewPost',
  async (initialPost: NewPost) => {
    const response = await client.post<Post>('/fakeApi/posts', initialPost)
    return response.data
  }
)

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null
}

// Создаем Slice и передаем исходное состояние
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const {id, title, content} = action.payload
      const existingPost = state.posts.find(post => post.id === id)
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
      const existingPost = state.posts.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoggedOut, () => {
        return initialState
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts.push(...action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message ?? 'Unknown Error'
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
  },
  // Перенес селекторы в createSlice
  selectors: {
    selectAllPosts: postState => postState.posts,
    selectPostById: (postState, postId: string) => postState.posts.find(post => post.id === postId),
    selectPostsStatus: postState => postState.status,
    selectPostsError: postState => postState.error
  }
})

// Экспортируем автоматически созданный создатель действия с тем же именем
export const {
  // postAdded,
  postUpdated, reactionAdded} = postsSlice.actions

export const {selectAllPosts, selectPostById, selectPostsStatus, selectPostsError} = postsSlice.selectors

// Экспортируем сгенерированную функцию редуктора
export default postsSlice.reducer
