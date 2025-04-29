import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Actividades from '../Components/Actividades'; // Esto también lo vamos a mejorar luego

const DescripcionDestino = () => {
  const { id } = useParams();
  const [destino, setDestino] = useState(null);
  const [hoteles, setHoteles] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [expandido, setExpandido] = useState(false);

  useEffect(() => {
    async function fetchDatos() {
      try {
        const loginResponse = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/usuarios/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'juanperez',
            password: 'contrasena'
          })
        });
        const loginData = await loginResponse.json();
        const token = loginData.data.accessToken;

        // Traer destino
        const destinoResponse = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/lugares/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const destinoData = await destinoResponse.json();
        if (destinoData.success) {
          setDestino(destinoData.data);
          setImagenes(destinoData.data.imagenes || []); // Si el destino tiene imagenes
        }

        // Traer hoteles relacionados
        const hotelesResponse = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/hoteles', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const hotelesData = await hotelesResponse.json();
        if (hotelesData.success) {
          setHoteles(hotelesData.data.filter(hotel => hotel.lugarId == id)); // Hoteles del mismo destino
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchDatos();
  }, [id]);

  if (!destino) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-[#409223]">Cargando destino...</p>
      </div>
    );
  }

  return (
    <>
      {/* Fondo del Destino */}
      <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${destino.imagenPrincipal || '/Huasteca_2.jpg'})` }}>
        <div className="flex flex-row w-auto h-screen justify-center items-center">
          <div className="flex flex-col w-300 h-auto min-h-lg justify-center items-center rounded-3xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
            <br />
            <h1 className="text-6xl font-serif text-[#409223] text-center">{destino.nombre}</h1>
            <br />
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="w-full flex justify-center mt-10 px-4">
        <div className="max-w-screen-lg w-full">
          <h1 className="text-[#409223] text-4xl md:text-5xl font-bold mt-5">{destino.nombre}</h1>
          <p className="text-justify mt-5 text-gray-700">{destino.descripcion}</p>
        </div>
      </div>

      {/* Carrusel de Imágenes */}
      <ImageSlider images={imagenes.length > 0 ? imagenes : ["/BackGround.jpg", "Huasteca_1.jpg"]} />

      {/* Mapa */}
      <div className="w-full flex justify-center mt-10 px-4">
        <div className="max-w-screen-lg w-full">
          <h1 className="text-[#409223] text-4xl md:text-3xl font-bold mt-5 text-center">
            Explora Su Ubicación:
          </h1>
          <div className="flex justify-center mt-5">
            <img
              className="w-45/64 rounded-lg shadow-lg"
              src="/Maps.jpg"
              alt="API Google Maps"
            />
          </div>
        </div>
      </div>

      {/* Actividades */}
      <Actividades idLugar={id} />

      {/* Hoteles */}
      <ListaHoteles hoteles={hoteles} expandido={expandido} setExpandido={setExpandido} />

      {/* Reseñas */}
      <SeccionResenas />
    </>
  );
};

const ListaHoteles = ({ hoteles, expandido, setExpandido }) => {
  const navigate = useNavigate();
  const hotelesMostrados = expandido ? hoteles : hoteles.slice(0, 3);

  return (
    <div className="w-full flex flex-col items-center mt-25 px-4">
      <h2 className="text-[#409223] text-2xl md:text-3xl font-bold mb-5 text-center">Hoteles En La Zona:</h2>
      <div className="max-w-screen-lg w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-500">
        {hotelesMostrados.map((hotel) => (
          <div
            key={hotel.id}
            className="flex flex-col items-center border rounded-lg shadow-lg p-3 hover:scale-105 transition cursor-pointer"
            onClick={() => navigate(`/descripcion-hotel/${hotel.id}`)}
          >
            <img src={hotel.imagen || "/Hotel_1.jpg"} alt={hotel.nombre} className="w-full h-48 object-cover rounded-lg" />
            <h3 className="text-[#409223] font-bold mt-2 text-center">{hotel.nombre}</h3>
            <p className="text-gray-500 text-sm text-center">{hotel.ubicacion}</p>
          </div>
        ))}
      </div>

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

export function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  useEffect(() => {
    if (!isAutoSliding) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2300);
    return () => clearInterval(interval);
  }, [isAutoSliding, images.length]);

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

const SeccionResenas = () => (
  <div className="w-full flex justify-center mt-10 px-4">
    <div className="max-w-screen-lg w-full">
      <h1 className="text-[#409223] text-4xl md:text-3xl font-bold mt-5 text-center">Reseñas de Usuarios:</h1>
      {/* A futuro, traer reseñas desde API */}
      <div className="max-w-screen-lg w-full flex flex-row justify-center items-center space-x-3 mt-4">
        <div className="w-1/3 border-2 border-gray-500 rounded-2xl">
          <div className="flex justify-center items-center">
            <img className="w-20 h-12" src="/Usuario.png" alt="Foto De Usuario" />
          </div>
          <h1 className="font-bold text-center">Usuario 1</h1>
          <p className="text-center">Increíble experiencia.</p>
        </div>
        <div className="w-1/3 border-2 border-gray-500 rounded-2xl">
          <div className="flex justify-center items-center">
            <img className="w-20 h-12" src="/Usuario.png" alt="Foto De Usuario" />
          </div>
          <h1 className="font-bold text-center">Usuario 2</h1>
          <p className="text-center">Hermosos paisajes.</p>
        </div>
        <div className="w-1/3 border-2 border-gray-500 rounded-2xl">
          <div className="flex justify-center items-center">
            <img className="w-20 h-12" src="/Usuario.png" alt="Foto De Usuario" />
          </div>
          <h1 className="font-bold text-center">Usuario 3</h1>
          <p className="text-center">Muy recomendable.</p>
        </div>
      </div>
    </div>
  </div>
);

export default DescripcionDestino;
