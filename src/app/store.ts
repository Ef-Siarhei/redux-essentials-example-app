import {configureStore} from "@reduxjs/toolkit";

import type { Action } from '@reduxjs/toolkit'

interface CounterState {
    value: number
}

// An example slice reducer function that shows how a Redux reducer works inside.
// We'll replace this soon with real app logic.
function counterReducer(state: CounterState = { value: 0 }, action: Action) {
    switch (action.type) {
        // Handle actions here
        default: {
            return state
        }
    }
}

export const store = configureStore({
    reducer:{
        counter: counterReducer
    }
})

