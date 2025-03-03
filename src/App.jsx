import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header'
import Footer from './Components/Footer'
import LandingPage from './Pages/LandingPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quienes-somos" element={<div>¿Quiénes Somos?</div>} />
        <Route path="/destinos" element={<div>Destinos</div>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
