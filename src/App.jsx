import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header'
import Footer from './Components/Footer'
import LandingPage from './Pages/LandingPage';
import Conocenos from './Pages/Conocenos';
import Anuncio from './Pages/Anuncio';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/conocenos" element={<Conocenos />} />
        <Route path="/destinos" element={<div>Destinos</div>} />
        <Route path='/anuncio' element={<Anuncio />} />

      </Routes>
      <Footer />
    </Router>
  )
}

export default App
