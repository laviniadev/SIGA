import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { Toaster } from 'sonner'
import ScrollToTop from './components/utils/ScrollToTop'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster richColors position="bottom-left" />
      <AppRoutes />
      <Analytics />
    </BrowserRouter>
  )
}

export default App