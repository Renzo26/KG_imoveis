import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { SmoothScroll } from '@/lib/scroll'
import IntroLoader from '@/components/IntroLoader'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import Listings from '@/pages/Listings'
import PropertyDetail from '@/pages/PropertyDetail'
import Company from '@/pages/Company'
import Contact from '@/pages/Contact'
import RegisterProperty from '@/pages/RegisterProperty'
import FindProperty from '@/pages/FindProperty'
import Simulators from '@/pages/Simulators'
import NotFound from '@/pages/NotFound'

export default function App() {
  const location = useLocation()
  const [ready, setReady] = useState(false)

  return (
    <SmoothScroll>
      <IntroLoader onDone={() => setReady(true)} />

      <Header />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home ready={ready} />} />
          <Route path="/imoveis" element={<Listings negotiation="venda" />} />
          <Route path="/imoveis/venda" element={<Listings negotiation="venda" />} />
          <Route path="/imoveis/locacao" element={<Listings negotiation="locacao" />} />
          <Route path="/imoveis/lancamentos" element={<Listings negotiation="lancamento" />} />
          <Route path="/imovel/:id" element={<PropertyDetail />} />
          <Route path="/empresa" element={<Company />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/cadastre-seu-imovel" element={<RegisterProperty />} />
          <Route path="/encontre-seu-imovel" element={<FindProperty />} />
          <Route path="/simuladores" element={<Simulators />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </SmoothScroll>
  )
}
