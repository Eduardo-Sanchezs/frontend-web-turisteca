import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/BG.png",
  "/Coordenadas.jpg",
  "/TienePotencial.jpeg",
  "/TingLing.jpg",
  "/Mapa.jpg"
];


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

      <ImageSlider />

      <div className="w-full flex justify-center mt-10 px-4">
        <div className="max-w-screen-lg w-full">
          <h1 className="text-[#409223] text-4xl md:text-3xl font-bold mt-5 text-center">Explora Su Ubicación:</h1>
          <br /><br /><br />
          <p>Aqui deberia ir el mapa con la API, pero, xd</p>
        </div>
      </div>

      {/* Lista de Hoteles */}
      <ListaHoteles expandido={expandido} setExpandido={setExpandido} />


      <div className="w-full flex justify-center mt-10 px-4 ">
        <div className="max-w-screen-lg w-full">
          <h1 className="text-[#409223] text-4xl md:text-3xl font-bold mt-5 text-center">Reseñas Falsotas:</h1>
          <div className="max-w-screen-lg w- flex flex-row justify-center items-center space-x-3 mt-4">
            <div className="w-1/3 border-2 border-gray-500 rounded-2xl">
              <div className="flex justify-center items-center">
                <img className="w-20 h-12" src="Usuario.png" alt="Foto De Usuario" />
              </div>
              <h1 className="font-bold text-center">Crisely Saldivar</h1>
              <p className="text-center">Ay que bonito</p>
            </div>

            <div className="w-1/3 border-2 border-gray-500 rounded-2xl">
              <div className="flex justify-center items-center">
                <img className="w-20 h-12" src="Usuario.png" alt="Foto De Usuario" />
              </div>
              <h1 className="font-bold text-center">Marilu Toledo</h1>
              <p className="text-center">Gei El Que No Vaya</p>
            </div>

            <div className="w-1/3 border-2 border-gray-500 rounded-2xl">
              <div className="flex justify-center items-center">
                <img className="w-20 h-12" src="Usuario.png" alt="Foto De Usuario" />
              </div>
              <h1 className="font-bold text-center">Estrella Banuet</h1>
              <p className="text-center">3 x 2 = 5</p>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-30'></div>
    </>
  );
};

const ListaHoteles = ({ expandido, setExpandido }) => {
  const navigate = useNavigate();
  const hotelesMostrados = expandido ? hoteles : hoteles.slice(0, 3);

  return (
    <div className="w-full flex flex-col items-center mt-10 px-4">
      <h2 className="text-[#409223] text-2xl md:text-3xl font-bold mb-5 text-center">Hoteles En La Zona:</h2>

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


export default DescripcionDestino;

