import { ToastContainer } from 'react-toastify'
import './App.css'
import AppLayout from './components/AppLayout'

const App = () => {
  return (
    <div className='App'>
      <AppLayout />
      <ToastContainer theme="dark" />
    </div>
  )
}

export default App
