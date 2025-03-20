import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { X } from "lucide-react"; // Ícono para el botón de cierre

const destinos = [
    {
        nombre: "Clavados",
        imagen: "ElSalto.jpg",
        descripcion: "Una hermosa cascada en la Huasteca Potosina con aguas cristalinas.",
    },
    {
        nombre: "Pesca",
        imagen: "Pesca.jpg",
        descripcion: "Cuevas místicas rodeadas de exuberante vegetación.",
    },
    {
        nombre: "Buceo",
        imagen: "Buceo.jpg",
        descripcion: "Un jardín surrealista con esculturas únicas en medio de la selva.",
    },
    {
        nombre: "Paseo En Lancha",
        imagen: "L.jpg",
        descripcion: "Un destino desconocido pero fascinante en la Huasteca.",
    }
];

function Aynose() {
    const [open, setOpen] = useState(false);
    const [selectedDestino, setSelectedDestino] = useState(null);

    const handleOpen = (destino) => {
        setSelectedDestino(destino);
        setOpen(true);
    };

    return (
        <div className="w-full flex flex-col items-center mt-10 px-4">
            <h2 className="text-[#409223] text-2xl md:text-3xl font-bold mb-6 text-center">
                Actividades Que Puedes Realizar:
            </h2>

            {/* Contenedor de tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-screen-lg w-full">
                {destinos.map((destino, index) => (
                    <div key={index}
                        className="flex flex-col items-center border rounded-lg shadow-md p-3 hover:scale-105 transition w-full cursor-pointer"
                        onClick={() => handleOpen(destino)}>
                        <img src={destino.imagen} alt={destino.nombre} className="w-full h-40 object-cover rounded-lg" />
                        <h3 className="text-[#409223] font-semibold mt-2 text-center">{destino.nombre}</h3>
                        <p className="text-gray-500 text-sm text-center">{destino.ubicacion}</p>
                    </div>
                ))}
            </div>

            {/* Modal Mejorado */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg bg-white rounded-xl shadow-xl p-6 relative">
                    {selectedDestino && (
                        <div className="flex flex-col items-center gap-4 mt-3">
                            {/* Botón de cierre */}
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
                                onClick={() => setOpen(false)}
                            >
                                <X size={24} />
                            </button>

                            {/* Imagen más pequeña y centrada */}
                            <img src={selectedDestino.imagen} alt={selectedDestino.nombre}
                                className="w-80 h-80 object-cover rounded-lg shadow-md" />

                            {/* Texto estilizado */}
                            <h1 className="text-[#409223] text-2xl font-bold">{selectedDestino.nombre}</h1>
                            <p>{selectedDestino.descripcion}</p>

                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Aynose;