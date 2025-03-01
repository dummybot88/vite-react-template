import { Routes, Route } from 'react-router-dom'
import Comics from '../../components/comic/Comics'

export const WEB_APP_PATH = '/web/vite-react-template'

const PageRoutes = () => (
  <Routes>
    <Route path={WEB_APP_PATH} element={<Comics />} />
    <Route path="*" element={<Comics />} />
  </Routes>
)

export default PageRoutes
