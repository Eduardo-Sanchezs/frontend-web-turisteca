import React from 'react'

const Conocenos = () => {
    return (
        <>
            <div className="h-screen bg-[url('/BackGround.jpg')] bg-cover bg-center flex items-center justify-center px-4">
                <div className='w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0'>
                    {/* Logo */}
                    <div className='w-full md:w-1/2 flex justify-center items-center'>
                        <img src="/Logoo.png" alt="Logo" className='h-32 md:h-48 lg:h-56' />
                    </div>

                    {/* Contenido */}
                    <div className='w-full md:w-1/2 flex justify-center items-center'>
                        <div className='w-full max-w-lg bg-white bg-opacity-70 p-6 rounded-2xl shadow-lg'>
                            <div className='space-y-8'>
                                <div className='text-center'>
                                    <h1 className='text-3xl md:text-4xl font-extrabold text-[#409223]'>Misión</h1>
                                    <p className='text-sm md:text-base'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime laboriosam officia architecto recusandae.</p>
                                </div>

                                <div className='text-center'>
                                    <h1 className='text-3xl md:text-4xl font-extrabold text-[#409223]'>Visión</h1>
                                    <p className='text-sm md:text-base'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime laboriosam officia architecto recusandae.</p>
                                </div>

                                <div className='text-center'>
                                    <h1 className='text-3xl md:text-4xl font-extrabold text-[#409223]'>Objetivo</h1>
                                    <p className='text-sm md:text-base'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime laboriosam officia architecto recusandae.</p>
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