export default async function handler(req, res) {
    res.status(200).json({
        message: "La API está funcionando",
        apiKeyExists: !!process.env.OPENROUTER_API_KEY,
        apiKeyLength: process.env.OPENROUTER_API_KEY?.length || 0,
    });
}