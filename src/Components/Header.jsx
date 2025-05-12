import { Link } from 'react-router-dom';
import logo from '../assets/Turisteca.png';

function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-[#9DC68E] p-2 z-50 shadow-md">
        <div className='container mx-auto flex justify-between items-center'>
          <nav className='flex items-center space-x-2'>
            <Link to="/"><img src={logo} alt="Logo" height={60} width={60} /></Link>
            <Link to="/"><h1 className='text-2xl font-bold'>turisteca</h1></Link>
          </nav>
          <nav className='space-x-5 flex items-center'>
            <Link to="/conocenos">Conoce turisteca</Link>
            <Link to="/destinos">Destinos</Link>
          </nav>
        </div>
      </header>
      {/* Agregamos padding superior para evitar que el contenido quede oculto detrás del header */}
      <div className="pt-16"></div>
    </>
  );
}

export default Header;