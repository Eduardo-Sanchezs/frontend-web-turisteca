export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {
        const { message } = req.body; // Aquí está el cambio

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "..." },
                    { role: "user", content: message },
                ],
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error desde OpenRouter:", errorText);
            throw new Error("Fallo en la llamada a OpenRouter");
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        console.error("Error en handler:", err);
        res.status(500).json({ error: "Error en la función serverless." });
    }
}
