import React from 'react';
import logo from '../assets/Turisteca.png';

const Conocenos = () => {
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
                        <div className="w-full max-w-lg bg-white bg-opacity-80 p-6 rounded-2xl shadow-lg text-center space-y-8">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#409223]">Misión</h1>
                                <p className="text-sm sm:text-base text-gray-800 mt-2">
                                    Promover el turismo sustentable en la región Huasteca mediante una plataforma digital que conecte a viajeros con destinos, servicios y actividades ecológicas, fomentando la conservación del medio ambiente y el desarrollo local responsable.
                                </p>
                            </div>

                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#409223]">Visión</h1>
                                <p className="text-sm sm:text-base text-gray-800 mt-2">
                                    Ser la aplicación líder en turismo ecológico en México, reconocida por su innovación tecnológica, compromiso ambiental y por transformar la manera en que se viaja, promoviendo experiencias sostenibles y conscientes en armonía con la naturaleza.
                                </p>
                            </div>

                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#409223]">Objetivo</h1>
                                <p className="text-sm sm:text-base text-gray-800 mt-2">
                                    Desarrollar una aplicación móvil y web que permita a los usuarios planificar viajes ecológicos en la región Huasteca, ofreciendo recomendaciones de rutas eficientes, alojamientos sostenibles, atractivos turísticos responsables y herramientas para calcular y reducir su huella de carbono.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Conocenos;
