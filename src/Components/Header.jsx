import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <header className="flex bg-[#9DC68E] p-2">
        <div className='container mx-auto flex justify-between items-center'>
          <nav className='flex items-center space-x-2'>
            <Link to="/"><img src="Logoo.png" alt="" height={60} width={60} /></Link>
            <Link to="/"><h1 className=''>turisteca</h1></Link>
          </nav>
          <nav className='space-x-5 flex items-center'>
            <Link to="/quienes-somos">¿Quiénes Somos?</Link>
            <Link to="/destinos">Destinos</Link>
          </nav>
        </div>
      </header >
    </>
  )
}

export default Header;
