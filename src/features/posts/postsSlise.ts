import {createSlice} from "@reduxjs/toolkit";

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
    reducers: {}
})

// Экспортируем сгенерированную функцию редуктора
export default postsSlice.reducer
