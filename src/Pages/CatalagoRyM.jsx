import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Catalogo() {
    const [personajes, setPersonajes] = useState([]);

    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character")
            .then((res) => res.json())
            .then((data) => setPersonajes(data.results))
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {personajes.map((personaje) => (
                <div key={personaje.id} className="border rounded-lg p-4 shadow-md bg-white">
                    <h2 className="text-xl font-semibold">{personaje.name}</h2>
                    <img src={personaje.image} alt={personaje.name} className="w-full h-40 object-cover mt-2 rounded" />
                    <Link to={`/personaje/${personaje.id}`} className="block mt-2 text-blue-500">
                        Ver más
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Catalogo;
