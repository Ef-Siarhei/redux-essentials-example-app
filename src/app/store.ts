import {configureStore} from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice'



export const store = configureStore({
    reducer:{
        posts: postsReducer
    }
})

// Определить тип «store»
export type AppStore = typeof store

// Определите тип AppDispatch из самого store.
export type AppDispatch = typeof store.dispatch

// То же самое для типа RootState.
export type RootState = ReturnType<typeof store.getState>
