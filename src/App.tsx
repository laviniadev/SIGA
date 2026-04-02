import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { Toaster } from 'sonner'

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="bottom-left" />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App