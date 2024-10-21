// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Use the `Post` type we've already defined in `postsSlice`,
// and then re-export it for ease of use

import type {Post} from "../posts/postsSlice"

export type {Post}

// Определите наш единственный объект среза API
export const apiSlice = createApi({
  // редуктор кеша будет добавлен в `state.api` (уже по умолчанию — это необязательно)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({baseUrl: '/fakeApi'}),
  // «Конечные точки» представляют собой операцию и запрос для этого сервера.
  endpoints: builder => ({
    // Конечная точка `getPosts` — это операция запроса, которая возвращает данные.
    // Возвращаемое значение представляет собой массив `Post[]` и не принимает аргументов.
    getPosts: builder.query<Post[], void>({
      // URL-адрес запроса: «/fakeApi/posts».
      query: () => '/posts'
    })
  })
})

// Экспортируемый автоматически сгенерированный hook для конечной точки запроса `getPosts`
export const {useGetPostsQuery} = apiSlice
