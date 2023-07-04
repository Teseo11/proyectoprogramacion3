import { Toaster } from 'react-hot-toast'
import './App.css'
import AppLayout from './pages/layout/AppLayout'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/autenticacion/LoginPage'
import RegistroPage from './pages/autenticacion/RegistroPage'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route key="/" path="/" element={<LoginPage />} />
        <Route key="/login" path="/login" element={<LoginPage />} />
        <Route key="/registro" path="/registro" element={<RegistroPage />} />
        <Route key="/*" path="/*" element={<AppLayout />} />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={true} />
    </div>
  )
}

export default App
