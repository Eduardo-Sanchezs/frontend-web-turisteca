import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const images = [
    "/BackGround.jpg",
    "Huasteca_1.jpg",
    "Huasteca_2.jpg",
    "Huasteca_3.jpg",
    "Huasteca_4.jpg",
    "Huasteca_5.jpg",
    "Huasteca_6.jpg",
    "Huasteca_7.jpg",
];

const LandingPage = () => {
    return (
        <>
            {/* Sección de Introducción */}
            <div className="w-full flex justify-center mt-10 px-4">
                <div className="max-w-screen-lg w-full">
                    <h1 className="text-[#409223] text-4xl md:text-5xl font-bold mt-5">turisteca</h1>
                    <p className="text-justify mt-5 text-gray-700">
                        El turismo es una de las principales actividades económicas y culturales en México, y
                        la región Huasteca es un destino con un gran potencial gracias a su riqueza natural,
                        histórica y gastronómica. Sin embargo, la planificación eficiente de un viaje puede ser un reto debido a la dispersión de información, la falta de integración de servicios y la
                        necesidad de fomentar un turismo más sostenible. Por suerte nosotros tenemos la solución.
                        Somos turisteca y nos dedicamos a promover el ecoturismo por medio de nuestra red social, permitiendo a nuestros usuarios ser más responsables en sus viajes y proteger sus lugares favoritos en la región Huasteca.
                    </p>

                    <div className="w-full flex justify-center sm:justify-start mt-5">
                        <Link
                            to="/Login"
                            className="bg-[#409223] text-white text-sm sm:text-base font-semibold px-4 sm:px-5 py-1.5 sm:py-2.5 rounded-full shadow-lg hover:bg-[#36791c] hover:shadow-xl transition duration-300 ease-in-out w-full sm:w-auto text-center"
                        >
                            Únete a nuestra comunidad
                        </Link>
                    </div>
                </div>
            </div>


            {/* Slider de Imágenes */}
            <ImageSlider />

            {/* Sección Turismo Responsabkle */}
            <div className="w-full flex justify-center mt-10 px-4 sm:px-8">
                <div className="max-w-screen-lg w-full">
                    <h1 className="text-[#409223] text-3xl sm:text-4xl text-center sm:text-left font-semibold">
                        Turismo responsable
                    </h1>
                    <p className="text-justify mt-3 text-sm sm:text-base">
                        El turismo responsable implica reconocer y actuar sobre el impacto ambiental que generan nuestras decisiones al viajar, especialmente en lo que respecta a la emisión de gases de efecto invernadero. La reducción de la huella de carbono se ha convertido en una prioridad global, y en el contexto del turismo, esto significa elegir medios de transporte más eficientes, planificar rutas sostenibles y preferir alojamientos y servicios comprometidos con el medio ambiente. En Turisteca, fomentamos una cultura de viaje consciente que no solo enriquece al visitante, sino que protege el equilibrio ecológico de la región Huasteca, asegurando su preservación para las futuras generaciones.
                    </p>
                </div>
            </div>

            {/* Sección de Destinos Más Famosos */}
            <DestinosFamosos />

            {/* Sección Región Huasteca */}
            <div className="w-full flex flex-col items-center justify-center px-4 mt-15">
                <div className="max-w-screen-lg w-full flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10 justify-between px-4">
                    <div className="w-full md:w-1/2">
                        <h1 className="text-[#409223] text-4xl text-center md:text-left">Región Huasteca</h1>
                        <p className="text-center md:text-left">
                            La Huasteca es una cultura viva cuya raíz se remonta a la época prehispánica. Sus tradiciones y rasgos característicos han trascendido a nuestros tiempos.
                        </p>

                        <h2 className="mt-3 text-[#409223] text-2xl text-center md:text-left">Ubicación:</h2>
                        <p className="text-center md:text-left">
                            Está situada al noreste de Mesoamérica, culturalmente pertenece a la subárea Costa del Golfo, abarcando parcialmente seis estados de la república mexicana:
                        </p>

                        <ul className="list-disc list-inside text-center md:text-left mt-2">
                            <li>Hidalgo</li>
                            <li>Puebla</li>
                            <li>Querétaro</li>
                            <li>San Luis Potosí</li>
                            <li>Tamaulipas</li>
                            <li>Veracruz</li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/2 flex justify-center">
                        <img src="/Mapa.jpg" alt="Mapa Huasteca" className="rounded-lg shadow-lg w-full max-w-md" />
                    </div>
                </div>
            </div>


            {/* Sección ¿Sabías Que? */}
            <div className="w-full flex justify-center mt-6 px-4 sm:px-8">
                <div className="max-w-screen-lg w-full">
                    <h1 className="text-[#409223] text-3xl sm:text-4xl text-center sm:text-left font-semibold">
                        ¿Sabías qué?
                    </h1>
                    <p className="text-justify mt-3 text-sm sm:text-base">
                        El Nombre de la región Huasteca proviene de los huastecos, una civilización prehispánica que tenía su propia lengua, el téenek, y una cultura distinta a la de los mexicas y mayas. A diferencia de otras culturas mesoamericanas, los huastecos eran conocidos por su estilo de vestimenta minimalista, ya que debido al clima cálido y húmedo de la región, solían usar muy poca ropa. Incluso los conquistadores españoles se sorprendieron al ver su forma de vestir y sus elaboradas modificaciones corporales, como el limado de dientes y los tatuajes.
                    </p>
                </div>
            </div>
            <div className="pt-30"></div>
        </>
    );
}

