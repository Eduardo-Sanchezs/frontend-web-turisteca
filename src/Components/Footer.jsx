import { Facebook, Instagram } from "lucide-react";

function Footer() {
    return (
        <>
            <footer className="w-full mt-55 ">

                <div className="w-full flex justify-center items-center">
                    <hr className="flex w-11/12" />
                </div>



                <div className="flex  justify-around items-center">
                    <div>
                        <h1 className="text-[#409223x] text-3xl font-bold">turisteca</h1>
                        <nav className="flex space-x-5 items-center justify-center mt-10">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
                                <Facebook size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
                                <Instagram size={24} />
                            </a>
                        </nav>
                    </div>


                    <div className="">

                        <img src="Logoo.png" alt="" width={60} height={60} />
                    </div>

                    <div>
                        <p>Ayno</p>
                    </div>
                </div>

            </footer>
        </>
    );
}

export default Footer;
