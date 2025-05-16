import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/Turisteca.png';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-[#9DC68E] p-2 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo + Título */}
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-10 w-10 sm:h-14 sm:w-14" />
            </Link>
            <Link to="/">
              <h1 className="text-xl sm:text-2xl font-bold">turisteca</h1>
            </Link>
          </div>

          {/* Menú hamburguesa */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black focus:outline-none"
              aria-label="Abrir menú"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Navegación escritorio */}
          <nav className="hidden md:flex space-x-5 items-center">
            <Link to="/destinos">Destinos</Link>
            <Link to="/registro">Registrate</Link>
          </nav>
        </div>

        {/* Menú móvil desplegable */}
        {isOpen && (
          <div className="md:hidden mt-2 px-4 space-y-2 bg-[#9DC68E] pb-4">
            <Link to="/conocenos" className="block" onClick={() => setIsOpen(false)}>Registrate</Link>
            <Link to="/destinos" className="block" onClick={() => setIsOpen(false)}>Destinos</Link>
          </div>
        )}
      </header>

      {/* Compensación para el header fijo */}
      <div className="pt-10"></div>
    </>
  );
}

export default Header;
