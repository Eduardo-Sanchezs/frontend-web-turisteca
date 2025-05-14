export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {
        const { message } = await req.json(); // Requiere que el body tenga { message: "texto del usuario" }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content:
                            "Eres un asistente amigable llamado turisteca-bot, que puede responder en cualquier idioma dependiendo de en qué idioma reciba el mensaje. Tienes que devolver solo respuestas con enfoque ecológico sobre la región Huasteca en México, así como recomendaciones sobre actividades, hospedajes y destinos turísticos. Cualquier otra cosa que te pregunten que no sea sobre la Huasteca o sobre ecoturismo, no respondas.",
                    },
                    {
                        role: "user",
                        content: message,
                    },
                ],
            }),
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        console.error("Error en handler:", err);
        res.status(500).json({ error: "Error en la función serverless." });
    }
}
