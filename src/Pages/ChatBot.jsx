import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            setMessages([...messages, message]);
            setMessage("");
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            {isOpen && (
                <div className="w-80 shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-200">
                    <div className="p-4 h-96 flex flex-col">
                        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-2">
                            <h2 className="text-lg font-semibold text-[#409223]">turisteca-bot</h2>
                            <button
                                className="p-2 rounded-full hover:bg-[#9DC68E] text-gray-400"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto bg-gray-100 p-2 rounded-md">
                            {messages.map((msg, index) => (
                                <div key={index} className="bg-[#409223] text-white p-2 rounded-lg mb-1 self-end max-w-xs">
                                    {msg}
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 flex items-center border border-[#9DC68E] rounded-md p-2">
                            <input
                                type="text"
                                placeholder="Escribe un mensaje..."
                                className="flex-1 outline-none"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button
                                className="ml-2 p-2 bg-[#409223] text-white rounded-full hover:bg-[#9DC68E]"
                                onClick={handleSendMessage}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <button
                className="rounded-full shadow-lg p-3 bg-[#409223] text-white hover:bg-[#9DC68E]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <MessageCircle className="w-6 h-6" />
            </button>
        </div>
    );
}