import { Facebook, Instagram } from "lucide-react";
import logo from '../assets/Turisteca.png';

function Footer() {
    return (
        <>
            <footer className="w-full py-6 bg-gray-100">
                {/* Línea separadora */}
                <div className="w-full flex justify-center items-center mb-5">
                    <hr className="w-11/12 border-gray-300" />
                </div>

                {/* Contenido del footer */}
                <div className="flex flex-col md:flex-row justify-between items-center text-center px-6 md:px-20 gap-y-6">
                    {/* Sección de título */}
                    <div className="flex flex-col items-center md:items-start">
                        <h1 className="text-[#409223] text-3xl font-bold">turisteca</h1>
                    </div>

                    {/* Logo + Correo */}
                    <div className="flex flex-col items-center">
                        <img src={logo} alt="Logo" width={60} height={60} />
                        <p className="mt-2 text-gray-700 text-sm md:text-base">turistecamx@gmail.com</p>
                    </div>

                    {/* Redes sociales */}
                    <div className="flex flex-col items-center">
                        <p className="text-gray-600 text-sm mb-2">Síguenos</p>
                        <nav className="flex space-x-5 items-center justify-center">
                            <a
                                href="https://www.facebook.com/profile.php?id=61575896082844"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 transition"
                            >
                                <Facebook size={24} />
                            </a>
                            <a
                                href="https://www.instagram.com/turisteca/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-pink-500 transition"
                            >
                                <Instagram size={24} />
                            </a>
                        </nav>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
