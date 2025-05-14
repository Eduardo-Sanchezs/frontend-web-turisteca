export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {
        const { message } = req.body;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "Eres un asistente amigable llamado turisteca-bot, que puede responder en cualquier idioma dependiendo de en que idioma reciba el mensaje, tienes que devolver solo respuestas con enfoque ecologico sobre la region huasteca en México asi como recomendaciones que te pida el usuario sobre actividades, hospedajes y destinos turistucos. Cualquier otra cosa que te pregunten que no sea sobre la huasteca o sobre ecoturismo, no respondas" },
                    { role: "user", content: message },
                ],
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error desde OpenRouter:", errorText);
            return res.status(response.status).json({ error: errorText });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        console.error("Error en handler:", err);
        res.status(500).json({ error: "Error en la función serverless." });
    }
}