/* Slider de Imágenes */
export function ImageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoSliding, setIsAutoSliding] = useState(true);

    useEffect(() => {
        if (!isAutoSliding) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2300);
        return () => clearInterval(interval);
    }, [isAutoSliding]);

    const prevSlide = () => {
        setIsAutoSliding(false);
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setIsAutoSliding(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className="relative w-full md:w-2/3 lg:w-1/2 aspect-[16/9] mx-auto overflow-hidden rounded-lg shadow-lg mt-15">
            <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((img, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0">
                        <img
                            src={img}
                            alt={`slide-${index}`}
                            className="w-full h-full object-cover"
                            onMouseEnter={() => setIsAutoSliding(false)}
                            onMouseLeave={() => setIsAutoSliding(true)}
                        />
                    </div>
                ))}
            </div>

            <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#409223] p-2 rounded-full text-white">
                <ChevronLeft />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#409223] p-2 rounded-full text-white">
                <ChevronRight />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-500"}`}
                    />
                ))}
            </div>
        </div>
    );
}


/* Sección de Destinos Más Famosos */
/* Sección de Destinos Más Famosos */
function DestinosFamosos() {
    const [destinos, setDestinos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDestinos() {
            try {
                // Obtener lugares directamente sin autenticación
                const lugaresResponse = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/lugares');
                const lugaresData = await lugaresResponse.json();

                if (lugaresData.success) {
                    const destinosFiltrados = lugaresData.data.filter(destino => destino.idCategoria === 1 || destino.idCategoria === 4);

                    const destinosConImagen = await Promise.all(destinosFiltrados.slice(0, 4).map(async (destino) => {
                        try {
                            const imagenResponse = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/imagen-url/${destino.idImagen}`);
                            const imagenData = await imagenResponse.json();
                            return {
                                ...destino,
                                imagenURL: imagenData.data?.imagenURL || "/BackGround.jpg"
                            };
                        } catch (error) {
                            console.error(`Error obteniendo imagen para destino ${destino.nombre}:`, error);
                            return { ...destino, imagenURL: "/BackGround.jpg" };
                        }
                    }));

                    setDestinos(destinosConImagen);
                } else {
                    console.error('Error al obtener lugares:', lugaresData);
                }

            } catch (error) {
                console.error('Error general:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchDestinos();
    }, []);

    if (loading) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
                <p className="text-[#409223] text-xl mt-4">Cargando destinos...</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col items-center mt-15 px-4">
            <h2 className="text-[#409223] text-2xl md:text-3xl font-bold mb-5 text-center">Destinos recomendados:</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-screen-lg w-full">
                {destinos.map((destino) => (
                    <Link
                        key={destino.id}
                        to={`/descripcion-destino/${destino.id}`}
                        className="flex flex-col items-center border rounded-lg shadow-lg p-3 hover:scale-105 transition w-full border-[#9DC68E]"
                    >
                        <img src={destino.imagenURL} alt={destino.nombre} className="w-full h-48 object-cover rounded-lg" />
                        <h3 className="text-[#409223] font-bold mt-2 text-center">{destino.nombre}</h3>
                        <p className="text-gray-500 text-sm text-center">{destino.descripcion}</p>
                    </Link>
                ))}
            </div>

            <Link to="/destinos" className="mt-5 px-6 py-3 bg-[#409223] text-white font-bold rounded-lg hover:bg-[#36791c] transition text-center w-full sm:w-auto">
                Mostrar más
            </Link>
        </div>
    );
}


export default LandingPage;
