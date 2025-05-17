import React, { useEffect, useState } from 'react';

const Perfil = () => {
    const [user, setUser] = useState({
        username: 'El Pinshi Patron',
        avatarUrl: 'https://i.pinimg.com/736x/a4/01/10/a40110eee07e3a42b85925e6e654577f.jpg',
        bio: 'y si le metemos biografía?. _.',
        posts: 12,
        followers: 350,
        following: 180,
    });

    return (
        <div className=" bg-gray-100 px-4 py-8 flex justify-center mt-2">
            <div className="w-full max-w-4xl">
                {/* Encabezado */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-12 mb-8">
                    {/* Foto de perfil */}
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-[#409223]">
                        <img
                            src={user.avatarUrl}
                            alt="Foto de perfil"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Info del usuario */}
                    <div className="flex-1">
                        {/* Nombre y botón */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">{user.username}</h2>
                            <button className="bg-white border border-gray-300 px-4 py-1 rounded-md text-sm hover:bg-gray-100 transition" to="./home">
                                Editar perfil
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-6 mt-4 text-center sm:text-left">
                            <div>
                                <span className="font-semibold">{user.posts}</span> publicaciones
                            </div>
                            <div>
                                <span className="font-semibold">{user.followers}</span> seguidores
                            </div>
                            <div>
                                <span className="font-semibold">{user.following}</span> seguidos
                            </div>
                        </div>

                        {/* Biografía */}
                        <div className="mt-4 text-gray-700 text-sm sm:text-base">
                            {user.bio}
                        </div>
                    </div>
                </div>

                {/* Línea divisoria */}
                <hr className="border-gray-300 mb-6" />

                {/* Galería de publicaciones (puedes rellenar con grid si quieres mostrar imágenes después) */}

            </div>
        </div>
    );
};

export default Perfil;
