import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Turisteca.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const navigate = useNavigate();

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    if (accessToken && userId) {
      fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/usuario-detalles/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUser(data.data);
            setUserImg(data.data.imagenURL);
          }
        });
    }
  }, []);

  // Cerrar menú si se da clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      const response = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/usuarios/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        localStorage.clear();
        navigate('/login');
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error('Fallo al cerrar sesión:', errorData);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-[#9DC68E] p-2 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link to="/home" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10 sm:h-12 md:h-14" />
            <span className="text-xl sm:text-2xl font-bold">Turisteca</span>
          </Link>

          {user ? (
            <div className="relative">
              <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none"
              >
                <img
                  src={userImg || 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'}
                  alt="Perfil"
                  className="w-10 h-10 rounded-full object-cover border"
                />
              </button>
              {isOpen && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                >
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="font-bold hover:underline"><Link to="/perfil">{user.nombre}</Link></div>
                  </div>
                  <Link to="/mapa" className="block px-4 py-2 text-sm hover:bg-gray-100">Mapa</Link>
                  <Link to="/calculadora" className="block px-4 py-2 text-sm hover:bg-gray-100">Calculadora</Link>
                  <Link to="/destinos" className="block px-4 py-2 text-sm hover:bg-gray-100">Destinos</Link>
                  <Link to="/configuracion" className="block px-4 py-2 text-sm hover:bg-gray-100">Configuración</Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="hover:underline">Iniciar sesión</Link>
            </div>
          )}
        </div>
      </header>
      <div className='pt-15'></div>
    </>
  );
};

export default Header;
