// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Use the `Post` type we've already defined in `postsSlice`,
// and then re-export it for ease of use

import type {Post, NewPost} from "../posts/postsSlice"
export type {Post}

// Определите наш единственный объект среза API
export const apiSlice = createApi({
  // редуктор кеша будет добавлен в `state.api` (уже по умолчанию — это необязательно)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({baseUrl: '/fakeApi'}),
  // «Конечные точки» представляют собой операцию и запрос для этого сервера.
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
       query: () => '/posts'
    }),
    getPost: builder.query<Post, string>({
      query: (postId) => `/posts/${postId}`
    }),
    addNewPost: builder.mutation<Post, NewPost>({
      query: initialPost => ({
        // URL-адрес HTTP будет «/fakeApi/posts».
        url: '/posts',
        // Это запрос HTTP POST, отправляющий обновление
        method: 'POST',
        // Включаем весь объект сообщения в запрос тела
        body: initialPost
      })
    })
  })
})

// Экспортируемый автоматически сгенерированный hook для конечной точки запроса `getPosts`
export const {useGetPostsQuery, useGetPostQuery, useAddNewPostMutation} = apiSlice
