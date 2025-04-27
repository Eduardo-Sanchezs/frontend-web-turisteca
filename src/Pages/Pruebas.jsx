import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Pruebas = () => {
    const { id } = useParams(); // Captura el ID de la URL
    const [destino, setDestino] = useState(null);

    useEffect(() => {
        async function fetchDestino() {
            try {
                // Primero inicia sesión para obtener el token
                const loginResponse = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/usuarios/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: 'juanperez',
                        password: 'contrasena'
                    })
                });

                const loginData = await loginResponse.json();
                const token = loginData.data.accessToken;

                // Ahora busca los detalles del destino
                const response = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/lugares/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();
                if (data.success) {
                    setDestino(data.data);
                } else {
                    console.error("Error obteniendo el destino:", data);
                }

            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchDestino();
    }, [id]);

    if (!destino) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-2xl text-[#409223]">Cargando destino...</p>
            </div>
        );
    }

    return (
        <div className="p-5">
            <h1 className="text-4xl font-bold text-[#409223] mb-4">{destino.nombre}</h1>
            <img src="/BackGround.jpg" alt={destino.nombre} className="w-full max-h-96 object-cover rounded-xl mb-4" />
            <p className="text-lg">{destino.descripcion}</p>
            {/* Puedes agregar más datos si la API regresa más campos */}
        </div>
    );
};

export default Pruebas;
