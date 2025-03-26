import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PersonajeDetalle() {
    const { id } = useParams();
    const [personaje, setPersonaje] = useState(null);

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then((res) => res.json())
            .then((data) => setPersonaje(data))
            .catch((error) => console.error("Error:", error));
    }, [id]);

    if (!personaje) return <p className="text-center mt-10">Cargando...</p>;

    return (
        <div className="p-6 text-center">
            <h1 className="text-3xl font-bold">{personaje.name}</h1>
            <img src={personaje.image} alt={personaje.name} className="mx-auto w-48 h-48 rounded-full mt-4" />
            <p className="mt-4 text-lg"><strong>Especie:</strong> {personaje.species}</p>
            <p className="mt-2 text-lg"><strong>Estado:</strong> {personaje.status}</p>
            <p className="mt-2 text-lg"><strong>Origen:</strong> {personaje.origin.name}</p>
        </div>
    );
}

export default PersonajeDetalle;
