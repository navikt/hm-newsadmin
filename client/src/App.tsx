import { Route, Routes } from 'react-router-dom'
import { Startside } from 'Startside'
import { CreateNewsPage } from '/actions/CreateNewsPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Startside />} />
      <Route path="/createNewsPage" element={<CreateNewsPage />} />
      <Route path="/editNewsPage" element={<CreateNewsPage />} />
    </Routes>
  )
}
