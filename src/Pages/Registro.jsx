import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Turisteca.png';

const Registro = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setError('');

        try {
            const response = await fetch('https://apis-turisteca-2-ahora-es-personal.onrender.com/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert('Cuenta creada con éxito. Ahora puedes iniciar sesión.');
                navigate('/login');
            } else {
                setError(data.message || 'Error al registrar usuario');
            }

        } catch (err) {
            console.error(err);
            setError('Error al conectar con el servidor');
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
                        <h2 className="text-2xl font-bold mb-6 text-[#409223]">Crear una cuenta</h2>

                        <form onSubmit={handleRegister} className="space-y-4 text-left">
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

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#409223] focus:border-[#409223]"
                                />
                            </div>

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
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
                                <div className="relative mt-1">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-[#409223] focus:border-[#409223]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-600 hover:text-[#409223]"
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}

                            <button
                                type="submit"
                                className="w-full bg-[#409223] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#36791c] transition"
                            >
                                Registrarse
                            </button>
                        </form>

                        <p className="mt-4 text-sm text-gray-600 text-center">
                            ¿Ya tienes una cuenta?{' '}
                            <Link to="/login" className="text-[#409223] font-semibold hover:underline">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registro;
