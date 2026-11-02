import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/anunciantes/Home'

const L = <P extends object>(f: () => Promise<{ default: React.ComponentType<P> }>) => lazy(f)
const Plataforma = L(() => import('./pages/anunciantes/Plataforma'))
const Formatos = L(() => import('./pages/anunciantes/Formatos'))
const ComoFunciona = L(() => import('./pages/anunciantes/ComoFunciona'))
const Medicion = L(() => import('./pages/anunciantes/Medicion'))
const Comparativa = L(() => import('./pages/anunciantes/Comparativa'))
const Inversion = L(() => import('./pages/anunciantes/Inversion'))
const Casos = L(() => import('./pages/anunciantes/Casos'))
const Nosotros = L(() => import('./pages/anunciantes/Nosotros'))
const Demo = L(() => import('./pages/anunciantes/Demo'))
const Ayuda = L(() => import('./pages/anunciantes/Ayuda'))
const Contacto = L(() => import('./pages/anunciantes/Contacto'))
const Legal = L(() => import('./pages/Legal'))
const Auth = L(() => import('./pages/Auth'))
const NotFound = L(() => import('./pages/NotFound'))
const DriverHome = L(() => import('./pages/conductores/Home'))
const Requisitos = L(() => import('./pages/conductores/Requisitos'))
const Pagos = L(() => import('./pages/conductores/Pagos'))
const Seguridad = L(() => import('./pages/conductores/Seguridad'))
const DriverAyuda = L(() => import('./pages/conductores/Ayuda'))

export default function App() {
  return (
    <Suspense fallback={<div className="loading" aria-busy="true" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="plataforma" element={<Plataforma />} />
          <Route path="formatos" element={<Formatos />} />
          <Route path="como-funciona" element={<ComoFunciona />} />
          <Route path="medicion" element={<Medicion />} />
          <Route path="comparativa" element={<Comparativa />} />
          <Route path="inversion" element={<Inversion />} />
          <Route path="casos-de-uso" element={<Casos />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="demo" element={<Demo />} />
          <Route path="ayuda" element={<Ayuda />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="legal/:doc" element={<Legal />} />
          <Route path="ingresar" element={<Auth role="advertiser" mode="login" />} />
          <Route path="registro" element={<Auth role="advertiser" mode="signup" />} />
          <Route path="conductores">
            <Route index element={<DriverHome />} />
            <Route path="requisitos" element={<Requisitos />} />
            <Route path="pagos" element={<Pagos />} />
            <Route path="seguridad" element={<Seguridad />} />
            <Route path="ayuda" element={<DriverAyuda />} />
            <Route path="ingresar" element={<Auth role="driver" mode="login" />} />
            <Route path="registro" element={<Auth role="driver" mode="signup" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
