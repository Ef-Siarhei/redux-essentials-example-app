import React from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";

import App from './App'
import {store} from "@/app/store";

import {worker} from './api/server'

import './primitiveui.css'
import './index.css'

// Обернуть рендеринг приложения, чтобы мы могли дождаться инициализации макетного API.
async function start() {
  // Запускаем наш фиктивный сервер API
  await worker.start({onUnhandledRequest: 'bypass'})

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
