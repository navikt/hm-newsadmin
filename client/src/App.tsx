import {Route, Routes} from 'react-router-dom'
import {Startside} from 'Startside'


export function App() {

  return (
        <Routes>
          <Route path="/" element={<Startside />} />
        </Routes>
  )
}
