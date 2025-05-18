import { useState, useRef } from "react";
import { Plus, ImagePlus } from "lucide-react";

export default function PostButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [text, setText] = useState("");
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setImage(null);
        setImagePreview(null);
        setText("");
        window.location.reload();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const accessToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');

        if (!text && !image) {
            alert("Debes escribir un texto o subir una imagen para publicar.");
            return;
        }

        try {
            let idImagen = null;

            // 1. Subir imagen solo si hay una
            if (image) {
                const formData = new FormData();
                formData.append('imagen', image);

                const uploadResponse = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: formData,
                });

                const uploadData = await uploadResponse.json();
                if (!uploadData.success) {
                    throw new Error("Error al subir la imagen.");
                }

                idImagen = uploadData.data.id;
            }

            // 2. Crear post con contenido e idImagen si existen
            const postBody = {
                idUsuario: parseInt(userId),
                creado_en: new Date().toISOString().split("T")[0],
            };

            if (text) postBody.contenido = text;
            if (idImagen !== null) postBody.idImagen = idImagen;

            const postResponse = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(postBody)
            });

            const postData = await postResponse.json();
            if (postData.success) {
                alert("¡Publicación exitosa!");
                handleClose();
            } else {
                throw new Error(postData.message || "Error al crear el post.");
            }

        } catch (err) {
            console.error(err);
            alert("Ocurrió un error al publicar.");
        }
    };




    return (
        <>
            {/* Botón flotante */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 left-4 bg-[#409223] text-white p-3 rounded-full shadow-lg hover:bg-[#9DC68E] transition-all z-50"
            >
                <Plus size={24} />
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-40">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-4">Crear Publicación</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Placeholder o Imagen seleccionada */}
                            <div
                                onClick={() => fileInputRef.current.click()}
                                className="cursor-pointer w-full h-48 bg-gray-100 border border-dashed border-gray-400 rounded-md flex items-center justify-center overflow-hidden"
                            >
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Vista previa"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-gray-400">
                                        <ImagePlus size={40} />
                                        <p className="text-sm">Haz clic para seleccionar una imagen</p>
                                    </div>
                                )}
                            </div>

                            {/* Input oculto */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                className="hidden"
                            />

                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Escribe un texto..."
                                className="w-full p-2 border rounded-md resize-none"
                                rows={4}
                            />

                            <button
                                type="submit"
                                className="w-full bg-[#409223] text-white py-2 rounded-md hover:bg-[#9DC68E] transition disabled:opacity-50"
                            >
                                Publicar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
