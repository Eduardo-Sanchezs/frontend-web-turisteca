export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { messages } = await req.json();

    try {
        const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages,
            }),
        });

        const data = await openaiRes.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Error al contactar a OpenAI' });
    }
}