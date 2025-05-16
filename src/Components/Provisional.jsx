import React from 'react';
import { useNavigate } from 'react-router-dom';

const Provisional = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        try {
            const response = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/usuarios/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ refreshToken }), // ✅ Aquí se manda el refreshToken
            });

            if (response.ok) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('userId');
                navigate('/login');
            } else {
                const errorData = await response.json();
                console.error('Fallo al cerrar sesión:', errorData);
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };



    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
            Cerrar sesión
        </button>
    );
};

export default Provisional;
