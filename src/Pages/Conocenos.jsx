import React from 'react'
import logo from '../assets/Turisteca.png';


const Conocenos = () => {
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
                                <div className='text-center'>
                                    <h1 className='text-3xl md:text-4xl font-extrabold text-[#409223]'>Misión</h1>
                                    <p className='text-sm md:text-base'>Promover el turismo sustentable en la región Huasteca mediante una plataforma digital que conecte a viajeros con destinos, servicios y actividades ecológicas, fomentando la conservación del medio ambiente y el desarrollo local responsable.</p>
                                </div>

                                <div className='text-center'>
                                    <h1 className='text-3xl md:text-4xl font-extrabold text-[#409223]'>Visión</h1>
                                    <p className='text-sm md:text-base'>Ser la aplicación líder en turismo ecológico en México, reconocida por su innovación tecnológica, compromiso ambiental y por transformar la manera en que se viaja, promoviendo experiencias sostenibles y conscientes en armonía con la naturaleza.</p>
                                </div>

                                <div className='text-center'>
                                    <h1 className='text-3xl md:text-4xl font-extrabold text-[#409223]'>Objetivo</h1>
                                    <p className='text-sm md:text-base'>Desarrollar una aplicación móvil y web que permita a los usuarios planificar viajes ecológicos en la región Huasteca, ofreciendo recomendaciones de rutas eficientes, alojamientos sostenibles, atractivos turísticos responsables y herramientas para calcular y reducir su huella de carbono.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Conocenos