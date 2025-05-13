import React from 'react';
import logo from '../assets/Turisteca.png';

const Anuncio = () => {
    return (
        <>
            <div className="min-h-screen bg-[url('/BackGround.jpg')] bg-cover bg-center flex items-center justify-center px-4 py-24">
                <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Logo */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center">
                        <div className="bg-white rounded-full p-4 shadow-lg">
                            <img src={logo} alt="Logo" className="h-28 sm:h-36 md:h-48 lg:h-64 object-contain" />
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center">
                        <div className="w-full max-w-lg bg-white bg-opacity-80 p-6 rounded-2xl shadow-lg text-center">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#409223]">
                                ¿Ya conoces nuestra app?
                            </h1>
                            <p className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                                Descubre la Huasteca de manera sostenible. Planifica tu viaje ecológico, reduce tu huella de carbono y vive la naturaleza responsablemente con Turisteca.
                            </p>

                            <div className="mt-8 space-y-4">
                                <a href="https://play.google.com/store/" target="_blank" rel="noopener noreferrer">
                                    <img src="/Playstore.png" alt="Descargar en Google Play" className="w-40 sm:w-48 mx-auto" />
                                </a>
                                <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                                    <img src="/Appstore.png" alt="Descargar en App Store" className="w-40 sm:w-48 mx-auto" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Anuncio;
