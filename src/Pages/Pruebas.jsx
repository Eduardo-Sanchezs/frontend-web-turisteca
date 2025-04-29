import { useEffect, useState } from "react";

function App() {
    const [lugares, setLugares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loginYObtenerLugares = async () => {
            try {
                // 1. Login automático
                const loginResponse = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        correo: "admin@gmail.com", // Usuario de Postman
                        password: "123456",        // Contraseña de Postman
                    }),
                });

                if (!loginResponse.ok) {
                    throw new Error("Error en login");
                }

                const loginData = await loginResponse.json();
                const token = loginData.token;

                // 2. Obtener lugares usando el token
                const lugaresResponse = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/lugares', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!lugaresResponse.ok) {
                    throw new Error("Error al obtener lugares");
                }

                const lugaresData = await lugaresResponse.json();

                // 3. Filtrar lugares (solo idCategoria 1 y 4)
                const lugaresFiltrados = lugaresData.lugares.filter(
                    lugar => lugar.idCategoria === 1 || lugar.idCategoria === 4
                );

                setLugares(lugaresFiltrados);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        loginYObtenerLugares();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen text-2xl">Cargando...</div>;
    }

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lugares.map((lugar) => (
                <div key={lugar.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <img src={lugar.img} alt={lugar.nombre} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold">{lugar.nombre}</h2>
                        <p className="text-gray-600">{lugar.descripcion}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default App;
