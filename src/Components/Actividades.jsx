import React, { useState } from "react";
import { X } from "lucide-react"; // Ícono para el botón de cierre

const Actividad = [
    {
        nombre: "Clavados",
        imagen: "ElSalto.jpg",
        descripcion: "Siente la adrenalina saltando desde las rocas hacia las pozas de aguas cristalinas de la cascada. ¡Una experiencia refrescante e inolvidable!",
    },
    {
        nombre: "Pesca",
        imagen: "Pesca.jpg",
        descripcion: "Disfruta de la tranquilidad pescando en las aguas del río que alimenta la cascada. Un lugar perfecto para relajarse y conectar con la naturaleza.",
    },
    {
        nombre: "Buceo",
        imagen: "Buceo.jpg",
        descripcion: "Explora las profundidades de las pozas de la cascada y descubre la vida acuática que habita en sus aguas cristalinas. ¡Una aventura submarina única!",
    },
    {
        nombre: "Paseo En Lancha",
        imagen: "Lancha.jpg",
        descripcion: "Navega por el río y admira la majestuosidad de la Cascada El Salto desde una perspectiva diferente. Un paseo relajante rodeado de exuberante vegetación.",
    }
];

function Actividades() {
    const [open, setOpen] = useState(false);
    const [selectedActividad, setSelectedActividad] = useState(null);

    const handleOpen = (actividad) => {
        setSelectedActividad(actividad);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedActividad(null);
    };

    return (
        <div className="w-full h-full relative">
            <div className="w-full flex flex-col items-center mt-10 px-4">
                <h2 className="text-[#409223] text-2xl md:text-3xl font-bold mb-6 text-center">
                    Actividades Que Puedes Realizar:
                </h2>

                {/* Contenedor de tarjetas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-screen-lg w-full">
                    {Actividad.map((actividad, index) => (
                        <div key={index}
                            className="flex flex-col items-center border rounded-lg shadow-md p-3 hover:scale-105 transition w-full cursor-pointer"
                            onClick={() => handleOpen(actividad)}>
                            <img src={actividad.imagen} alt={actividad.nombre} className="w-full h-40 object-cover rounded-lg" />
                            <h3 className="text-[#409223] font-semibold mt-2 text-center">{actividad.nombre}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Personalizado */}
            {open && selectedActividad && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Capa de desenfoque */}
                    <div className="absolute inset-0 backdrop-blur-md bg-white/30"></div>

                    {/* Contenedor del modal (sin desenfoque) */}
                    <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg relative z-50">
                        {/* Botón de cierre */}
                        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition" onClick={handleClose}>
                            <X size={24} />
                        </button>

                        {/* Contenido del Modal */}
                        <div className="flex flex-col items-center gap-4 mt-3">
                            <img src={selectedActividad.imagen} alt={selectedActividad.nombre} className="w-80 h-80 object-cover rounded-lg shadow-md" />
                            <h1 className="text-[#409223] text-2xl font-bold">{selectedActividad.nombre}</h1>
                            <p className="text-center">{selectedActividad.descripcion}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Actividades;
