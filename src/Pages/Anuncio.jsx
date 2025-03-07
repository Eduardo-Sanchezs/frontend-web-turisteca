import React from 'react'

const Anuncio = () => {
    return (
        <>
            <div className="h-screen bg-[url('/BackGround.jpg')] bg-cover bg-center">
                <div className=' h-screen w-full flex flex-col items-center justify-center mt-2.5'>
                    <div className='h-full w-full lg flex flex-row  justify-between'>
                        <div className='flex w-full md:w-1/2 justify-center items-center'>
                            <img src="/Logoo.png" alt="" className='h-110' />
                        </div>

                        <div className='w-full md:w-1/2 flex justify-center items-center'>
                            <div className='w-11/12 h-11/12 flex justify-center items-center rounded-4xl' style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                                <div className='w-9/10 h-9/10 justify-center items-center rounded-4xl space-y-23'>
                                    <div className='w-full'>
                                        <h1 className='text-center text-5xl font-extrabold text-[#409223]'> ¿Ya Conoces Nuesta App? </h1>
                                        <p className='text-center'>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime laboriosam officia architecto recusandae, aut tempore fugit quam voluptates, excepturi veniam, nobis dolorem ea omnis sint laudantium? Asperiores modi deleniti sunt?
                                        </p>
                                    </div>

                                    <div className='w-full'>
                                        <a href="https://play.google.com/store/" target="_blank" rel="noopener noreferrer">
                                            <img src="/Playstore.png" alt="Descargar en Google Play" className="w-48 md:w-52" />
                                        </a>
                                    </div>
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