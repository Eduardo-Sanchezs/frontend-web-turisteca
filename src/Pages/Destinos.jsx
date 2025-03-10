import React from 'react'
import { Link } from "react-router-dom";



const catalago = [
    {
        nombre: "Cascada Salto Del Agua",
        ubicacion: "El Naranjo, SLP.",
        imagen: "", // Agrega aquí la ruta de la imagen
        link: "/destinos/cascada-salto-del-agua"
    },
    {
        nombre: "Cuevas De Mantetzulel",
        ubicacion: "Aquismón, SLP.",
        imagen: "", // Agrega aquí la ruta de la imagen
        link: "/destinos/cuevas-mantetzulel"
    },
    {
        nombre: "Jardín Edward James",
        ubicacion: "Xilitla, SLP.",
        imagen: "", // Agrega aquí la ruta de la imagen
        link: "/destinos/jardin-edward-james"
    },
    {
        nombre: "Cascada Salto Del Agua",
        ubicacion: "El Naranjo, SLP.",
        imagen: "", // Agrega aquí la ruta de la imagen
        link: "/destinos/cascada-salto-del-agua"
    },
    {
        nombre: "Cuevas De Mantetzulel",
        ubicacion: "Aquismón, SLP.",
        imagen: "", // Agrega aquí la ruta de la imagen
        link: "/destinos/cuevas-mantetzulel"
    },
    {
        nombre: "Jardín Edward James",
        ubicacion: "Xilitla, SLP.",
        imagen: "", // Agrega aquí la ruta de la imagen
        link: "/destinos/jardin-edward-james"
    },
    {
        nombre: "Cascada Salto Del Agua",
        ubicacion: "El Naranjo, SLP.",
        imagen: "", // Agrega aquí la ruta de la imagen
        link: "/destinos/cascada-salto-del-agua"
    },
    {
        nombre: "Cuevas De Mantetzulel",
        ubicacion: "Aquismón, SLP.",
        imagen: "", // Agrega aquí la ruta de la imagen
        link: "/destinos/cuevas-mantetzulel"
    },
    {
        nombre: "Jardín Edward James",
        ubicacion: "Xilitla, SLP.",
        imagen: "", // Agrega aquí la ruta de la imagen
        link: "/destinos/jardin-edward-james"
    },
    {
        nombre: "Jardín Edward James",
        ubicacion: "Xilitla, SLP.",
        imagen: "", // Agrega aquí la ruta de la imagen
        link: "/destinos/jardin-edward-james"
    },
    {
        nombre: "Aynose",
        ubicacion: "Aja",
        imagen: "", // Agrega aquí la ruta de la imagen
        link: "/destinos/jardin-edward-james"
    }
];



const Destinos = () => {
    return (
        <>
            <div className="h-screen bg-[url('/BackGround.jpg')] bg-cover bg-center">
                <div className='flex flex-row w-auto h-screen justify-center items-center'>
                    <div className='flex flex-col w-300 h-auto min-h-lg justify-center items-center rounded-3xl' style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                        <br /><h1 className='text-6xl font-serif text-[#409223] text-center'> Destinos Turisticos En La Huasteca Potosina</h1><br />
                        <div className='flex flex-col w-3/4 text-center text-2xl'>
                            <p>En esta sección, encontrarás información detallada sobre los increíbles destinos turísticos que ofrece la hermosa región de la Huasteca Potosina. Descubre impresionantes cascadas, exuberantes selvas, antiguas zonas arqueológicas y mucho más.</p><br />
                            <p>Nuestro objetivo es brindarte toda la información necesaria para que puedas planificar tu visita y disfrutar al máximo de estos sitios turísticos. Te proporcionaremos datos prácticos, consejos útiles y recomendaciones para que tu experiencia sea inolvidable.</p>
                            <br /></div>
                    </div>
                </div>
            </div>
            <Catalago />

        </>
    )
}

function Catalago() {
    return (
        <>
            <div className="w-full flex flex-col items-center mt-15 px-4">
                <h2 className="text-[#409223] text-2xl md:text-3xl font-bold mb-5 text-center">Destinos Más Famosos:</h2>

                {/* Contenedor de tarjetas con diseño responsivo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 w-auto">
                    {catalago.map((destino, index) => (
                        <Link key={index} to={destino.link} className="flex flex-col items-center border rounded-lg shadow-lg p-3 hover:scale-105 transition w-auto">
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
            <div className='pt-30'></div>
        </>
    );
}

export default Destinos


