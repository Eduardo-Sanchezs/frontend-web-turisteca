import React from 'react'
import logo from '../assets/Turisteca.png';


const Anuncio = () => {
    return (
        <>
            <div className="h-screen bg-[url('/BackGround.jpg')] bg-cover bg-center flex items-center justify-center px-4">
                <div className='w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0'>
                    {/* Logo */}
                    <div className='w-full md:w-1/2 flex justify-center items-center'>
                        <div className='w-auto h-auto bg-white rounded-full'>
                            <img src={logo} alt="Logo" className='h-32 md:h-48 lg:h-76' />
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className='w-full md:w-1/2 flex justify-center items-center'>
                        <div className='w-full max-w-lg bg-white bg-opacity-70 p-6 rounded-2xl shadow-lg'>
                            <div className='space-y-8'>
                                <div className='w-full'>
                                    <h1 className='text-center text-5xl font-extrabold text-[#409223]'> ¿Ya Conoces Nuesta App? </h1>
                                    <p className='text-center mt-3 font-bold text-2xl'>
                                        Descubre la Huasteca de manera sostenible. Planifica tu viaje ecológico, reduce tu huella de carbono y vive la naturaleza responsablemente con Turisteca.
                                    </p>
                                </div>
                                <div className='flex flex-col w-full items-center justify-center'>
                                    <a href="https://play.google.com/store/" target="_blank" rel="noopener noreferrer">
                                        <img src="/Playstore.png" alt="Descargar en Google Play" className="w-48 md:w-52 " />
                                    </a>
                                    <br />
                                    <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                                        <img src="/Appstore.png" alt="Descargar en App Store" className="w-48 md:w-52" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Anuncio