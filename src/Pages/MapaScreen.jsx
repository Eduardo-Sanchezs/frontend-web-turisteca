import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom';

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
  Autocomplete,
} from '@react-google-maps/api'
import { useNavigate, useLocation } from 'react-router-dom'

const containerStyle = {
  width: '100%',
  height: '100vh',
}

const centerDefault = {
  lat: 21.1605,
  lng: -100.9314, // Huasteca SLP
}

export default function MapaScreen() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCdP-uyALNtvpbZTpNmm4M6nz91P47jZ58',
    libraries: ['places'],
  })

  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)
  const [directions, setDirections] = useState(null)
  const [isJourneyFinished, setIsJourneyFinished] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const autocompleteRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Obtener origen y destino desde /planificar
  useEffect(() => {
    if (location.state && location.state.origen && location.state.destino) {
      setOrigin(location.state.origen)
      setDestination(location.state.destino)
      setIsLoading(false)
      setIsJourneyFinished(false)
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  const fetchLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocalización no soportada')
      setIsLoading(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
        setIsLoading(false)
      },
      () => {
        alert('Permiso de ubicación denegado')
        setIsLoading(false)
      }
    )
  }, [])

  useEffect(() => {
    if (!(location.state && location.state.origen && location.state.destino)) {
      fetchLocation()
      setIsJourneyFinished(false)
    }
  }, [fetchLocation, location.state])

  const handlePlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace()
      if (!place.geometry || !place.geometry.location) {
        alert('Por favor selecciona un lugar válido')
        return
      }
      const loc = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }
      setDestination(loc)
      setIsJourneyFinished(false)
    }
  }

  const finalizarViaje = () => {
    setIsJourneyFinished(true)
    setDirections(null)
    setDestination(null)

    if (inputRef.current) {
      inputRef.current.value = ''
    }

    alert('Viaje finalizado. Cuéntanos tu experiencia.')

    window.location.reload() // <-- fuerza el refresco de la página
  }


  useEffect(() => {
    if (origin && destination && !isJourneyFinished) {
      const directionsService = new window.google.maps.DirectionsService()
      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result)
          } else {
            console.error('Error al obtener direcciones:', result)
            setDirections(null)
          }
        }
      )
    }
  }, [origin, destination, isJourneyFinished])

  // 🧱 RENDER

  if (loadError) {
    return <div>Error al cargar Google Maps</div>
  }

  if (isLoading || !isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando ubicación y destino...
      </div>
    )
  }

  return (
    <div className="relative flex-1">
      {/* Barra de búsqueda compacta */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 shadow-md z-10 rounded-xl max-w-xl w-[90%]">
        <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 gap-2">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1011.5 19.5a7.5 7.5 0 005.15-2.35z"
            />
          </svg>
          <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceChanged}>
            <input
              type="text"
              placeholder="Buscar destino"
              className="flex-1 outline-none text-sm text-gray-700 w-full bg-transparent"
              ref={inputRef}
            />
          </Autocomplete>
        </div>

        {/* Botones de acción más compactos */}
        <div className="flex justify-center sm:justify-end gap-2 mt-2 flex-wrap">
          <button
            onClick={() =>
              navigate('/calculadora', {
                state: { origen: origin, destino: destination },
              })
            }
            className="bg-green-600 text-white text-sm px-4 py-1.5 rounded-full font-medium hover:bg-green-700 transition"
          >
            Planificar
          </button>
          <Link to="/destinos">
            <button className="bg-green-600 text-white text-sm px-4 py-1.5 rounded-full font-medium hover:bg-green-700 transition">
              Destinos
            </button>
          </Link>
        </div>
      </div>

      {/* Mapa y lógica restante igual */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={origin || centerDefault}
        zoom={13}
      >
        {origin && (
          <Marker
            position={origin}
            draggable={true}
            onDragEnd={(e) =>
              setOrigin({ lat: e.latLng.lat(), lng: e.latLng.lng() })
            }
          />
        )}
        {destination && !isJourneyFinished && (
          <Marker
            position={destination}
            draggable={true}
            onDragEnd={(e) =>
              setDestination({ lat: e.latLng.lat(), lng: e.latLng.lng() })
            }
          />
        )}
        {directions && !isJourneyFinished && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: { strokeColor: '#409223', strokeWeight: 4 },
            }}
          />
        )}
      </GoogleMap>

      {/* Botón Finalizar Viaje */}
      {!isJourneyFinished && origin && destination && directions && (
        <button
          onClick={finalizarViaje}
          className="absolute bottom-6 right-6 bg-green-700 text-white px-5 py-2.5 rounded-lg shadow-md font-semibold hover:bg-green-800 transition"
        >
          Finalizar Viaje
        </button>
      )}
    </div>


  )
}
