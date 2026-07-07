import { Route, Routes } from 'react-router-dom'
import { NyhetsOversikt } from 'pages/NyhetsOversikt.tsx'
import { CreateNewsPage } from 'actions/CreateNewsPage'
import { EditNewsPage } from 'actions/EditNewsPage.tsx'
import { NewsPreview } from 'pages/NewsPreview.tsx'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<NyhetsOversikt />} />
      <Route path="/createNewsPage" element={<CreateNewsPage />} />
      <Route path="/aktuelt/:id/edit" element={<EditNewsPage />} />
      <Route path="/aktuelt/:id/preview" element={<NewsPreview />} />
    </Routes>
  )
}
