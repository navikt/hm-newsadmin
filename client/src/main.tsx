import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import {initInstrumentation} from 'faro/faro'
import {initUmami} from 'utils/umami'

import '@navikt/ds-css'
import {App} from 'App'

export function baseUrl(url: string = '') {
    if (process.env.NODE_ENV === 'production') {
        return `/newsadmin${url}`
    } else {
        return url
    }
}

initUmami()
initInstrumentation()

const container = document.getElementById('root')!
createRoot(container).render(
    <>
        <BrowserRouter basename={baseUrl()}>
            <App />
        </BrowserRouter>
    </>
)