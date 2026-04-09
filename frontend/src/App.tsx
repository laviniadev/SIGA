import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { Toaster } from 'sonner'
import ScrollToTop from './components/utils/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster richColors position="bottom-left" />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App