import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import './index.css'
import LoginForm from './components/auth/LoginForm'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginForm />} />
    </Routes>
  </BrowserRouter>,
)
