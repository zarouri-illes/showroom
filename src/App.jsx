import { lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'

const HomePage = lazy(() => import('./pages/HomePage'))
const ListingsPage = lazy(() => import('./pages/ListingsPage'))
const CarDetailPage = lazy(() => import('./pages/CarDetailPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/listing" element={<ListingsPage />} />
          <Route path="/listing/:id" element={<CarDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
