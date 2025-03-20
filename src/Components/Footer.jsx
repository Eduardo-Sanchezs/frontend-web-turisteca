import { Facebook, Instagram } from "lucide-react";

function Footer() {
    return (
        <>
            <footer className="w-full py-5 bg-gray-100">
                {/* Línea separadora */}
                <div className="w-full flex justify-center items-center mb-5">
                    <hr className="w-11/12 border-gray-300" />
                </div>

                {/* Contenido del footer */}
                <div className="flex flex-col md:flex-row justify-between items-center text-center px-4 md:px-10 space-y-6 md:space-y-0">
                    {/* Sección de título y redes sociales */}
                    <div className="flex flex-col items-center md:items-start">
                        <h1 className="text-[#409223] text-3xl font-bold">turisteca</h1>
                        <nav className="flex space-x-5 items-center justify-center mt-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
                                <Facebook size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
                                <Instagram size={24} />
                            </a>
                        </nav>
                    </div>

                    {/* Sección de Logo y Correo Electrónico */}
                    <div className="flex flex-col items-center">
                        <img src="Logoo.png" alt="Logo" width={60} height={60} />
                        <p className="mt-2 text-gray-700 text-sm md:text-base">TuMeroPatron@turisteca.com</p>
                    </div>

                    {/* Sección de Descarga de App */}
                    <div className="flex flex-col items-center space-y-3">
                        <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                            <img src="/Appstore.png" alt="Descargar en App Store" className="w-24 md:w-28" />
                        </a>
                        <a href="https://play.google.com/store/" target="_blank" rel="noopener noreferrer">
                            <img src="/Playstore.png" alt="Descargar en Google Play" className="w-24 md:w-28" />
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
