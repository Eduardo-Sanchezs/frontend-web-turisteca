import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        if (message.trim() === "") return;

        const userMessage = { sender: "user", text: message };
        setMessages(prev => [...prev, userMessage]);
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "system",
                            content:
                                "Eres un asistente amigable llamado turisteca-bot, que puede responder en cualquier idioma dependiendo de en qué idioma reciba el mensaje. Tienes que devolver solo respuestas con enfoque ecológico sobre la región Huasteca en México, así como recomendaciones que te pida el usuario sobre actividades, hospedajes y destinos turísticos. Cualquier otra cosa que te pregunten que no sea sobre la Huasteca o sobre ecoturismo, no respondas.",
                        },
                        { role: "user", content: message },
                    ],
                }),
            });

            const data = await response.json();
            const botReply = data.choices?.[0]?.message?.content || "No entendí, ¿puedes repetirlo?";
            const botMessage = { sender: "bot", text: botReply };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error llamando al chatbot:", error);
            const errorMessage = { sender: "bot", text: "Error obteniendo respuesta. Intenta de nuevo." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            {isOpen && (
                <div className="w-80 shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-200">
                    <div className="p-4 h-96 flex flex-col">
                        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-2">
                            <h2 className="text-lg font-semibold text-[#409223]">turiBot🤖</h2>
                            <button
                                className="p-2 rounded-full hover:bg-[#9DC68E] text-gray-400"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto bg-gray-100 p-2 rounded-md space-y-2">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`p-2 rounded-lg max-w-xs ${msg.sender === "user"
                                        ? "bg-[#409223] text-white self-end ml-auto"
                                        : "bg-[#9DC68E] text-black self-start mr-auto"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            {loading && (
                                <div className="bg-[#9DC68E] text-black p-2 rounded-lg max-w-xs self-start mr-auto animate-pulse">
                                    Escribiendo...
                                </div>
                            )}
                        </div>
                        <div className="mt-2 flex items-center border border-[#9DC68E] rounded-md p-2">
                            <input
                                type="text"
                                placeholder="Escribe un mensaje..."
                                className="flex-1 outline-none"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                disabled={loading}
                            />
                            <button
                                className="ml-2 p-2 bg-[#409223] text-white rounded-full hover:bg-[#9DC68E] disabled:opacity-50"
                                onClick={handleSendMessage}
                                disabled={loading}
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
