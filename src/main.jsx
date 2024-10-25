import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import Notification from './components/notification/Notification.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
    <Notification/>
  </AuthProvider>
)
