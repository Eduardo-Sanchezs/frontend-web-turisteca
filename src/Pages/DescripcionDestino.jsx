import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Actividades from '../Components/Actividades';

const DescripcionDestino = () => {
  const { id } = useParams();
  const [destino, setDestino] = useState(null);
  const [imagenDestino, setImagenDestino] = useState(null);
  const [lugaresFiltrados, setLugaresFiltrados] = useState([]);
  const [imagenesCarrusel, setImagenesCarrusel] = useState([]);
  const [expandido, setExpandido] = useState(false);
  const [cargandoLugares, setCargandoLugares] = useState(true);

  useEffect(() => {
    async function fetchDatos() {
      try {
        // Login para obtener token
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

        // Obtener datos del destino
        const destinoResponse = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/lugares/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const destinoData = await destinoResponse.json();
        if (destinoData.success) {
          const lugar = destinoData.data;
          console.log("Destino:", lugar);
          setDestino(lugar);

          // Imagen principal del destino
          const imagenResponse = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/imagen-url/${lugar.idImagen}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const imagenData = await imagenResponse.json();
          if (imagenData.success) {
            setImagenDestino(imagenData.data.imagenURL);
          }

          // Obtener imágenes para el carrusel
          const imagenesLugarResponse = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/imagen-lugar/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const imagenesLugarData = await imagenesLugarResponse.json();

          if (imagenesLugarData.success) {
            const imagenesURLs = await Promise.all(
              imagenesLugarData.data.map(async ({ idImagen }) => {
                const res = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/imagen-url/${idImagen}`, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                return data.success ? data.data.imagenURL : null;
              })
            );
            const imagenesFiltradas = imagenesURLs.filter(url => url !== null);
            setImagenesCarrusel(imagenesFiltradas.length > 0 ? imagenesFiltradas : ["/BackGround.jpg"]);
          }
        }

        // Obtener lugares filtrados (hoteles y hospedaje)
        const lugaresResponse = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/lugares', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const lugaresData = await lugaresResponse.json();
        if (lugaresData.success) {
          const filtrados = lugaresData.data.filter(
            lugar =>
              (lugar.idCategoria === 2 || lugar.idCategoria === 3) &&
              lugar.idCiudad === destinoData.data.idCiudad
          );

          const lugaresConImagenes = await Promise.all(filtrados.map(async (lugar) => {
            const imagenRes = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/imagen-url/${lugar.idImagen}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const imagenData = await imagenRes.json();
            return {
              ...lugar,
              imagenPrincipal: imagenData.success ? imagenData.data.imagenURL : "/BackGround.jpg"
            };
          }));

          setLugaresFiltrados(lugaresConImagenes);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCargandoLugares(false);
      }
    }

    fetchDatos();
  }, [id]);


  if (!destino) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-[#409223] animate-pulse">Cargando destino...</p>
      </div>
    );
  }

  return (
    <>
      {/* Fondo del Destino */}
      <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${imagenDestino || '/Huasteca_2.jpg'})` }}>
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
      <ImageSlider images={imagenesCarrusel} />

      {/* Mapa */}
      <div className="w-full flex justify-center mt-10 px-4">
        <div className="max-w-screen-lg w-full">
          <h1 className="text-[#409223] text-4xl md:text-3xl font-bold mt-5 text-center">
            Explora su ubicación:
          </h1>
          <div className="flex justify-center mt-5">
            <div className="w-full h-96 rounded-lg shadow-lg overflow-hidden">
              {(() => {
                const lat = parseFloat(destino.latitud) || 21.8795; // Fallback: Ciudad Valles
                const lng = parseFloat(destino.longitud) || -99.1013;
                return (
                  <iframe
                    title="mapa-del-destino"
                    className="w-full h-full"
                    src={`https://maps.google.com/maps?q=${destino.coordLat},${destino.coordLon}&hl=es&z=14&output=embed`}
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Actividades */}


      {/* Lugares Recomendados */}
      {cargandoLugares ? (
        <div className="flex justify-center items-center mt-10">
          <p className="text-xl text-[#409223] animate-pulse">Cargando hoteles recomendados...</p>
        </div>
      ) : (
        <ListaLugares lugares={lugaresFiltrados} expandido={expandido} setExpandido={setExpandido} />
      )}

      {/* Reseñas */}
      <SeccionResenas />
    </>
  );
};

const ListaLugares = ({ lugares, expandido, setExpandido }) => {
  const navigate = useNavigate();
  const lugaresMostrados = expandido ? lugares : lugares.slice(0, 3);

  return (
    <div className="w-full flex flex-col items-center mt-25 px-4">
      <h2 className="text-[#409223] text-2xl md:text-3xl font-bold mb-5 text-center">Hoteles recomendados:</h2>
      <div className="max-w-screen-lg w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-500">
        {lugaresMostrados.map((lugar) => (
          <div
            key={lugar.id}
            className="flex flex-col items-center border rounded-lg shadow-lg p-3 hover:scale-105 transition cursor-pointer"
            onClick={() => navigate(`/descripcion-destino/${lugar.id}`)}
          >
            <img src={lugar.imagenPrincipal} alt={lugar.nombre} className="w-full h-48 object-cover rounded-lg" />
            <h3 className="text-[#409223] font-bold mt-2 text-center">{lugar.nombre}</h3>
            <p className="text-gray-500 text-sm text-center">{lugar.descripcion}</p>
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


const SeccionResenas = () => (
  <div className="w-full flex justify-center mt-10 px-4">
    <div className="max-w-screen-lg w-full">
      <h1 className="text-[#409223] text-4xl md:text-3xl font-bold mt-5 text-center">Reseñas de usuarios:</h1>
      <div className="max-w-screen-lg w-full flex flex-row justify-center items-center space-x-3 mt-4">
        <div className="w-1/3 border-2 border-gray-500 rounded-2xl">
          <div className="flex justify-center items-center">
            <img className="w-20 h-12" src="/Usuario.png" alt="Foto De Usuario" />
          </div>
          <h1 className="font-bold text-center">Marilu Martinez</h1>
          <p className="text-center">Increíble experiencia.</p>
        </div>
        <div className="w-1/3 border-2 border-gray-500 rounded-2xl">
          <div className="flex justify-center items-center">
            <img className="w-20 h-12" src="/Usuario.png" alt="Foto De Usuario" />
          </div>
          <h1 className="font-bold text-center">Karla Mendoza</h1>
          <p className="text-center">Hermosos paisajes.</p>
        </div>
        <div className="w-1/3 border-2 border-gray-500 rounded-2xl">
          <div className="flex justify-center items-center">
            <img className="w-20 h-12" src="/Usuario.png" alt="Foto De Usuario" />
          </div>
          <h1 className="font-bold text-center">Roberto Almazan</h1>
          <p className="text-center">Muy recomendable.</p>
        </div>
      </div>
    </div>
  </div>
);

export default DescripcionDestino;
