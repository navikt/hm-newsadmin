import { Route, Routes } from 'react-router-dom'
import { NyhetsOversikt } from 'NyhetsOversikt.tsx'
import { CreateNewsPage } from '/actions/CreateNewsPage'
import { EditNewsPage } from 'actions/EditNewsPage.tsx'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<NyhetsOversikt />} />
      <Route path="/createNewsPage" element={<CreateNewsPage />} />
      <Route path="/news/:id/edit" element={<EditNewsPage />} />
    </Routes>
  )
}
