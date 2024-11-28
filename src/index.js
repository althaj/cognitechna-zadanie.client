import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App"
import store from './app/store'
import { Provider } from 'react-redux'

import CssBaseline from '@mui/material/CssBaseline'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const root = createRoot(document.getElementById("root"))
root.render(
    <StrictMode>
        <CssBaseline>
            <Provider store={store}>
                <App />
            </Provider>
        </CssBaseline>
    </StrictMode>
)