import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';


import Header from './Components/Header'
import Chatbot from './Pages/ChatBot';
import Footer from './Components/Footer'


import LandingPage from './Pages/LandingPage';
import Registro from './Pages/Registro';
import Login from './Pages/Login';
import Destinos from './Pages/Destinos';
import DescripcionDestino from './Pages/DescripcionDestino';
import DescripcionHotel from './Pages/DescripcionHotel';
import Home from './Pages/Home';
import Perfil from './Pages/Perfil';
import Editar from './Pages/EditarPerfil';
import Mapa from './Pages/MapaScreen';
import Planificar from './Pages/PlanificarScreen';

import Cargando from './Components/Cargando';


import Pruebas from './Pages/Pruebas';
import Post from './Components/PostCard';
import Provisional from './Components/Provisional';



function App() {
  return (
    <Router>
      <Header />
      <Chatbot />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/destinos" element={<Destinos />} />
        <Route path='/login' element={<Login />} />
        <Route path='/descripcion-destino/:id' element={<DescripcionDestino />} />
        <Route path='/descripcion-hotel' element={<DescripcionHotel />} />
        <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute> <Perfil /> </ProtectedRoute>} />
        <Route path="/editar" element={<ProtectedRoute> <Editar /> </ProtectedRoute>} />
        <Route path="/mapa" element={<ProtectedRoute> <Mapa /> </ProtectedRoute>} />
        <Route path="/calculadora" element={<ProtectedRoute> <Planificar /> </ProtectedRoute>} />
        <Route path='/cargando' element={<Cargando />} />

        {/* Rutas de pruebas y provisionales */}



        <Route path='/pruebas' element={<Pruebas />} />
        <Route path='/provisional' element={<Provisional />} />

        <Route path='/post' element={<Post />} />

      </Routes>
      <Footer />
    </Router>
  )
}

export default App
