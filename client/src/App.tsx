import { Route, Routes } from 'react-router-dom'

import { CreateNewsPage } from 'actions/CreateNewsPage'
import { EditNewsPage } from 'actions/EditNewsPage.tsx'
import { NyhetsOversikt } from 'pages/NyhetsOversikt.tsx'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<NyhetsOversikt />} />
      <Route path="/createNewsPage" element={<CreateNewsPage />} />
      <Route path="/aktuelt/:id/edit" element={<EditNewsPage />} />
    </Routes>
  )
}
