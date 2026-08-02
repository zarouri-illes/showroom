import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import PageLoader from './components/ui/PageLoader'
import { AdminProvider } from './context/AdminContext'
import { ThemeProvider } from './context/ThemeContext'

const HomePage = lazy(() => import('./pages/HomePage'))
const ListingsPage = lazy(() => import('./pages/ListingsPage'))
const CarDetailPage = lazy(() => import('./pages/CarDetailPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const EchangeVentePage = lazy(() => import('./pages/EchangeVentePage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

const AdminLogin = lazy(() => import('./pages/admin/Login'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminCars = lazy(() => import('./pages/admin/Cars'))
const AdminCarForm = lazy(() => import('./pages/admin/CarForm'))
const AdminSocial = lazy(() => import('./pages/admin/Social'))
const AdminAvis = lazy(() => import('./pages/admin/Avis'))
const AdminDemandes = lazy(() => import('./pages/admin/Demandes'))
const AdminAccount = lazy(() => import('./pages/admin/Account'))

function App() {
  return (
    <ThemeProvider>
      <AdminProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<Suspense fallback={<PageLoader />}><AdminLogin /></Suspense>} />
          <Route path="/admin" element={<Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>} />
          <Route path="/admin/cars" element={<Suspense fallback={<PageLoader />}><AdminCars /></Suspense>} />
          <Route path="/admin/cars/new" element={<Suspense fallback={<PageLoader />}><AdminCarForm /></Suspense>} />
          <Route path="/admin/cars/:id/edit" element={<Suspense fallback={<PageLoader />}><AdminCarForm /></Suspense>} />
          <Route path="/admin/social" element={<Suspense fallback={<PageLoader />}><AdminSocial /></Suspense>} />
          <Route path="/admin/avis" element={<Suspense fallback={<PageLoader />}><AdminAvis /></Suspense>} />
          <Route path="/admin/demandes" element={<Suspense fallback={<PageLoader />}><AdminDemandes /></Suspense>} />
          <Route path="/admin/account" element={<Suspense fallback={<PageLoader />}><AdminAccount /></Suspense>} />
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/listing" element={<ListingsPage />} />
            <Route path="/listing/:id" element={<CarDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/echange-vente" element={<EchangeVentePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        </BrowserRouter>
      </AdminProvider>
    </ThemeProvider>
  )
}

export default App
