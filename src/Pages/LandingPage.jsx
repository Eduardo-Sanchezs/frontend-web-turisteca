import React from 'react'
import { useState, useEffect } from "react";
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

const destinos = [
    {
        nombre: "Cascada Salto Del Agua",
        ubicacion: "El Naranjo, SLP.",
        imagen: "ElSalto.jpg", // Agrega aquí la ruta de la imagen
        link: "/destinos/cascada-salto-del-agua"
    },
    {
        nombre: "Cuevas De Mantetzulel",
        ubicacion: "Aquismón, SLP.",
        imagen: "Mantetzulel.jpg", // Agrega aquí la ruta de la imagen
        link: "/destinos/cuevas-mantetzulel"
    },
    {
        nombre: "Jardín Edward James",
        ubicacion: "Xilitla, SLP.",
        imagen: "BackGround.jpg", // Agrega aquí la ruta de la imagen
        link: "/destinos/jardin-edward-james"
    },
    {
        nombre: "Castillo De Beto Ramón",
        ubicacion: "Axtla De Terrazas, SLP.",
        imagen: "BetoRamon.jpg", // Agrega aquí la ruta de la imagen
        link: "/destinos/jardin-edward-james"
    }
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
                        Somos turisteca y nos dedicamos a promover el ecoturismo por medio de nuestra App, permitiendo a nuestros usuarios ser más responsables en sus viajes y proteger sus lugares favoritos en la región Huasteca.
                    </p>

                    <div className='bg-[#409223] w-45 h-auto flex rounded-full justify-center items-center mt-3'>
                        <Link to="/Anuncio" className='text-white'> Conoce Nuestra App </Link>
                    </div>

                </div>
            </div>

            {/* Slider de Imágenes */}
            <ImageSlider />

            {/* Sección de Destinos Más Famosos */}
            <Destinos />

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
                        <ul className="list-disc pl-10 mt-2 text-center md:text-left">
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


            {/* Sección Región Huasteca */}
            <div className="w-full flex flex-row justify-center mt-15">
                <div className="max-w-screen-lg w-full">
                    <h1 className="text-[#409223] text-4xl text-center md:text-left">¿Sabías Que?</h1>
                    <p className="text-justify mt-3">
                        El Nombre de la región Huasteca proviene de los huastecos, una civilización prehispánica que tenía su propia lengua, el téenek, y una cultura distinta a la de los mexicas y mayas. A diferencia de otras culturas mesoamericanas, los huastecos eran conocidos por su estilo de vestimenta minimalista, ya que debido al clima cálido y húmedo de la región, solían usar muy poca ropa. Incluso los conquistadores españoles se sorprendieron al ver su forma de vestir y sus elaboradas modificaciones corporales, como el limado de dientes y los tatuajes.
                    </p>
                </div>
            </div>
            <div className='pt-30'></div>
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
        <div className="relative w-full md:w-2/3 lg:w-1/2 h-[300px] md:h-[400px] mx-auto overflow-hidden rounded-lg shadow-lg mt-15">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((img, index) => (
                    <img key={index} src={img} alt="slider" className="w-full flex-shrink-0 object-cover h-full" onMouseEnter={() => setIsAutoSliding(false)} onMouseLeave={() => setIsAutoSliding(true)} />
                ))}
            </div>
            <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#409223] p-2 rounded-full text-white">
                <ChevronLeft />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#409223]  p-2 rounded-full text-white">
                <ChevronRight />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <div key={index} className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-500"}`} />
                ))}
            </div>
        </div>
    );
}

/* Sección de Destinos Más Famosos */
function Destinos() {
    return (
        <div className="w-full flex flex-col items-center mt-15 px-4">
            <h2 className="text-[#409223] text-2xl md:text-3xl font-bold mb-5 text-center">Destinos Más Famosos:</h2>

            {/* Contenedor de tarjetas con diseño responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-screen-lg w-full">
                {destinos.map((destino, index) => (
                    <Link key={index} to={`/descripcion-destino`} className="flex flex-col items-center border rounded-lg shadow-lg p-3 hover:scale-105 transition w-full border-[#9DC68E]">
                        <img src={destino.imagen} alt={destino.nombre} className="w-full h-48 object-cover rounded-lg" />
                        <h3 className="text-[#409223] font-bold mt-2 text-center">{destino.nombre}</h3>
                        <p className="text-gray-500 text-sm text-center">{destino.ubicacion}</p>
                    </Link>
                ))}
            </div>

            {/* Botón de "Mostrar Más" centrado y responsivo */}
            <Link to="/destinos" className="mt-5 px-6 py-3 bg-[#409223] text-white font-bold rounded-lg hover:bg-[#36791c] transition text-center w-full sm:w-auto">
                Mostrar Más
            </Link>
        </div>
    );
}

export default LandingPage;
