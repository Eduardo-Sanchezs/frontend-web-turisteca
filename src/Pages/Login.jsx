import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import logo from '../assets/Turisteca.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Inicializa navegación

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (result.success) {
                console.log('Login exitoso:', result);

                // Puedes guardar los tokens en localStorage si los necesitas después
                localStorage.setItem('accessToken', result.data.accessToken);
                localStorage.setItem('refreshToken', result.data.refreshToken);
                localStorage.setItem('userId', result.data.id);
                navigate('/home');// Redirige al home
                window.location.reload();
                console.log('accessToken guardado:', result.data.accessToken);
            } else {
                alert('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error en login:', error);
            alert('Ocurrió un error al iniciar sesión');
        }
    };

    return (
        <div className="min-h-screen bg-[url('/BackGround.jpg')] bg-cover bg-center flex items-center justify-center px-4 py-24">
            <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Logo */}
                <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <div className="bg-white rounded-full p-4 shadow-lg">
                        <img src={logo} alt="Logo" className="h-28 sm:h-36 md:h-48 lg:h-64 object-contain" />
                    </div>
                </div>

                {/* Formulario */}
                <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <div className="w-full max-w-lg bg-white bg-opacity-80 p-6 rounded-2xl shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-6 text-[#409223]">Iniciar sesión</h2>

                        <form onSubmit={handleLogin} className="space-y-4 text-left">
                            {/* Usuario */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#409223] focus:border-[#409223]"
                                />
                            </div>

                            {/* Contraseña */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                                <div className="relative mt-1">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-[#409223] focus:border-[#409223]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-600 hover:text-[#409223]"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            // Icono ocultar
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.958 9.958 0 011.17-4.692M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M19.25 4.75L4.75 19.25" />
                                            </svg>
                                        ) : (
                                            // Icono mostrar
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Botón de login */}
                            <button
                                type="submit"
                                className="w-full bg-[#409223] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#36791c] transition"
                            >
                                Iniciar sesión
                            </button>
                        </form>

                        {/* Enlace a registro */}
                        <p className="mt-4 text-sm text-gray-600 text-center">
                            ¿No tienes una cuenta todavía?{' '}
                            <Link to="/registro" className="text-[#409223] font-semibold hover:underline">
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
