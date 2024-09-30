import React from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";

import App from './App'
import {store} from "@/app/store";

import {worker} from './api/server'

import './primitiveui.css'
import './index.css'
import {fetchUsers} from "@/features/users/usersSlice";

// Обернуть рендеринг приложения, чтобы мы могли дождаться инициализации макетного API.
async function start() {
  // Запускаем наш фиктивный сервер API
  await worker.start({onUnhandledRequest: 'bypass'})

  // Нам нужно получить список пользователей только один раз,
  // и мы хотим сделать это сразу при запуске приложения.
  // Мы можем сделать это в нашем main.tsx файле и напрямую отправить fetchUsers thunk,
  // потому что у нас есть store на это право:
  store.dispatch(fetchUsers())

  const root = createRoot(document.getElementById('root')!)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </React.StrictMode>,
  )
}

start()
