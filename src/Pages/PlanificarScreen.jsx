import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const API_KEY = "AIzaSyCdP-uyALNtvpbZTpNmm4M6nz91P47jZ58";

export default function PlanificarScreen() {
  const [form, setForm] = useState({
    fuelType: "",
    fuelConsumption: "",
    destination: null,
  });

  const [origin, setOrigin] = useState(null);
  const navigate = useNavigate();
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocalización no soportada");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setOrigin({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => alert("Permiso de ubicación denegado")
    );
  }, []);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      setForm({ ...form, destination: place });
    }
  };

  const handlePlanificar = () => {
    if (
      !form.fuelType ||
      !form.fuelConsumption ||
      !form.destination ||
      !form.destination.place_id ||
      !origin
    ) {
      alert("Por favor completa todos los campos y permite la ubicación para continuar.");
      return;
    }

    const { place_id } = form.destination;
    const service = new window.google.maps.places.PlacesService(document.createElement("div"));

    service.getDetails({ placeId: place_id }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const loc = place.geometry.location;
        const destino = {
          lat: typeof loc.lat === "function" ? loc.lat() : loc.lat,
          lng: typeof loc.lng === "function" ? loc.lng() : loc.lng,
        };

        const distancia = 100;
        const consumo = parseFloat(form.fuelConsumption);
        const factorEmision =
          form.fuelType === "carro_gasolina"
            ? 2.31
            : form.fuelType === "camion_diesel"
              ? 2.68
              : form.fuelType === "camioneta_gasolina"
                ? 2.31
                : 0;

        const emisiones = (distancia / 100) * consumo * factorEmision;

        alert(`Emisiones aproximadas: ${emisiones.toFixed(2)} kg CO₂`);

        navigate("/mapa", {
          state: {
            origen: origin,
            destino,
          },
        });
      } else {
        alert("No se pudo obtener la ubicación exacta del destino");
      }
    });
  };

  // ⛔ Mostrar errores de carga
  if (loadError) {
    return <div>Error al cargar Google Maps</div>;
  }

  // 🕓 Esperar hasta que esté cargado
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Planificador <span className="text-green-600">de Viajes</span>
      </h1>

      <label className="block mb-2 font-semibold">Tipo de vehículo:</label>
      <select
        className="w-full mb-4 p-2 border rounded"
        value={form.fuelType}
        onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
      >
        <option value="">Seleccionar...</option>
        <option value="carro_gasolina">Carro</option>
        <option value="camioneta_gasolina">Camioneta</option>
        <option value="camion_diesel">Camión</option>
      </select>

      <label className="block mb-2 font-semibold">Consumo de combustible (L/100km):</label>
      <input
        type="number"
        step="0.1"
        className="w-full mb-4 p-2 border rounded"
        placeholder="Ej. 8.5"
        value={form.fuelConsumption}
        onChange={(e) => setForm({ ...form, fuelConsumption: e.target.value })}
      />

      <label className="block mb-2 font-semibold">Destino:</label>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Buscar destino"
          className="w-full mb-6 p-2 border rounded"
          ref={inputRef}
        />
      </Autocomplete>

      <button
        onClick={handlePlanificar}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Comenzar Aventura
      </button>
    </div>
  );
}
