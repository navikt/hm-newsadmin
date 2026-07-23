import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { initInstrumentation } from 'faro/faro'

import '@navikt/ds-css'
import { App } from 'App'

initInstrumentation()

const container = document.getElementById('root')!
createRoot(container).render(
  <>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </>
)
