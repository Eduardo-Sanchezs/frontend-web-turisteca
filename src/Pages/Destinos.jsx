import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Destinos = () => {
    return (
        <>
            <div className="min-h-screen bg-[url('/BackGround.jpg')] bg-cover bg-center flex justify-center items-center px-4 py-24 sm:py-32">
                <div className="bg-white/70 rounded-3xl w-full max-w-4xl px-6 py-10 flex flex-col items-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#409223] text-center">
                        Destinos turísticos en la huasteca potosina
                    </h1>
                    <div className="mt-6 space-y-6 text-center text-base sm:text-lg md:text-xl w-full max-w-2xl">
                        <p>
                            En esta sección, encontrarás información detallada sobre los increíbles destinos turísticos que ofrece la hermosa región de la Huasteca Potosina. Descubre impresionantes cascadas, exuberantes selvas, antiguas zonas arqueológicas y mucho más.
                        </p>
                        <p>
                            Nuestro objetivo es brindarte toda la información necesaria para que puedas planificar tu visita y disfrutar al máximo de estos sitios turísticos.
                        </p>
                    </div>
                </div>
            </div>

            <Catalogo />
        </>
    );
};

function Catalogo() {
    const [destinos, setDestinos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // Primero iniciar sesión
                const loginResponse = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/usuarios/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: 'juanperez',
                        password: 'contrasena'
                    })
                });

                const loginData = await loginResponse.json();

                if (!loginData.data || !loginData.data.accessToken) {
                    console.error('Error al iniciar sesión:', loginData);
                    setLoading(false);
                    return;
                }

                const token = loginData.data.accessToken;

                // Obtener ciudades
                const ciudadesResponse = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/ciudades', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const ciudadesData = await ciudadesResponse.json();
                if (ciudadesData.success) {
                    setCiudades(ciudadesData.data); // Guardamos las ciudades
                }

                // Luego obtener lugares
                const lugaresResponse = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/lugares', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const lugaresData = await lugaresResponse.json();

                if (lugaresData.success) {
                    const destinosFiltrados = lugaresData.data.filter(destino => destino.idCategoria === 1 || destino.idCategoria === 4);

                    // Ahora por cada destino, buscar su imagen
                    const destinosConImagen = await Promise.all(destinosFiltrados.map(async (destino) => {
                        try {
                            const imagenResponse = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/imagen-url/${destino.idImagen}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                            const imagenData = await imagenResponse.json();
                            return {
                                ...destino,
                                imagenURL: imagenData.data?.imagenURL || "/BackGround.jpg" // usa backup si falla
                            };
                        } catch (error) {
                            console.error(`Error obteniendo imagen para destino ${destino.nombre}:`, error);
                            return {
                                ...destino,
                                imagenURL: "/BackGround.jpg"
                            };
                        }
                    }));

                    setDestinos(destinosConImagen);

                } else {
                    console.error('Error al obtener lugares:', lugaresData);
                }

            } catch (err) {
                console.error('Error general:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
                <p className="text-[#409223] text-xl mt-4">Cargando destinos...</p>
            </div>
        );
    }

    // Función para obtener el nombre de la ciudad
    const obtenerCiudad = (idCiudad) => {
        const ciudad = ciudades.find(c => c.id === idCiudad);
        return ciudad ? ciudad.nombre : 'Ciudad desconocida';
    };

    return (
        <>
            <div className="w-full flex flex-col items-center mt-15 px-4">
                <h2 className="text-[#409223] text-2xl md:text-3xl font-bold mb-5 text-center">Catálogo de destinos:</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-auto">
                    {destinos.map((destino) => (
                        <Link key={destino.id} to={`/descripcion-destino/${destino.id}`} className="flex flex-col items-center border rounded-lg shadow-lg p-3 hover:scale-105 transition w-auto">
                            <img
                                src={destino.imagenURL}
                                alt={destino.nombre}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <h3 className="text-[#409223] font-bold mt-2 text-center">{destino.nombre}</h3>
                            <p className="text-gray-500 text-sm text-center">{obtenerCiudad(destino.idCiudad)}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='pt-30'></div>
        </>
    );
}

export default Destinos;
