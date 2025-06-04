import { useState, useEffect } from "react";
import Cargando from "../Components/Cargando"; // ajusta la ruta si es necesario


export default function ProfileEdit() {
    const [username, setUsername] = useState("");
    const [image, setImage] = useState(null); // archivo seleccionado
    const [preview, setPreview] = useState(null); // para mostrar en la UI
    const [originalImageId, setOriginalImageId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUserDetails = async () => {
            const storedUserId = localStorage.getItem("userId");
            const accessToken = localStorage.getItem("accessToken");

            if (!storedUserId || !accessToken) {
                setLoading(false); // importante
                return;
            }

            setUserId(storedUserId);
            setToken(accessToken);

            try {
                const res = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/usuario-detalles/${storedUserId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await res.json();

                if (res.ok && data.success) {
                    setUsername(data.data.nombre || "");
                    if (data.data.img_perfil) {
                        setOriginalImageId(data.data.img_perfil);
                        const imgRes = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/imagen-url/${data.data.img_perfil}`, {
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });
                        const imgData = await imgRes.json();
                        if (imgRes.ok && imgData.success) {
                            setPreview(imgData.data.imagenURL);
                        }
                    }
                }
            } catch (err) {
                console.error("Error al obtener datos del usuario:", err);
            } finally {
                setLoading(false); // <-- importante
            }
        };

        fetchUserDetails();
    }, []);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async () => {
        if (!image) return null;

        const formData = new FormData();
        formData.append("imagen", image);

        try {
            const res = await fetch("https://apis-turisteca-2-ahora-es-personal.onrender.com/api/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();
            if (res.ok && data.success) {
                return data.data.id;
            } else {
                console.error("Error al subir imagen:", data);
                return null;
            }
        } catch (err) {
            console.error("Error de red al subir imagen:", err);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageId = originalImageId;

        if (image) {
            imageId = await uploadImage();
            if (!imageId) return;
        }

        const payload = {
            id: parseInt(userId),
            ...(username.trim() && { nombre: username.trim() }),
            ...(imageId && { img_perfil: imageId }),
        };

        try {
            const res = await fetch(`https://apis-turisteca-2-ahora-es-personal.onrender.com/api/usuario-detalles/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                alert("✅ Perfil actualizado correctamente.");
            } else {
                console.error("Error al actualizar perfil:", data);
                alert("❌ No se pudo actualizar el perfil.");
            }
        } catch (err) {
            console.error("Error de red:", err);
            alert("❌ Ocurrió un error de red.");
        }
    };


    if (loading) return <Cargando />;
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">Editar Perfil</h2>

                <div className="flex justify-center mb-4">
                    <label className="cursor-pointer">
                        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Vista previa"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    Subir imagen
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Nombre:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#409223] text-white py-2 rounded-xl hover:bg-[#9DC68E] transition"
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
}
