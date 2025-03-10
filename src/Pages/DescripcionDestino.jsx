import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const hoteles = [
  { id: 1, nombre: "Hotel y Eco-Expediciones Sundial", ubicacion: "El Naranjo, SLP.", img: "/hotel1.jpg", link: "/hotel1" },
  { id: 2, nombre: "Hotel Salto del Meco - Huasteca Secreta", ubicacion: "El Naranjo, SLP.", img: "/hotel2.jpg", link: "/hotel2" },
  { id: 3, nombre: "Hotel Del Valle", ubicacion: "El Naranjo, SLP.", img: "/hotel3.jpg", link: "/hotel3" },
  { id: 4, nombre: "Hotel La Huasteca", ubicacion: "Ciudad Valles, SLP.", img: "/hotel4.jpg", link: "/hotel4" },
  { id: 5, nombre: "Hotel Paraíso Encantado", ubicacion: "Xilitla, SLP.", img: "/hotel5.jpg", link: "/hotel5" }
];

const DescripcionDestino = () => {
  const [expandido, setExpandido] = useState(false);

  return (
    <>
      <div className="h-screen bg-[url('/BackGround.jpg')] bg-cover bg-center">
        <div className="flex flex-row w-auto h-screen justify-center items-center">
          <div className="flex flex-col w-300 h-auto min-h-lg justify-center items-center rounded-3xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
            <br /><h1 className="text-6xl font-serif text-[#409223] text-center">
              Cascada Aynose</h1><br />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-10 px-4">
        <div className="max-w-screen-lg w-full">
          <h1 className="text-[#409223] text-4xl md:text-5xl font-bold mt-5">Cascada Aynose</h1>
          <p className="text-justify mt-5 text-gray-700">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem a libero, recusandae fugit tenetur nostrum laboriosam sit, iste, laborum distinctio doloremque facere! Omnis error porro ipsam, dignissimos facere id animi.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure a magnam amet molestias quas nesciunt error quod voluptas at dolor eum qui enim deserunt repellendus possimus ab, architecto aperiam iusto.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta sapiente beatae itaque veniam atque possimus est fugiat eaque commodi accusamus ex repellat odit architecto asperiores reiciendis, nulla voluptatum modi consequuntur.
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center mt-10 px-4">
        <div className="max-w-screen-lg w-full">
          <h1 className="text-[#409223] text-4xl md:text-3xl font-bold mt-5 text-center">Explora Su Ubicación:</h1>
          <br /><br /><br />
          <p>Aqui deberia ir el mapa con la API, pero, xd</p>
        </div>
      </div>

      {/* Lista de Hoteles */}
      <ListaHoteles expandido={expandido} setExpandido={setExpandido} />


      <div className="w-full flex justify-center mt-10 px-4">
        <div className="max-w-screen-lg w-full">
          <h1 className="text-[#409223] text-4xl md:text-3xl font-bold mt-5 text-center">Reseñas Falsotas:</h1>
          <br /><br /><br />
          <p>Ay que bonito</p>
          <p>Gei el que no vaya</p>
          <p>ta bien culero. _.</p>
        </div>
      </div>
    </>
  );
};

const ListaHoteles = ({ expandido, setExpandido }) => {
  const navigate = useNavigate();
  const hotelesMostrados = expandido ? hoteles : hoteles.slice(0, 3);

  return (
    <div className="w-full flex flex-col items-center mt-10 px-4">
      <h2 className="text-[#409223] text-2xl md:text-3xl font-bold mb-5 text">Hoteles En La Zona:</h2>

      {/* Contenedor de tarjetas centrado y expansión hacia abajo */}
      <div className="max-w-screen-lg w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-500">
        {hotelesMostrados.map((hotel) => (
          <div
            key={hotel.id}
            className="flex flex-col items-center border rounded-lg shadow-lg p-3 hover:scale-105 transition cursor-pointer"
            onClick={() => navigate(hotel.link)}
          >
            <img src={hotel.img} alt={hotel.nombre} className="w-full h-48 object-cover rounded-lg" />
            <h3 className="text-[#409223] font-bold mt-2 text-center">{hotel.nombre}</h3>
            <p className="text-gray-500 text-sm text-center">{hotel.ubicacion}</p>
          </div>
        ))}
      </div>

      {/* Botón "Ver Más" centrado y con transición */}
      <button
        onClick={() => setExpandido(!expandido)}
        className="mt-5 px-6 py-3 bg-[#409223] text-white font-bold rounded-lg hover:bg-[#36791c] transition text-center w-full sm:w-auto"
      >
        {expandido ? "Ver Menos" : "Ver Más Opciones"}
      </button>

      <div className="pt-10"></div>
    </div>
  );
};

export default DescripcionDestino;

